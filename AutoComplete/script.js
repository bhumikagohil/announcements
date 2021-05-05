var query,
  company_cards_present = [];

const min_query_length = 3;
const hostname = window.location.host;


$(document).ready(function () {
  // Fetching Followed Companies
  fetchData(
    `http://165.22.209.84/corpann/autocomplete/?search=chemical`,
    // `https://${hostname}/corpann/api/company/following/`,
    renderFollowedCompanies
  );

  //Get Value from Input
  $(document).ready(function () {
    $("#input-field").on("input", function () {
      query = $(this).val();
      if (query.length >= min_query_length) {
        //   Fetching Autocomplete Sugguestions
        fetchData(
          `http://165.22.209.84/corpann/autocomplete/?search=${query}`,
          renderAutocompleteItem
        );
      } else {
        $(".autocomplete").empty();
      }
    });
  });
});

// Fetching Followed Companies

function renderFollowedCompanies(data) {
  data.map((item) => {
    createCard(item.company_name, item.scrip_id, "Unfollow");
  });
}

// Autocomplete Items

function renderAutocompleteItem(data) {
  var filtered_autocomplete_sugguestions = data.filter(
    (item) => !company_cards_present.includes(item.scrip_id)
  );

  var new_autocomplete_item = filtered_autocomplete_sugguestions
    .map((item) => {
      return `
                    <li class="autocomplete-items" >
                       <p class="autocomplete-title"> ${item.company_name}</p>
                        <button id="add-button" onclick="createCard('${item.company_name}','${item.scrip_id}')">Add</button>
                    </li>
                `;
    })
    .join("\n");

  $(".autocomplete").empty();

  document
    .querySelector(".autocomplete")
    .insertAdjacentHTML("afterbegin", new_autocomplete_item);
}

// Creating New Card
function createCard(name, id, text) {
  const spinner = `<div class="spinner"></div>`;

  company_cards_present.push(parseInt(id));

  const card = `
                <div class="card" id="${id}">
                    <h5 class="card-title"> ${name} </h5>
                    <button id="status-button" onclick="removeCard('${id}')">
                     ${text || spinner}
                    </button>
                </div>
            `;

  $(".autocomplete").empty();

  $("#input-field").val("");

  document
    .querySelector("#cards-container")
    .insertAdjacentHTML("afterbegin", card);
  getCompanyStatus(name);
}

// Fetching Company Status

function getCompanyStatus(name) {
  // fetchData(`http://165.22.209.84/corpann/autocomplete/?search=${name}`, $("#status-button").html("Unfolllow"))

  setTimeout(function () {
    $("#status-button").html("Unfollow");
  }, 3000);
}

// Removing Card on Unfollow

function removeCard(id) {
  company_cards_present = company_cards_present.filter(function (e) {
    return e !== parseInt(id);
  });

  $("#" + id).remove();
}

// Fetch Function

function fetchData(endpoint, onSuccess) {
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      onSuccess(response.data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
}
