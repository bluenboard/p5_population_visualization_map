/*
 Name:        Programming Assignment 1 - Population bubble map
 Author:      Chloe Trinh
 Created:     23-Sept-2024
 Updated:     14-Oct-2024

 Notes:
 I referred a lot to this video by Coding Train:
 https://www.youtube.com/watch?v=ZiYdOwOrGyc
 I used Leaflet for some of the map integration code:
 https://leafletjs.com/examples/quick-start/
*/

//main.js


let populationData, genderData;
let leafletMap;
const cityGenderMap = new Map();
let adjustedname

//loads data from csv files
function preload() {
    populationData = loadStrings('country.csv');
    genderData = loadStrings('gender.csv');
}

//initalizes map
function initializeMap() {
    leafletMap = L.map('leafletMap ').setView([50, -85], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(leafletMap);
}

function setup() {
    initializeMap();

    //loads gender data
    for (let i = 0; i < genderData.length; i++) {
        //this line essentially splits the data into individual peices of data
        var dataG = genderData[i].split(/,/);
        let cityName = dataG[0];
        let cityMale = parseInt(dataG[2]);
        let cityFemale = parseInt(dataG[3]);
        cityGenderMap.set(cityName.slice(1), new CityGender(parseInt(cityMale), parseInt(cityFemale)));
    }


    //loads population data and creates instances for bubbles
    for (var i = 1; i < populationData.length; i++) {
        //this line essentially splits the data into individual peices of data
        var data = populationData[i].split(/,/);
        let cityName = data[0];
        let cityPopulation = parseInt(data[2]);
        let cityLatitude = parseFloat(data[3]);
        let cityLongitude = parseFloat(data[4]);
      yesCityName =cityName.substring(1, cityName.length-1)

        //if the city is assigned a gender
        if (cityGenderMap.has(yesCityName)) {

            const cityGender = cityGenderMap.get(yesCityName);
            const cityBubble = new CityBubble(
                yesCityName,
                parseInt(cityPopulation),
                parseFloat(cityLatitude),
                parseFloat(cityLongitude),
                cityGender
            );
            cityBubble.drawBubble(leafletMap);
            console.log(cityGender)
        }
        
        else {
          let cityColor;
          let cityFill;
          cityColor = 'green';
          cityFill = '#AFE1AF';
          let circle = L.circle([cityLatitude, cityLongitude], {
            color: cityColor,
            fillColor: cityFill,
            fillOpacity: 0.5,
            radius: cityPopulation/2
          }).addTo(leafletMap);
          
          //shows popup with city name and population
          circle.bindPopup(`<b>${cityName}</b><br>Population:
${parseInt(cityPopulation).toLocaleString()}`);
      }
    }
  
   //adds location marker for JFSS
   let marker = L.marker([43.560227, -79.716904]).addTo(leafletMap);
   marker.bindPopup("<b>John Fraser Secondary School</b>").openPopup();

}