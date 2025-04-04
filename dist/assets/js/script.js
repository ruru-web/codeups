"use strict";

jQuery(function ($) {
  // この中であればWordpressでも「$」が使用可能になる

  $(function () {
    $(".js-hamburger").click(function () {
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        openDrawer();
        // ページのスクロールを止める
        $("body").css("overflow-y", "hidden");
        $("header").css("background-color", "#408F95");
      } else {
        // ページのスクロールを元に戻す
        $("body").css("overflow-y", "");
        $("header").css("background-color", "");
        closeDrawer();
      }
    });

    //backgroundまたはページ内リンクをクリックで閉じる
    $(".js-drawer a[href]").on("click", function (event) {
      closeDrawer();
    });

    //resizeイベント 画面幅によってドロワーメニュー閉じる
    $(window).resize(function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        closeDrawer();
      }
    });
  });
  function openDrawer() {
    $(".js-drawer").fadeIn();
    $(".js-hamburger").addClass("is-open");
  }
  function closeDrawer() {
    $(".js-drawer").fadeOut();
    $(".js-hamburger").removeClass("is-open");
  }

  //MVスライダー
  var mvSwiper = new Swiper(".js-mv-swiper", {
    loop: true,
    effect: "fade",
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
      //自動再生
      delay: 2000
    }
  });

  // Campaign スクロールヒントのフェード処理
  $(".js-price-list").scroll(function () {
    $(".js-scroll-hint").fadeOut();
  });

  // campaignスライダー
  var campaignSwiper = new Swiper(".js-campaign-swiper", {
    slidesPerView: 'auto',
    // スライド数は自動調整
    loop: true,
    //ループ
    spaceBetween: 40,
    //40px空ける

    navigation: {
      nextEl: ".swiper-button-next",
      // 次へボタンのクラス
      prevEl: ".swiper-button-prev" // 前へボタンのクラス
    }
    // allowTouchMove: false,      // スワイプ操作を無効にしてボタン操作のみ
  });

  //トップに戻る
  var pageTop = $(".js-pagetop");
  var footer = $("footer");
  var footerHeight = footer.innerHeight(); //フッターの高さ

  pageTop.hide(); //初めにトップに戻るボタンを非表示
  $(window).scroll(function () {
    //スクロールが100px達したらボタン表示
    if ($(this).scrollTop() > 100) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });

  //ボタンをクリックするとページ上部にスクロールする
  pageTop.click(function () {
    $("body,html").animate({
      scrollTop: 0
    },
    //ページを0pxまでスクロール
    500 //0.5秒
    );

    return false;
  });

  // ボタンがフッターと重ならないようにする
  $(window).on("scroll", function () {
    var footerHeight = footer.innerHeight(); //フッターの高さ {}内に記入しないと反映されない
    var windowHeight = $(window).height(); //ユーザーが見える画面（ウィンドウ）の高さ
    var scrollTop = $(window).scrollTop(); //ページの上からの距離
    var documentHeight = $(document).height(); //ページ全体の高さを取得します（フッターを含む）
    var distanceFromBottom = documentHeight - (scrollTop + windowHeight); //ページの下部までの残りの距離を計算
    //ページ全体の高さから、現在のウィンドウ下端の位置を引くことで「下端からページ最下部までの距離」を計算

    // レスポンシブ対応
    if ($(window).width() >= 769) {
      // 769px以上の場合
      //画面下部がフッターに近づいている状態であれば
      if (distanceFromBottom <= footerHeight) {
        pageTop.css({
          position: "absolute",
          bottom: footerHeight + 20
        });
      } else {
        pageTop.css({
          position: "fixed",
          bottom: '20px'
        });
      }
    } else {
      // 768px以下の場合
      if (distanceFromBottom <= footerHeight) {
        pageTop.css({
          position: "absolute",
          bottom: footerHeight + 16
        });
      } else {
        pageTop.css({
          position: "fixed",
          bottom: '16px'
        });
      }
    }
  });

  //画像のアニメーション
  //要素の取得とスピードの設定
  var box = $('.js-colorbox'),
    //クラスを取得
    speed = 700; // アニメーションの速度0.7s

  if (box.length === 0) {
    console.warn('No elements with .js-colorbox class found.');
    return; // 処理を中断
  }

  // .js-colorbox の付いた全ての要素に対して処理を実行
  box.each(function () {
    var $this = $(this);

    // 必要な要素を追加し取得
    $this.append('<div class="color js-color"></div>');
    var color = $this.find('.js-color'),
      image = $this.find('img');

    // 初期状態をセット
    image.css({
      'opacity': '0'
    });
    color.css({
      'width': '0%'
    });

    // スクロールで要素が見えたら実行（inview.jsを使用）
    color.on('inview', function () {
      if (!$(this).data('animated')) {
        $(this).data('animated', true); // アニメーション済み
        $(this).delay(200).animate({
          'width': '100%'
        }, speed, function () {
          image.css('opacity', '1');
          $(this).css({
            'left': '0',
            'right': 'auto'
          }).animate({
            'width': '0%'
          }, speed);
        });
      }
    });
  });

  //   //アニメーション
  // $(document).ready(function () {
  //   const leftSlides = $(".mv-loading__split-left .slide-left");
  //   const rightSlides = $(".mv-loading__split-right .slide-right");
  //   const totalSlides = leftSlides.length;
  //   let currentIndex = 0;

  //   // 最初のスライドを表示
  //   $(leftSlides[currentIndex]).addClass("active");
  //   $(rightSlides[currentIndex]).addClass("active");
  // });

  // // loading scroll lock
  // if (window.location.pathname === '/index.html') {
  //   $(document).ready(function () {
  //     // bodyとhtmlのスクロール制御
  //     $("html, body").css({ height: "100%", overflow: "hidden" });

  //     // ローディングアニメーションの完了後にスクロール解除
  //     setTimeout(function () {
  //       $("html, body").css({ height: "", overflow: "" });
  //     }, 3000); // 適切なタイミングに合わせて調整
  //   });
  // }

  //↓ここから下は通常に使える！
  // $(document).ready(function () {
  //   // アニメーションを手動でトリガー
  //   $(".mv-loading__split-left .slide-left").addClass("active");
  //   setTimeout(() => {
  //     $(".mv-loading__split-right .slide-right").addClass("active");
  //   }, 500); // 0.5秒後に右側をトリガー

  //   // ローディングスクロールロックの解除タイミング
  //   setTimeout(function () {
  //     $("html, body").css({ height: "", overflow: "" });
  //     $(".mv-loading").fadeOut(500); // 背景の白をフェードアウト
  //   }, 3000); // 3秒後に全体を解除
  // });

  //アニメーション練習①
  // document.addEventListener("DOMContentLoaded", function () {
  // 背景画像を設定（1枚の画像を左右分割する形）
  // document.querySelector(".left-side").style.backgroundImage = "url('path/to/image.jpg')";
  // document.querySelector(".right-side").style.backgroundImage = "url('path/to/image.jpg')";
  // document.querySelector(".left-side").style.backgroundPosition = "left center";
  // document.querySelector(".right-side").style.backgroundPosition = "right center";

  // GSAPアニメーション
  var tl = gsap.timeline();

  // ①緑の文字が消える
  tl.fromTo('.loading-title', {
    opacity: 0,
    y: 0
  }, {
    opacity: 1,
    duration: 1,
    ease: "power3.out"
  });
  tl.fromTo('.loading-title', {
    opacity: 1
  }, {
    opacity: 0,
    duration: 0.5
  });

  // 左画面が下から登場
  tl.fromTo('.loading-img', {
    y: "100%"
  }, {
    y: "0%",
    duration: 0.5,
    stagger: 0.2,
    ease: "power4.out"
  });
  tl.fromTo('.loading-title', {
    opacity: 0,
    y: 100
  }, {
    opacity: 1,
    y: 0,
    color: '#fff',
    duration: 1
  });
  tl.fromTo('.loading', {
    opacity: 1
  }, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",
    onComplete: function onComplete() {
      document.querySelector(".loading").remove();
    }
  });

  // gsap.fromTo('.left-side',
  //   { y: "100%"},
  //   { y: "0%", duration: 1.2, 
  //     ease: "power4.out"
  //   });

  //   gsap.fromTo('.right-side',
  //     { y: "100%"},
  //     { y: "0%", duration: 1.2, 
  //       ease: "power4.out"
  //     });

  // tl.to(".loading-title", { 
  //   opacity: 0, 
  //   duration: 0.8,
  //   ease: "power2.out"
  // })

  // ②ローディング画面を白くしたままフェードアウト
  // .to(".loading", { 
  //   opacity: 0, 
  //   duration: 0.8,
  //   onComplete: () => {
  //     document.querySelector(".loading").style.display = "none";
  //   }
  // }, "-=0.4") // 少し重ねる

  // ③左画面が下から登場

  // .from(".left-side", { 
  //   y: "100%", 
  //   duration: 1.2, 
  //   ease: "power4.out"
  // })

  // ④右画面が少し遅れて下から登場
  // .from(".right-side", { 
  //   y: "100%", 
  //   duration: 1.2, 
  //   ease: "power4.out"
  // }, "-=0.6") // 0.6秒遅らせる

  // ⑤中央に白文字をフェードイン
  // .to(".main-text", { 
  //   opacity: 1, 
  //   duration: 1, 
  //   ease: "power2.out"
  // })

  // ⑥白文字が消えてスライダーを表示
  // .to(".main-text", { 
  //   opacity: 0, 
  //   duration: 1, 
  //   ease: "power2.out",
  //   onComplete: () => {
  //     console.log("スライダー表示");
  //   }
  // });
  // });

  // gsap.fromTo(".top-mv",
  //   { opacity:1, backgroundColor: white }, 
  //   { })
});

// キャンペーンページタグ
// readyはページが完全に読み込まれた後に中のコードを実行する仕組み
// $(document).ready(function () {
// $('.js-tab-menu').on('click', function () {
//   // すべてのタグから'is-active'クラスを削除
//   $('.js-tab-menu').removeClass('is-active');
//   // クリックされたタグに'is-active'クラスを追加
//   $(this).addClass('is-active');
//   });

// });

//aboutページ モーダル
jQuery(function ($) {
  // モーダルを開く処理
  $(".js-modal-open").on("click", function (e) {
    e.preventDefault(); // リンクのデフォルト動作を無効化
    var src = $(this).find("img").attr("src"); // クリックされた画像のパスを取得
    var modal = $(".js-modal"); // モーダルの要素を取得

    modal.html("<img src=\"".concat(src, "\" alt=\"\" class=\"modal__image\">")); // モーダルに画像を挿入
    modal.fadeIn(); // モーダルを表示
    $("body").css("overflow", "hidden"); // 背景のスクロールを無効化
  });

  // モーダルを閉じる処理
  $(".js-modal").on("click", function () {
    $(this).fadeOut(); // モーダルを非表示
    $("body").css("overflow", "auto"); // 背景のスクロールを有効化
  });
});

// informationページタグ
// readyはページが完全に読み込まれた後に中のコードを実行する仕組み
$(document).ready(function () {
  $('.js-tab-button').on('click', function () {
    // すべてのタグから'is-active'クラスを削除
    $('.js-tab-button').removeClass('is-active');
    // クリックされたタグに'is-active'クラスを追加
    $(this).addClass('is-active');
    // すべてのタブコンテンツから'is-active'クラスを削除
    $('.js-tab-content').removeClass('is-active');

    // クリックされたボタンに対応するタブコンテンツを表示
    var number = $(this).data("number");
    $('#' + number).addClass('is-active');
  });
});

//リンクを押すと、該当のtabが開いたページに飛ぶ
document.addEventListener("DOMContentLoaded", function () {
  // 現在のURLのパラメーターを取得
  var params = new URLSearchParams(window.location.search);
  var section = params.get("section"); // 例: "tab02"

  // section の値がある場合、該当タブをアクティブにする
  if (section) {
    var targetTab = document.getElementById(section);
    if (targetTab) {
      // 全タブの `is-active` を削除
      document.querySelectorAll(".js-tab-content").forEach(function (tab) {
        tab.classList.remove("is-active");
      });
      document.querySelectorAll(".js-tab-button").forEach(function (button) {
        button.classList.remove("is-active");
      });

      // 該当タブをアクティブにする
      targetTab.classList.add("is-active");

      // 対応するタブボタンもアクティブにする
      var activeButton = document.querySelector(".js-tab-button[data-number=\"".concat(section, "\"]"));
      if (activeButton) {
        activeButton.classList.add("is-active");
      }

      // **スクロール位置を調整**
      setTimeout(function () {
        var headerHeight = document.querySelector(".header").offsetHeight; // ヘッダーの高さを取得
        var tabMenuHeight = document.querySelector(".information-tab__menu").offsetHeight; // タブメニューの高さを取得
        var offset = headerHeight + tabMenuHeight + 50; // 余白を考慮（50px）

        window.scrollTo({
          top: targetTab.getBoundingClientRect().top + window.scrollY - offset,
          behavior: "smooth"
          // behavior: "auto" // 一瞬でスクロール
        });
      }, 100); // 100ms 待ってからスクロール
      // }, 0);
    }
  }
});

// blogページsidebar記事
$(document).ready(function () {
  // トグルボタンをクリックした際の処理
  $('.archive-list__toggle').on('click', function () {
    var $button = $(this); // 現在クリックしたボタン
    var $submenu = $button.nextAll('ul').first(); // ボタンの次の<ul>を取得

    if ($submenu.length > 0) {
      // サブメニューがある場合のみ処理
      if ($submenu.is(':visible')) {
        // サブメニューが表示中の場合、非表示にする
        $submenu.slideUp(300); // 300msで非表示
        $button.text('▶'); // アイコンを切り替え
      } else {
        // サブメニューが非表示の場合、表示する
        $submenu.slideDown(300); // 300msで表示
        $button.text('▼'); // アイコンを切り替え
      }
    }
  });
  // 初期状態設定: 2023年のトグルを開いた状態にする
  var $initialToggle = $('.archive-list__item').first(); // 最初の<li>要素 (2023)
  $initialToggle.find('.archive-list__month').show(); // サブメニューを表示
  $initialToggle.find('.archive-list__toggle').first().text('▼'); // トグルボタンを「▼」に変更
});

// Voice
document.addEventListener("DOMContentLoaded", function () {
  var paginationItems = document.querySelectorAll(".pagination__list");
  paginationItems.forEach(function (item) {
    item.addEventListener("click", function (event) {
      event.preventDefault(); // ページ遷移を防ぐ

      // すべてのページから `pagination__list--green` を削除
      paginationItems.forEach(function (el) {
        return el.classList.remove("pagination__list--green");
      });

      // クリックされたページに `pagination__list--green` を追加
      this.classList.add("pagination__list--green");
    });
  });
});

// FAQアコーディオンページ
jQuery(function ($) {
  $('.js-faq-question').on('click', function () {
    $(this).next().slideToggle();
    $(this).toggleClass('is-open');
  });
});