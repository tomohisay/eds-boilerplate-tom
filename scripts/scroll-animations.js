/**
 * スクロール時のアニメーションを制御するスクリプト
 * 要素が画面に表示されたときにアニメーションをトリガーします
 */
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer APIを使用して要素が画面に表示されたことを検出
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // 要素が画面に表示されたら
      if (entry.isIntersecting) {
        // アニメーションをトリガーするクラスを追加
        entry.target.classList.add('animate');
        
        // 一度アニメーションが開始されたら、その要素の監視を停止
        observer.unobserve(entry.target);
      }
    });
  }, {
    // 要素が20%以上表示されたらトリガー
    threshold: 0.2,
    // ビューポートの下から200px手前でトリガー（早めに開始）
    rootMargin: '0px 0px -200px 0px'
  });

  // カードブロックの各カードを監視対象に追加
  document.querySelectorAll('.cards > ul > li').forEach(card => {
    observer.observe(card);
  });
});
