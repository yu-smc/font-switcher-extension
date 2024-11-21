// 現在のページのドメインを取得
const url = new URL(window.location.href);
const domain = url.hostname;

// Prefix付きのキー名
const key = `fontSwitcher_${domain}`;

// chrome.storage.localからフォント設定を取得
chrome.storage.local.get(key, (result) => {
  const savedFont = result[key];
  if (savedFont) {
    applyFont(savedFont);
  }
});

// ページにフォントを適用する関数
function applyFont(font) {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font)}&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);

  document.body.style.fontFamily = `"${font}", monospace`;
}
