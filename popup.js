document.addEventListener('DOMContentLoaded', () => {
  const fontSelector = document.getElementById('fontSelector');
  const applyFontButton = document.getElementById('applyFont');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = new URL(tabs[0].url);
    const domain = url.hostname;

    // Prefix付きのキー名
    const key = `fontSwitcher_${domain}`;

    // chrome.storage.localからフォント情報を取得
    chrome.storage.local.get(key, (result) => {
      if (result[key]) {
        fontSelector.value = result[key];
      }
    });

    // フォントを選択した場合の処理
    applyFontButton.addEventListener('click', () => {
      const selectedFont = fontSelector.value;

      // chrome.storage.localに保存
      chrome.storage.local.set({ [key]: selectedFont });

      // 現在のタブにフォントを適用
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: applyFont,
        args: [selectedFont]
      });
    });
  });
});

// ページにフォントを適用する関数
function applyFont(font) {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  document.body.style.fontFamily = `"${font}", monospace`;
}
