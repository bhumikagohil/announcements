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

$(document).ready(function () {
  fetchAllBlogs();
});

function fetchAllBlogs() {
  const endpoint = `http://${hostname}/corpann/api/fetch/announcements/`;

  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      if (response.data.length < 1) {
        $("#blogs-empty-case").html("You do not have any blogs yet.");
      } else {
        $("#blogs-empty-case").empty();
        const newCard = response.data.map((item) => {
          return `
      <div class="infinite-item">
      <div class="row">
          <div class="card mb-3 border-0 shadow-sm" class="blog-card">
              <div class="row no-gutters">
                  <div class="col-md-3 col-sm-pull-9 order-md-2">

                      <img src="${item.blog_urlToImage}"
                          class="borders-0 card-img-top px-3 pb-4 my-1" alt="Image">

                  </div>
                  <div class="col-md-9 col-sm-push-3  order-md-1">
                      <div class="card-body">

                          <a href="/news/query/?query=${item.blog_topic}">
                              <h6 class="font-weight-bold d-inline text-uppercase blog-card-title">
                                  ${item.blog_topic} </h6>
                          </a>

                          <a target="__blank"
                              href="${item.blog_object_url}">
                              <h5 class="card-title font-weight-bold blog-card-text">
                                 ${item.blog_object_title}
                              </h5>
                          </a>

                          <p class="card-text d-inline">
                            <small class="text-muted"> 
                                ${item.blog_object_source_name}&nbsp;&nbsp;&nbsp;&nbsp;  
                                ${item.blog_object_published_at}
                            </small>
                          </p>


                          <div class="mb-2">
                              <a class="text-secondary" target="__blank"
                                  href="${item.blog_object_url}">
                                  more
                              </a>

                          </div>

                          <div class="d-flex justify-content-left">
                              <a id="share-blog">
                                  <img class="img-fluid blog-card-icons"
                                      src="/static/images/news/share_logo.2c59c6aee104.png"
                                      alt="Share">
                              </a>

                              <div class="ml-1" id="share-options">
                                  <a class="social-share-mobile-only ml-1"
                                      href="whatsapp://send?text=https://economictimes.indiatimes.com/markets/stocks/stock-watch/share-price-of-pi-industries-jumps-as-sensex-gains-446-43-points/articleshow/83109189.cms%0a%0aKeep updated on 'agrochemicals' at keepup.live/follow/agrochemicals"
                                      data-action="share/whatsapp/share">
                                      <img class="img-fluid"
                                          src="/static/images/news/whatsapp_logo_resized.58799d0a3d24.png"
                                          alt="Share"></a>

                                  <a target="__blank" class="ml-1"
                                      href="https://twitter.com/intent/tweet?text=https://economictimes.indiatimes.com/markets/stocks/stock-watch/share-price-of-pi-industries-jumps-as-sensex-gains-446-43-points/articleshow/83109189.cms%0aShare price of PI Industries  jumps  as Sensex  gains  446.43 points%0a%0aKeep updated on 'agrochemicals' at keepup.live/follow/agrochemicals"
                                      data-show-count="false">
                                      <img class="img-fluid blog-card-icons"
                                          src="/static/images/news/twitter_logo.dcbd010792cc.png"
                                          alt="Tweet"></a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
      `;
        });

        qSelector = document.querySelector("#blogs-cards-container");
        qSelector.insertAdjacentHTML("afterbegin", newCard);
      }
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
}

// FOLLOW BLOGS

var query;

const min_query_length = 3;

$(document).ready(function () {
  $("#input-field").on("input", function () {
    query = $(this).val();
    if (query.length >= min_query_length) {
      // Fetching Autocomplete Sugguestions
      fetchData(
        `http://${hostname}/corpann/api/autocomplete/?search=${query}`,
        renderAutocompleteItem
      );
    } else {
      $(".autocomplete").empty();
    }
  });
});

// Autocomplete Items

function renderAutocompleteItem(data) {
  console.log(data);
}

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
