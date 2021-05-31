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

var query;

const min_query_length = 3;

$(document).ready(function () {
  $("#input-field").on("input", function () {
    query = $(this).val();
    if (query.length >= min_query_length) {
      //   Fetching Autocomplete Sugguestions
      //   fetchData(
      //     `http://${hostname}/corpann/api/autocomplete/?search=${query}`,
      //     renderAutocompleteItem
      //   );
      console.log(query);
    } else {
      $(".autocomplete").empty();
    }
  });
});

function fetchData(endpoint, onSuccess) {
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      onSuccess(response.data);
    })
    .catch(function (err) {
      console.log(err);
    });
}
