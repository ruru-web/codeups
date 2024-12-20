
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

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
        $("header").css("background-color", "")
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
	const mvSwiper = new Swiper(".js-mv-swiper", {
		loop: true,
		effect: "fade",
		speed: 3000,
		allowTouchMove: false,
		autoplay: {
			delay: 3000,
		},
	});

  // Campaign スクロールヒントのフェード処理
  $(".js-price-list").scroll(function () {
    $(".js-scroll-hint").fadeOut();
  });


  // campaignスライダー
  const campaignSwiper = new Swiper(".js-campaign-swiper", {
    slidesPerView: 'auto', // スライド数は自動調整
    loop: true, //ループ
    spaceBetween: 40, //40px空ける

    navigation: {
      nextEl: ".swiper-button-next", // 次へボタンのクラス
      prevEl: ".swiper-button-prev", // 前へボタンのクラス
    },
    // allowTouchMove: false,      // スワイプ操作を無効にしてボタン操作のみ
  });


  //トップに戻る
  const pageTop = $(".js-pagetop");
  const footer = $("footer");
  const footerHeight = footer.innerHeight(); //フッターの高さ

  pageTop.hide(); //初めにトップに戻るボタンを非表示
  $(window).scroll(function () { //スクロールが100px達したらボタン表示
    if ($(this).scrollTop() > 100) {
      pageTop.fadeIn();
    } else {
      pageTop.fadeOut();
    }
  });

  //ボタンをクリックするとページ上部にスクロールする
  pageTop.click(function () {
    $("body,html").animate(
      { scrollTop: 0,}, //ページを0pxまでスクロール
      500 //0.5秒
    );
    return false;
  });

  // ボタンがフッターと重ならないようにする
  $(window).on("scroll", function () {
    const footerHeight = footer.innerHeight(); //フッターの高さ {}内に記入しないと反映されない
    const windowHeight = $(window).height(); //ユーザーが見える画面（ウィンドウ）の高さ
    const scrollTop = $(window).scrollTop(); //ページの上からの距離
    const documentHeight = $(document).height(); //ページ全体の高さを取得します（フッターを含む）
    const distanceFromBottom = documentHeight - (scrollTop + windowHeight); //ページの下部までの残りの距離を計算
    //ページ全体の高さから、現在のウィンドウ下端の位置を引くことで「下端からページ最下部までの距離」を計算

    // レスポンシブ対応
    if ($(window).width() >= 769) { // 769px以上の場合
      //画面下部がフッターに近づいている状態であれば
      if (distanceFromBottom <= footerHeight) {
        pageTop.css({
          position: "absolute",
          bottom: footerHeight + 20,
        });
      } else {
        pageTop.css({
          position: "fixed",
          bottom: '20px',
        });
      }
    } else { // 768px以下の場合
      if (distanceFromBottom <= footerHeight) {
        pageTop.css({
          position: "absolute",
          bottom: footerHeight + 16,
        });
      } else {
        pageTop.css({
          position: "fixed",
          bottom: '16px',
        });
      }
    }

  });







  //画像のアニメーション
  //要素の取得とスピードの設定
  var box = $('.js-colorbox'), //クラスを取得
  speed = 700; // アニメーションの速度0.7s

  //.colorboxの付いた全ての要素に対して下記の処理を行う
  // box.each(function(){
  // $(this).append('<div class="color js-color"></div>')
  // // colorboxに<div class="color"></div>を追加
  // var color = $(this).find('.js-color'),
  // // 追加したcolor要素を取得
  // image = $(this).find('img');
  // // colorboxの中にある<img>タグを取得
  // var counter = 0;
  // // アニメーション実行回数を記録（最初は0）

  //  // 初期状態をセット
  // image.css('opacity','0'); // 画像を透明に設定
  // color.css('width','0%');  // 背景色の幅を0%に設定

  //   //スクロールで要素が見えたら実行（inview.jsを使用）
  //   color.on('inview', function(){
  //     if(counter == 0){
  //     $(this).delay(200).animate({'width':'100%'},speed,function(){
  //       //  少し遅らせてから実行,背景色を横に広げる
  //           image.css('opacity','1');   // 画像を表示（透明を解除）
            
  //           $(this).css({'left':'0' , 'right':'auto'});   // 背景位置を変更
  //           $(this).animate({'width':'0%'},speed);    // 背景色を消す
  //       })
  //         counter = 1;  // アニメーション実行済みとして記録
  //       }
  //   });
  // });


  if (box.length === 0) {
    console.warn('No elements with .js-colorbox class found.');
    return; // 処理を中断
  }

  // .js-colorbox の付いた全ての要素に対して処理を実行
  box.each(function() {
    var $this = $(this);

    // 必要な要素を追加し取得
    $this.append('<div class="color js-color"></div>');
    var color = $this.find('.js-color'),
        image = $this.find('img');

    // 初期状態をセット
    image.css({'opacity': '0'});
    color.css({'width': '0%'});

    // スクロールで要素が見えたら実行（inview.jsを使用）
    color.on('inview', function() {
      if (!$(this).data('animated')) {
        $(this).data('animated', true); // アニメーション済み
        $(this).delay(200).animate({'width': '100%'}, speed, function() {
          image.css('opacity', '1');
          $(this).css({'left': '0', 'right': 'auto'})
                 .animate({'width': '0%'}, speed);
        });
      }
    });
  });




    //アニメーション
  $(document).ready(function () {
    const leftSlides = $(".mv-loading__split-left .slide");
    // const leftSlides = $(".mv-loading__split-left");
    const rightSlides = $(".mv-loading__split-right .slide");
    // const rightSlides = $(".mv-loading__split-right");
    const totalSlides = leftSlides.length;
    let currentIndex = 0;

    // 最初のスライドを表示
    $(leftSlides[currentIndex]).addClass("active");
    $(rightSlides[currentIndex]).addClass("active");
  });

  // loading scroll lock
  if (window.location.pathname === '/index.html') {
    $(document).ready(function () {
      // bodyとhtmlのスクロール制御
      $("html, body").css({ height: "100%", overflow: "hidden" });

      // ローディングアニメーションの完了後にスクロール解除
      setTimeout(function () {
        $("html, body").css({ height: "", overflow: "" });
      }, 3000); // 適切なタイミングに合わせて調整
    });
  }
});