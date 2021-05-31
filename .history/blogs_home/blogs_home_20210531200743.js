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

$("#share-blog").click(function () {
  $("#share-options").toggle();
});

// FOLLOW BLOGS
{ 
    "data": [
     {
         "blog_urlToImage": "/static/images/news/livemint.jpeg",
         "blog_topic": "aluminium",
blog_object_url: ,
blog_object_title: ,
blog_object_source_name: ,
blog_object_published_at: ,
     }    ]
}