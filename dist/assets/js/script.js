"use strict";

// console.log("test");
jQuery(function ($) {
  //   // この中であればWordpressでも「$」が使用可能になる

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
    slidesPerView: "auto",
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
          bottom: "20px"
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
          bottom: "16px"
        });
      }
    }
  });

  //画像のアニメーション
  //要素の取得とスピードの設定
  var box = $(".js-colorbox"),
    //クラスを取得
    speed = 700; // アニメーションの速度0.7s

  // .js-colorbox の付いた全ての要素に対して処理を実行
  box.each(function () {
    var $this = $(this);

    // 必要な要素を追加し取得
    $this.append('<div class="color js-color"></div>');
    var color = $this.find(".js-color"),
      image = $this.find("img");

    // 初期状態をセット
    image.css({
      opacity: "0"
    });
    color.css({
      width: "0%"
    });

    // スクロールで要素が見えたら実行（inview.jsを使用）
    color.on("inview", function () {
      if (!$(this).data("animated")) {
        $(this).data("animated", true); // アニメーション済み
        $(this).delay(200).animate({
          width: "100%"
        }, speed, function () {
          image.css("opacity", "1");
          $(this).css({
            left: "0",
            right: "auto"
          }).animate({
            width: "0%"
          }, speed);
        });
      }
    });
  });

  //アニメーション
  var loading = $(".loading"); //クラスを取得
  if (loading.length > 0) {
    // ローディング開始時にスクロール禁止
    document.body.classList.add("loading-active");
    // GSAPアニメーション
    var tl = gsap.timeline({
      onComplete: function onComplete() {
        // アニメーション終了時にスクロール復活
        document.body.classList.remove("loading-active");
      }
    });

    // ①緑の文字をフェードイン
    tl.fromTo(".loading-title", {
      opacity: 0,
      y: 0
    }, {
      opacity: 1,
      duration: 0.5,
      ease: "power3.out"
    });

    // ②緑の文字をフェードアウト
    tl.fromTo(".loading-title", {
      opacity: 1
    }, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.in"
    });

    // ③画像が下からスライド
    tl.fromTo(".loading-img", {
      y: "100%"
    }, {
      y: "0%",
      duration: 0.8,
      stagger: 0.2,
      ease: "power4.out"
    });

    // ④テキスト再表示(色変更)
    tl.fromTo(".loading-title", {
      opacity: 0,
      y: 100
    }, {
      opacity: 1,
      y: 0,
      color: "#fff",
      duration: 0.5,
      ease: "power3.out"
    });

    // ⑤ ローディング画面をフェードアウト
    tl.fromTo(".loading", {
      opacity: 1
    }, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      onComplete: function onComplete() {
        document.querySelector(".loading").remove();
        document.body.classList.remove("loading-active"); // 忘れずに解除！
      }
    });
  }
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
  // // モーダルを開く処理
  // $(".js-modal-open").on("click", function (e) {
  //   e.preventDefault(); // リンクのデフォルト動作を無効化
  //   const src = $(this).find("img").attr("src"); // クリックされた画像のパスを取得
  //   const modal = $(".js-modal"); // モーダルの要素を取得
  //   console.log("モーダル開いたよ");
  //   modal.html(`<img src="${src}" alt="" class="modal__image">`); // モーダルに画像を挿入
  //   modal.css("display", "flex"); // display: flexに変更して表示
  //   $("body").css("overflow", "hidden"); // 背景のスクロールを無効化

  //   // デバッグ用
  //   console.log("モーダルを開きました", src);
  // });

  // // モーダルを閉じる処理
  // $(".js-modal").on("click", function () {
  //   $(this).css("display", "none"); // display: noneに変更して非表示
  //   $("body").css("overflow", "auto"); // 背景のスクロールを有効化

  //   // デバッグ用
  //   console.log("モーダルを閉じました");
  // });

  // モーダルを開く処理
  // $(".js-modal-open").on("click", function (e) {
  //   e.preventDefault(); // リンクのデフォルト動作を無効化
  //   const src = $(this).find("img").attr("src"); // クリックされた画像のパスを取得
  //   const modal = $(".js-modal"); // モーダルの要素を取得

  //   modal.html(`<img src="${src}" alt="" class="modal__image">`); // モーダルに画像を挿入
  //   modal.fadeIn(); // モーダルを表示
  //   $("body").css("overflow", "hidden"); // 背景のスクロールを無効化
  // });

  // // モーダルを閉じる処理
  // $(".js-modal").on("click", function () {
  //   $(this).fadeOut(); // モーダルを非表示
  //   $("body").css("overflow", "auto"); // 背景のスクロールを有効化

  // });

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

  //   // informationページタグ
  //   // readyはページが完全に読み込まれた後に中のコードを実行する仕組み
  //   $(document).ready(function () {
  //     $(".js-tab-button").on("click", function () {
  //       // すべてのタグから'is-active'クラスを削除
  //       $(".js-tab-button").removeClass("is-active");
  //       // クリックされたタグに'is-active'クラスを追加
  //       $(this).addClass("is-active");
  //       // すべてのタブコンテンツから'is-active'クラスを削除
  //       $(".js-tab-content").removeClass("is-active");

  //       // クリックされたボタンに対応するタブコンテンツを表示
  //       var number = $(this).data("number");
  //       $("#" + number).addClass("is-active");
  //     });
  //   });

  //   //リンクを押すと、該当のtabが開いたページに飛ぶ
  //   document.addEventListener("DOMContentLoaded", function () {
  //     // 現在のURLのパラメーターを取得
  //     const params = new URLSearchParams(window.location.search);
  //     const section = params.get("section"); // 例: "tab02"

  //     // section の値がある場合、該当タブをアクティブにする
  //     if (section) {
  //       const targetTab = document.getElementById(section);
  //       if (targetTab) {
  //         // 全タブの `is-active` を削除
  //         document.querySelectorAll(".js-tab-content").forEach((tab) => {
  //           tab.classList.remove("is-active");
  //         });
  //         document.querySelectorAll(".js-tab-button").forEach((button) => {
  //           button.classList.remove("is-active");
  //         });

  //         // 該当タブをアクティブにする
  //         targetTab.classList.add("is-active");

  //         // 対応するタブボタンもアクティブにする
  //         const activeButton = document.querySelector(
  //           `.js-tab-button[data-number="${section}"]`
  //         );
  //         if (activeButton) {
  //           activeButton.classList.add("is-active");
  //         }

  //         // **スクロール位置を調整**
  //         setTimeout(() => {
  //           const headerHeight = document.querySelector(".header").offsetHeight; // ヘッダーの高さを取得
  //           const tabMenuHeight = document.querySelector(
  //             ".information-tab__menu"
  //           ).offsetHeight; // タブメニューの高さを取得
  //           const offset = headerHeight + tabMenuHeight + 50; // 余白を考慮（50px）

  //           window.scrollTo({
  //             top:
  //               targetTab.getBoundingClientRect().top + window.scrollY - offset,
  //             behavior: "smooth",
  //             // behavior: "auto" // 一瞬でスクロール
  //           });
  //         }, 100); // 100ms 待ってからスクロール
  //         // }, 0);
  //       }
  //     }
  //   });

  // blogページsidebar記事
  $(document).ready(function () {
    // トグルの年をクリックした際の処理
    $(".archive-list__year").on("click", function () {
      var $yearBlock = $(this); // ▶2023 のブロック全体
      var $icon = $yearBlock.find(".archive-list__toggle"); // ▶ を探す
      var $monthList = $yearBlock.next(".archive-list__month"); // 次の月リストを探す

      if ($monthList.length > 0) {
        // 月リストがある場合のみ処理
        if ($monthList.is(":visible")) {
          $monthList.slideUp(300); // 300msで非表示
          $icon.text("▶"); // アイコンを切り替え
        } else {
          $monthList.slideDown(300); // 300msで表示
          $icon.text("▼"); // アイコンを切り替え
        }
      }
    });
    // 初期状態設定: 2023年のトグルを開いた状態にする
    var $initialToggle = $(".archive-list__item").first(); // 最初の<li>要素 (2023)
    $initialToggle.find(".archive-list__month").show(); // サブメニューを表示
    $initialToggle.find(".archive-list__toggle").first().text("▼"); // トグルボタンを「▼」に変更
  });

  //   // Voice
  //   document.addEventListener("DOMContentLoaded", function () {
  //     const paginationItems = document.querySelectorAll(".pagination__list");

  //     paginationItems.forEach((item) => {
  //       item.addEventListener("click", function (event) {
  //         event.preventDefault(); // ページ遷移を防ぐ

  //         // すべてのページから `pagination__list--green` を削除
  //         paginationItems.forEach((el) =>
  //           el.classList.remove("pagination__list--green")
  //         );

  //         // クリックされたページに `pagination__list--green` を追加
  //         this.classList.add("pagination__list--green");
  //       });
  //     });
  //   });

  //   // FAQアコーディオンページ
  //   $(".js-faq-question").on("click", function () {
  //     $(this).next().slideToggle();
  //     $(this).toggleClass("is-open");
  //   });

  //   $(".js-test-button").on("click", function () {
  //     console.log("テストボタンがクリックされました！");
  //   });
});
// console.log("script.js は読み込まれました ✅");