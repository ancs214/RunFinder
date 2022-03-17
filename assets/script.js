let resultsEl = document.querySelector("#results");


let getRaces = function(){
    let apiUrl = "https://cors-anywhere.herokuapp.com/https://runsignup.com/Rest/races?format=json&events=T&race_headings=F&race_links=T&include_waiver=F&include_multiple_waivers=F&include_event_days=F&include_extra_date_info=F&page=1&results_per_page=20&sort=name+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&city=Columbus&state=OH&event_type=running_race&distance_units=K&radius=50";
    fetch(apiUrl)
    .then(function(response) {
        console.log(response);
            if(response.ok) {
                response.json()
                .then(function(data) {
                    console.log(data);
                    displayRaces(data);
                   
                })
            }
        })
}

getRaces();



let displayRaces = function(data){
    for (i=0; i<data.races[i].race.name.length; i++) {
        let name = data.races[i].race.name;
        let raceNames = document.createElement("div");
        raceNames.innerHTML = name;
        let raceLinks = document.createElement("a");
        raceLinks.innerHTML = "Click here for site!";
        raceLinks.setAttribute("href", data.races[i].race.url);
        raceNames.appendChild(raceLinks);
        resultsEl.appendChild(raceNames);
    }
}

        




