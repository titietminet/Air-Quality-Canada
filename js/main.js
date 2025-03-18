import { view } from "./view.js";
import { Station } from "./modelLike.js";

console.log("main.js");

const listLike = [];

const listLocaleStorage = localStorage.getItem("like");

let city = new Set();

let first = true;

view.inputSearch.addEventListener("input", (e) => {
    if (e.target.value !== "") {
        view.boxSearch.classList.add("active");
        view.inputSearch.classList.add("active");
        view.sepSearch.classList.add("active");
        if(first){
            const data = fetch('https://api.weather.gc.ca/collections/aqhi-stations/items?f=json',{
                method: 'GET',
            })

            const element = data.then((response) => response.json());
            element.then((data) => {
                data.features.forEach((feature) => {
                    if (typeof feature.properties.location_name_en !== "undefined" && feature.properties.location_name_en.toLowerCase()[0] === e.target.value.toLowerCase()[0]) {
                        let url = feature.properties["url_msc-datamart_observation"];
                        if (typeof url !== "undefined") {
                            url = url.replace("http://", "https://");
                            console.log("Fetching URL:", url); // Debugging log
                            let proxyUrl = "https://api.allorigins.win/raw?url="; // Alternative public CORS proxy
                            let proxiedUrl = proxyUrl + encodeURIComponent(url); // Combine proxy and target URL
                                fetch(proxiedUrl)
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error(`HTTP error! status: ${response.status}`);
                                        }
                                        return response.text();
                                    })
                                    .then((text) => {
                                        const parser = new DOMParser();
                                        const doc = parser.parseFromString(text, "text/xml");
                                        const airQualityHealthIndex = doc.querySelector("airQualityHealthIndex");
                                        if (airQualityHealthIndex) {
                                            console.log("Air quality:", airQualityHealthIndex.textContent);
                                            const station = new Station(feature.id,feature.properties.location_name_en, airQualityHealthIndex.textContent);
                                            city.add(station);
                                            console.log("City:", city);

                                            // Clear previous results in boxSearch
                                            view.boxSearch.innerHTML = "";

                                            // Display stations in boxSearch
                                            city.forEach((station) => {
                                                console.log("Station:", station.getHtmlRehcerche());
                                                view.boxSearch.innerHTML += (station.getHtmlRehcerche());
                                            });
                                        } else {
                                            console.warn("No conditionAirQuality element found in XML.");
                                        }
                            });
                        }
                    }
                });
            });
            first = false;
        } else {
            let search = e.target.value.toLowerCase();
            console.log("search:", search);
            let searchCity = new Set();
            city.forEach((station) => {
                if (station.name.toLowerCase().includes(search)) {
                    searchCity.add(station);
                }
            });
            console.log("searchCity:", searchCity);
            view.boxSearch.innerHTML = "";
            searchCity.forEach((station) => {
                console.log("Station:", station.getHtmlRehcerche());
                view.boxSearch.innerHTML += (station.getHtmlRehcerche());
            });
        }
    } else {
        first = true;
        console.log("remove");
        view.boxSearch.classList.remove("active");
        view.inputSearch.classList.remove("active");
        view.sepSearch.classList.remove("active");
        view.boxSearch.innerHTML = "";
        city = new Set();
    }
});