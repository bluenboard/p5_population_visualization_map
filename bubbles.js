bubbles.js
//creates the bubbles
export function bubbles (latitude, longitude, population, name, map){
    let circle = L.circle([latitude, longitude], {
        color: 'green',
        fillColor: '#AFE1AF',
        fillOpacity: 0.5,
        radius: population/2
    }).addTo(map);


    //Shows popup with city name and population
    circle.bindPopup(`<b>${name}</b><br>Population: ${parseInt(population).toLocaleString()}`);
}