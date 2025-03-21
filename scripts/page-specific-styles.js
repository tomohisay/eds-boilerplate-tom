/**
 * ページ固有のスタイルを適用するためのスクリプト
 * URLパスに基づいてbody要素にクラスを追加します
 */
(function() {
  // 現在のURLパスを取得
  const path = window.location.pathname;
  
  // URLパスに基づいてdata-pathname属性を設定
  document.body.setAttribute('data-pathname', path);
  
  // 特定のページに対応するクラスを追加
  if (path === '/about/top' || path.endsWith('/about/top/')) {
    document.body.classList.add('about-top');
  }
})();
