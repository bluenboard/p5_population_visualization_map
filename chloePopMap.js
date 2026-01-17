/*
 Name:        Programming Assignment 1 - Population bubble map
 Author:      Chloe Trinh
 Created:     23-Sept-2024
 Updated:     14-Oct-2024


 Notes:
 I reffered a lot to this video by coding train:
 https://www.youtube.com/watch?v=ZiYdOwOrGyc
 I used leaflet for some of the map integration code:
 https://leafletjs.com/examples/quick-start/
*/


let mapDiv;
var population;
var leafletMap;


function preload(){
  //loads my CSV file
  population = loadStrings('country-cities-data.csv');
}


function setup() {
  createCanvas(800, 800);
  
  //initialize the map
  initializeMap();
  
  //grabs data from csv file
  for (var i = 1; i < population.length; i++){
    //this line essentially splits the data into individual peices of data
    var data = population[i].split(/,/);
    let cityName = data[0];
    let cityPopulation = parseInt(data[2]);
    let cityLatitude = parseFloat(data[3]);
    let cityLongitude = parseFloat(data[4]);
    
    let cityColor;
    let cityFill;

    //alternates colours for visibility
    let cityModulo = (i % 2);
    if (cityModulo === 0){
      cityColor = 'green';
      cityFill = '#AFE1AF';
    }
    else{
      cityColor = 'blue';
      cityFill = '#4169E1';
    }
    
    //creates the bubbles
    let circle = L.circle([cityLatitude, cityLongitude], {
      color: cityColor,
      fillColor: cityFill,
      fillOpacity: 0.5,
      radius: cityPopulation/2
    }).addTo(leafletMap);


    //shows popup with city name and population
    circle.bindPopup(`<b>${cityName}</b><br>Population: ${parseInt(cityPopulation).toLocaleString()}`);
  }


  //adds location marker for JFSS
  let marker = L.marker([43.560227, -79.716904]).addTo(leafletMap);
  marker.bindPopup("<b>John Fraser Secondary School</b>").openPopup();
}


//initalizes map
function initializeMap() {
  mapDiv = createDiv();
  mapDiv.id('map');
  mapDiv.position(0, 0);
  mapDiv.size(800, 800);
  
  //centers map and zooms on canada
  leafletMap = L.map('map').setView([55, -100], 3);


  //sets up tiles (leaflet code)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(leafletMap);
}