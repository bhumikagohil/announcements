var query,
  autocompleteItems = [],
  cardsPresent = [];

const minLength = 3;

$(document).ready(function () {
  // Fetching Followed Companies
  fetchData(
    `http://165.22.209.84/corpann/autocomplete/?search=chemical`,
    renderFollowedCompanies
  );

  //Get Value from Input
  $(document).ready(function () {
    $("#input-field").on("input", function () {
      query = $(this).val();
      if (query.length >= minLength) {
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
  var filteredArray = data.filter(
    (item) => !cardsPresent.includes(item.scrip_id)
  );

  var newItem = filteredArray
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
    .insertAdjacentHTML("afterbegin", newItem);
}

// Creating New Card
function createCard(name, id, text) {
  const loader = `<div class="spinner"></div>`;

  cardsPresent.push(parseInt(id));

  const card = `
                <div class="card" id="${id}">
                    <h5 class="title"> ${name} </h5>
                    <button id="status-button" onclick="removeCard('${id}')">
                     ${text || loader}
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
  cardsPresent = cardsPresent.filter(function (e) {
    return e !== parseInt(id);
  });

  $("#" + id).remove();
}

// Fetch Function

function fetchData(endpoint, onSucess) {
  fetch(endpoint)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      onSucess(response.data);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
}
