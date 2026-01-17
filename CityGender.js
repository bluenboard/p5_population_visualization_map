// CityGender.js
console.log('CityGender.js loaded');

/**
 * Represents gender distribution data for a city.
 */
class CityGender {
    /**
     * Creates an instance for the city's gender.
     * @param {integer} cityMale - male population of the city.
     * @param {integer} cityFemale - female population of the city.
     */
    constructor(cityMale, cityFemale) {
        this._cityMale = cityMale;
        this._cityFemale = cityFemale;
    }

  
    /**
     * Sets the predominant gender to whichever value is greater.
     * @method
     * @returns {string} - 'male' if the male population is higher, 'female' otherwise.
     */
    getPredominantGender() {
        return this._cityMale > this._cityFemale ? String('male') : String('female');
    }

    /**
     * Gets the male population of the city.
     * @returns {integer} The male population.
     */
    get cityMale() {
        return this._cityMale;
    }


    /**
     * Gets the female population of the city.
     * @returns {integer} The female population.
     */
    get cityFemale() {
        return this._cityFemale;
    }
}