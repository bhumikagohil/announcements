// const hostname = window.location.host;
const endpoint = `http://${hostname}/corpann/api/fetch/announcements/`;

fetch(endpoint)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const newCard = data.data.map(item => {
            return `
                <div class="card">
                    <h5 class="title"> ${item.title} </h5>
                    <p class="time"> ${item.disseminated_time}</p>
                    <hr/>
                    <div class="summary">
                        ${item.summary}
                    </div>
                </div>
            `
        })

        document.querySelector(".cards-container").insertAdjacentHTML("afterbegin", newCard);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });