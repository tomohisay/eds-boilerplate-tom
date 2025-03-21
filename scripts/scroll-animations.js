/**
 * スクロール時のアニメーションを制御するスクリプト
 * 要素が画面に表示されたときにアニメーションをトリガーします
 */
(function() {
  // ページ読み込み完了時またはDOMContentLoaded時に実行
  function initScrollAnimations() {
    console.log('Scroll animations initialized');
    
    // Intersection Observer APIを使用して要素が画面に表示されたことを検出
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 要素が画面に表示されたら
        if (entry.isIntersecting) {
          console.log('Card is intersecting:', entry.target);
          // アニメーションをトリガーするクラスを追加
          entry.target.classList.add('animate');
          
          // 一度アニメーションが開始されたら、その要素の監視を停止
          observer.unobserve(entry.target);
        }
      });
    }, {
      // 要素が少しでも表示されたらトリガー
      threshold: 0.1,
      // ビューポートの下から100px手前でトリガー（早めに開始）
      rootMargin: '0px 0px -100px 0px'
    });

    // カードブロックの各カードを監視対象に追加
    const cards = document.querySelectorAll('.cards > ul > li');
    console.log('Found cards:', cards.length);
    
    cards.forEach(card => {
      observer.observe(card);
    });
    
    // ページ読み込み直後に画面内に表示されているカードにもアニメーションを適用
    setTimeout(() => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          console.log('Card is initially visible:', card);
          card.classList.add('animate');
        }
      });
    }, 100);
  }

  // DOMContentLoadedイベントで初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    // DOMがすでに読み込まれている場合は直接実行
    initScrollAnimations();
  }
  
  // ウィンドウ読み込み完了時にも実行（念のため）
  window.addEventListener('load', initScrollAnimations);
})();
