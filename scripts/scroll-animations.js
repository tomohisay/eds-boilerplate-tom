/**
 * スクロール時のアニメーションを制御するスクリプト
 * 要素が画面に表示されたときにアニメーションをトリガーします
 */
(function() {
  // 初期化関数
  function initScrollAnimations() {
    console.log('[Scroll Animations] Initializing...');
    
    // 少し遅延させて実行（ページの他の要素が読み込まれるのを待つ）
    setTimeout(() => {
      try {
        setupScrollAnimations();
        setupParagraphAnimations(); // 段落のアニメーションをセットアップ
      } catch (error) {
        console.error('[Scroll Animations] Error during initialization:', error);
      }
    }, 500);
  }
  
  // スクロールアニメーションのセットアップ
  function setupScrollAnimations() {
    // カードブロックの各カードを取得
    const cards = document.querySelectorAll('.cards > ul > li');
    console.log('[Scroll Animations] Found cards:', cards.length);
    
    if (cards.length === 0) {
      console.log('[Scroll Animations] No cards found, will retry in 1 second');
      // カードが見つからない場合は1秒後に再試行
      setTimeout(setupScrollAnimations, 1000);
      return;
    }
    
    // 現在のURLパスを取得
    const path = window.location.pathname;
    console.log('[Scroll Animations] Current path:', path);
    
    // すべてのカードを一度非表示にする（CSSの初期状態を強制）
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
    });
    
    // Intersection Observer APIを使用して要素が画面に表示されたことを検出
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 要素が画面に表示されたら
        if (entry.isIntersecting) {
          console.log('[Scroll Animations] Card is now visible:', entry.target);
          
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
    
    // 各カードを監視対象に追加
    cards.forEach((card, index) => {
      // インデックスに基づいてトランジションディレイを設定
      card.style.transitionDelay = `${0.1 * (index + 1)}s`;
      
      // Intersection Observerに追加
      observer.observe(card);
    });
    
    // ページ読み込み直後に画面内に表示されているカードにもアニメーションを適用
    setTimeout(() => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          console.log('[Scroll Animations] Card is initially visible:', card);
          card.classList.add('animate');
        }
      });
    }, 300);
    
    // スクロールイベントリスナーを追加（Intersection Observerのバックアップとして）
    window.addEventListener('scroll', checkVisibleCards);
    
    // スクロール時に表示されているカードをチェック
    function checkVisibleCards() {
      cards.forEach(card => {
        if (!card.classList.contains('animate')) {
          const rect = card.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            console.log('[Scroll Animations] Card became visible on scroll:', card);
            card.classList.add('animate');
          }
        }
      });
    }
    
    console.log('[Scroll Animations] Setup complete');
  }

  // 段落のアニメーションをセットアップする関数
  function setupParagraphAnimations() {
    // すべての段落要素を取得
    const paragraphs = document.querySelectorAll('p');
    console.log('[Scroll Animations] Found paragraphs:', paragraphs.length);
    
    if (paragraphs.length === 0) {
      console.log('[Scroll Animations] No paragraphs found, will retry in 1 second');
      // 段落が見つからない場合は1秒後に再試行
      setTimeout(setupParagraphAnimations, 1000);
      return;
    }
    
    // すべての段落にリキッドアニメーション用のクラスを追加
    paragraphs.forEach(paragraph => {
      // リキッドアニメーション用のクラスを追加
      paragraph.classList.add('liquid-animation');
      // 初期状態ではマスクで隠す（CSSで定義）
    });
    
    // Intersection Observer APIを使用して要素が画面に表示されたことを検出
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 要素が画面に表示されたら
        if (entry.isIntersecting) {
          console.log('[Scroll Animations] Paragraph is now visible:', entry.target);
          
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
    
    // 各段落を監視対象に追加
    paragraphs.forEach((paragraph, index) => {
      // インデックスに基づいてトランジションディレイを設定（段落ごとに少しずつ遅延）
      paragraph.style.transitionDelay = `${0.1 * (index % 5)}s`;
      
      // Intersection Observerに追加
      observer.observe(paragraph);
    });
    
    // ページ読み込み直後に画面内に表示されている段落にもアニメーションを適用
    setTimeout(() => {
      paragraphs.forEach(paragraph => {
        const rect = paragraph.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          console.log('[Scroll Animations] Paragraph is initially visible:', paragraph);
          paragraph.classList.add('animate');
        }
      });
    }, 300);
    
    // スクロールイベントリスナーを追加（Intersection Observerのバックアップとして）
    window.addEventListener('scroll', checkVisibleParagraphs);
    
    // スクロール時に表示されている段落をチェック
    function checkVisibleParagraphs() {
      paragraphs.forEach(paragraph => {
        if (!paragraph.classList.contains('animate')) {
          const rect = paragraph.getBoundingClientRect();
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
          
          if (rect.top <= windowHeight && rect.bottom >= 0) {
            console.log('[Scroll Animations] Paragraph became visible on scroll:', paragraph);
            paragraph.classList.add('animate');
          }
        }
      });
    }
    
    console.log('[Scroll Animations] Paragraph setup complete');
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
