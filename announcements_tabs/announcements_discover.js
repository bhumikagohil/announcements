var query,
  company_cards_present = [];

const min_query_length = 3;
const spinner = `<div class="spinner"></div>`;

$(document).ready(function () {
  // Fetching Followed Companies
  fetchData(
    `http://${hostname}/corpann/api/company/following/`,
    renderFollowedCompanies
  );

  //Get Value from Input
  $(document).ready(function () {
    $("#input-field").on("input", function () {
      query = $(this).val();
      if (query.length >= min_query_length) {
        //   Fetching Autocomplete Sugguestions
        fetchData(
          `http://${hostname}/corpann/api/autocomplete/?search=${query}`,
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
                        <button id="${item.scrip_id}" class="add-button" onclick="createCard('${item.company_name}','${item.scrip_id}')">Add</button>
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
  

  company_cards_present.push(parseInt(id));

  const card = `
                <div class="discover_card" id="${id}">
                    <h5 class="card-title"> ${name} </h5>
                    <button class="status-button" onclick="removeCard('${id}', this)">
                     ${text || spinner}
                    </button>
                </div>
            `;

  $(".autocomplete").empty();

  $("#input-field").val("");

  document
    .querySelector("#cards-container")
    .insertAdjacentHTML("afterbegin", card);

  getCompanyStatus(name, id);
}

// Fetching Company Status

function getCompanyStatus(name, id) {
  fetchData(
    `http://${hostname}/corpann/api/follow/?company=${id}`,
    checkStatus
  );
}

function checkStatus(data) {
  if (data.company_status === "Confirmed") {
    $("#" + data.scrip_id).children("button").html("Unfollow");
  } else {
    card = $("#cards-container").children().first()
    card.children("button").html("Try again").css("background-color", "#4caf50")
    setTimeout(()=>{removeGivenCard(card)},1000);
    company_cards_present.splice(company_cards_present.indexOf(card.attr("id")),1)
  }
}

function removeGivenCard(card){
  card.remove()
}

// Removing Card on Unfollow

function removeCard(id, obj) {
  $(obj).html(spinner)
  company_cards_present = company_cards_present.filter(function (e) {
    return e !== parseInt(id);
  });
  fetchData(
    `http://${hostname}/corpann/api/unfollow/?company=${id}`,
    checkUnfollowStatus
  );
  
}


function checkUnfollowStatus(data) {
  if (data.company_status === "Confirmed") {
      $("#" + data.scrip_id).remove();
  } else {
    $("#status-button").html("Unfollow")
  }
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
      console.log(err);
    });
}

async function postData(url = '', data = {}, onSuccess) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  }).then(function (response) {
    return response.json(); // parses JSON response into native JavaScript objects
  })
  .then(function (response) {
    onSuccess(response.data);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
}