

$(".cat-illustration-time").on("click", function () {
  $(".cat-illustration-time").removeClass("active");
  $(this).addClass("active");
  var type = $(this).data("option");
  setTimeout(function() {
    if (type === "day") {
      $(".cat-illustration-time").attr('class', 'cat-illustration-time day');
    } else if (type === "night") {
      $(".cat-illustration-time").attr('class', 'cat-illustration-time night');
    } else if (type === "dusk") {
      $(".cat-illustration-time").attr('class', 'cat-illustration-time dusk');
    } else if (type === "sunset") {
      $(".cat-illustration-time").attr('class', 'cat-illustration-time sunset');
    } 
  }, 300);
});
