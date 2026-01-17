// CityBubble.js

/**
 * Represents the city bubble properties.
 */
class CityBubble {
    /**
     * Creates an instance for the city to create a bubble.
     * 
     * @constructor
     * @param {string} cityName - the name of the city.
     * @param {integer} cityPopulation - the city's total population.
     * @param {number} cityLatitude - the city's latitude.
     * @param {number} cityLongitude - the city's longitude.
     * @param {CityGender} cityGender - city’s gender distribution instance.
     */
    constructor(cityName, cityPopulation, cityLatitude, cityLongitude, cityGender) {
        this.cityName = cityName;
        this.cityPopulation = cityPopulation;
        this.cityLatitude = cityLatitude;
        this.cityLongitude = cityLongitude;
        this.cityGender = cityGender;  // Use the CityGender instance passed to the constructor
    }

    /**
     * Draws the city bubble on the provided map.
     * @param {Object} map - the Leaflet map instance on which the bubble is drawn.
     */
    drawBubble(map) {
        let color, fillColor;

        // Determines bubble color based on predominant gender and modulo
        if (this.cityGender.getPredominantGender() === 'male') {
            color = 'blue';
            fillColor = this.cityPopulation % 2 === 0 ? '#4169E1' : '#87CEEB';
        } else {
            color = 'pink';
            fillColor = this.cityPopulation % 2 === 0 ? '#FFC0CB' : '#FFB6C1';
        }

        // Creates bubble
        let circle = L.circle([this.cityLatitude, this.cityLongitude], {
            color: color,
            fillColor: fillColor,
            fillOpacity: 0.5,
            radius: this.cityPopulation / 2
        }).addTo(map);

        // Shows popup with city name and population
        circle.bindPopup(`<b>${this.cityName}</b><br>Population: ${this.cityPopulation.toLocaleString()}`);
    }
}
