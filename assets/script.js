let resultsEl = document.querySelector("#results");
let userFormEl = document.querySelector("#user-form");
let raceStateSearchEl = document.querySelector("#race-state-search");
let beerResultsEl = document.querySelector("#beer-results");
let raceCitySearchEl = document.querySelector("#race-city-search");
let raceZipSearch = document.querySelector("#race-zip-search");

stateList = {
    'arizona': 'AZ',
    'alabama': 'AL',
    'alaska':'AK',
    'arkansas': 'AR',
    'california': 'CA',
    'colorado': 'CO',
    'connecticut': 'CT',
    'delaware': 'DE',
    'florida': 'FL',
    'georgia': 'GA',
    'hawaii': 'HI',
    'idaho': 'ID',
    'illinois': 'IL',
    'indiana': 'IN',
    'iowa': 'IA',
    'kansas': 'KS',
    'kentucky': 'KY',
    'louisiana': 'LA',
    'maine': 'ME',
    'maryland': 'MD',
    'massachusetts': 'MA',
    'michigan': 'MI',
    'minnesota': 'MN',
    'mississippi': 'MS',
    'missouri': 'MO',
    'montana': 'MT',
    'nebraska': 'NE',
    'nevada': 'NV',
    'new hampshire': 'NH',
    'new jersey': 'NJ',
    'new mexico': 'NM',
    'new york': 'NY',
    'north carolina': 'NC',
    'north dakota': 'ND',
    'ohio': 'OH',
    'oklahoma': 'OK',
    'oregon': 'OR',
    'pennsylvania': 'PA',
    'rhode island': 'RI',
    'south carolina': 'SC',
    'south dakota': 'SD',
    'tennessee': 'TN',
    'texas': 'TX',
    'utah': 'UT',
    'vermont': 'VT',
    'virginia': 'VA',
    'washington': 'WA',
    'west virginia': 'WV',
    'wisconsin': 'WI',
    'wyoming': 'WY'}
    



//function to find nearby races
let getRaces = function(citySearch, stateSearch) {
    console.log(stateSearch);
    //grab state abbrev from statelist array
    let stateAbbrev = (stateList[stateSearch]);
    //plug in citysearch and state abbrev to fetch request
    let apiUrl = "https://cors-anywhere.herokuapp.com/https://runsignup.com/Rest/races?format=json&events=T&race_headings=T&race_links=T&include_waiver=F&include_multiple_waivers=F&include_event_days=T&include_extra_date_info=F&page=2&results_per_page=10&sort=date+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&country=US&event_type=running_race&distance_units=K&city=" + citySearch + "&state=" + stateAbbrev + "&radius=50";
    fetch(apiUrl)
        .then(function(response) {
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



//function to find nearby breweries
let getBeer = function(citySearch, stateSearch) {
    //plug in city and state search to fetch request
    fetch("https://api.openbrewerydb.org/breweries?by_city=" + citySearch + "&by_state=" + stateSearch + "&per_page=10")
    .then(function(response) {
        if (response.ok) {
            response.json()
            .then(function(data) {
                displayBreweries(data);
            })
        }
    })
}


//function to display breweries
let displayBreweries = function(data) {
    
    for (i = 0; i < data.length; i ++) {
        //create div container for brewery name results
        let breweryNamesContainer = document.createElement("div");
        //create div for each result
        let breweryNames = document.createElement("a");
        //add names and url links to div
        breweryNames.innerHTML = data[i].name;
        breweryNames.setAttribute("href", data[i].website_url)
        //append div to container
        breweryNamesContainer.appendChild(breweryNames);
        //append to page
        beerResultsEl.appendChild(breweryNamesContainer);
    }
}


// function to reset the race results when search is clicked more than once
function resetResults() {
    while (resultsEl.firstChild) {
        resultsEl.removeChild(resultsEl.firstChild)
    }
    while (beerResultsEl.firstChild) {
        beerResultsEl.removeChild(beerResultsEl.firstChild);
    }
}



//function to display race events
let displayRaces = function(data) {
        
        for (let i = 0; i < data.races.length; i++) {
            let name = data.races[i].race.name;
            let raceNames = document.createElement("div");
            let raceLinks = document.createElement("a");
            raceLinks.innerHTML = name;
            raceLinks.setAttribute("href", data.races[i].race.url);
            raceNames.appendChild(raceLinks);
            resultsEl.appendChild(raceNames);
        }
    }




let formSubmitHandler = function(event) {
    //prevent default reloading of page
    event.preventDefault();
    // clear previous results from page
    resetResults();
    //set city/stateSearch to the user's search input and trim space around
    let citySearch = raceCitySearchEl.value.trim();
    let stateSearch = raceStateSearchEl.value.trim();
    //if user input, pass in results to getBeer/Races functions
    if (citySearch || stateSearch) {
        getBeer(citySearch, stateSearch);
        // getStateTwoDigitCode(stateSearch);
        getRaces(citySearch, stateSearch);
        //clear search form after hitting submit
        userFormEl.reset();
    }
}


    

//on form submit, run formSubmitHandler function to obtain zip code
userFormEl.addEventListener("submit", formSubmitHandler)


