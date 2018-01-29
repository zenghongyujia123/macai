$(function () {
  var loading = false;  //状态标记
  $(document.body).infinite().on("infinite", function () {
    if (loading) return;
    loading = true;
    setTimeout(function () {
      $("#list").append("<p> 我是新加载的内容 </p>");
      loading = false;
    }, 1500);   //模拟延迟
  });
});