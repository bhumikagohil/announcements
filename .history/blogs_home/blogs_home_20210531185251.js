// BLOGS HOME

$(".tabs").on("click", "a", function (e) {
  e.preventDefault();
  var tabId = $(this).attr("data-tab");
  $(this).closest(".tabs").find("a").removeClass("active");
  $(this).addClass("active");
  $(".tab-content").removeClass("active");
  $("#" + tabId).addClass("active");
});

// BLOGS

$("share-blog").click(function () {
  $("share-options").hide();
});

// FOLLOW BLOGS
