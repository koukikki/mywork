$(function() {
  let tabs = $(".p-index-tab__category"); // tabのクラスを全て取得し、変数tabsに配列で定義
  $(".p-index-tab__category").on("click", function() { // tabをクリックしたらイベント発火
    $(".js-active").removeClass("js-active"); // activeクラスを消す
    $(this).addClass("js-active"); // クリックした箇所にactiveクラスを追加
    const index = tabs.index(this); // クリックした箇所がタブの何番目か判定し、定数indexとして定義
    $(".p-index-content__wrapper").removeClass("js-show").eq(index).addClass("js-show"); // showクラスを消して、contentクラスのindex番目にshowクラスを追加
  })
})