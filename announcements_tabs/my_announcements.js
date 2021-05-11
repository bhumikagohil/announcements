// const hostname = window.location.host;
// const endpoint = `http://${hostname}/corpann/api/fetch/announcements/`;

const endpoint = "http://localhost:8000/discover";

// Fetch Announcements

fetch(endpoint)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Create New Card
    // CHANGE response.data
    const newCard = data.map((item) => {
      return `
                <div class="card" id=${item.news_id}>
                    <h5 class="title">
                         ${item.title} 
                    </h5>
                    <p class="time"> 
                        ${item.disseminated_time}
                    </p>
                    <hr/>
                    <div class="summary">
                        ${item.summary}
                    </div>
                </div>
                `;
    });

    document
      .querySelector(".cards-container")
      .insertAdjacentHTML("afterbegin", newCard);
  })
  .catch(function (err) {
    console.log("error: " + err);
  });
