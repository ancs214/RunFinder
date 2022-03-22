let resultsEl = document.querySelector("#results");
let userFormEl = document.querySelector("#user-form");
let raceSearchEl = document.querySelector("#race-search");


let getRaces = function(searchInput) {
    //modify apiUrl to include zipcode search input
    let apiUrl = "https://cors-anywhere.herokuapp.com/https://runsignup.com/Rest/races?format=json&events=T&race_headings=T&race_links=T&include_waiver=F&include_multiple_waivers=F&include_event_days=T&include_extra_date_info=F&page=2&results_per_page=10&sort=date+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&country=US&event_type=running_race&distance_units=K&zipcode=" + searchInput + "&radius=50";
    fetch(apiUrl)
        .then(function(response) {
            console.log(response);
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        console.log(data);
                        //plug data into displayRaces function
                        displayRaces(data);

                    })
            }
        })
}

// function to reset the race results when search is clicked more than once
function resetResults() {
    while (resultsEl.firstChild) {
        resultsEl.removeChild(resultsEl.firstChild)
    }
}



//function to display race events
let displayRaces = function(data) {
        for (let i = 0; i < data.races.length; i++) {
            let name = data.races[i].race.name;
            let raceNames = document.createElement("div");
            raceNames.innerHTML = name + "&nbsp&nbsp";
            let raceLinks = document.createElement("a");
            raceLinks.innerHTML = "Click here for site!";
            raceLinks.setAttribute("href", data.races[i].race.url);
            raceNames.appendChild(raceLinks);
            resultsEl.appendChild(raceNames);
        }
    }
    // data.races[i].race.name.length

let formSubmitHandler = function(event) {
    //prevent default reloading of page
    event.preventDefault();
    // clear previous results from page
    resetResults();
    //obtain text input for zip code searched for; trim any space around
    let searchInput = raceSearchEl.value.trim();
    if (searchInput) {
        getRaces(searchInput);
        //clear search form after hitting submit
        userFormEl.reset();
    }
    //place else statement here for blank or invalid input
}


//on form submit, run formSubmitHandler function to obtain zip code
userFormEl.addEventListener("submit", formSubmitHandler)


//pass in zip code to getRaces function
