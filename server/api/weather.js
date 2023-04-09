const axios = require("axios");
const WEATHER = require("../models/Weather");


// Configuring the path to read the environment variable file, .env, to get the weather api key
require('dotenv').config({path: "./../../../.env"});

const baseUrl = "http://api.openweathermap.org/data/2.5/weather";

class Weather {

    /**
     * Gets the weather data based on the city and which temp system to converge to (imperial/metric system)
     *
     * @param {string} cityName The city used to get the weather info from the weather api
     * @param {string} tempMetric This is either "imperial" (use Fahrenheit) or "metric" (use Celsius)
     * @return {JSON} The data response from the weather api call.
     */

    saveWeatherDataToMongo = async (cityName, data) => {
        const filter = {
            city: cityName
        }

        const replace = {
            ...filter,
            ...data,
            data: Date.now()
        }
        await this.findOneReplace(filter, replace);
    }
    /**
     * Saves Weather data to MongoDb
     *
     * @param {string} cityName The cityName is used as unique identifier to find the document from mongo
     * @return {JSON} The data response from the mongodb.
     */
    getWeatherDataFromMongo = async (cityName) => {
        return WEATHER.findOne({city: cityName});
    }
    /**
     * If a document already exists with the filter, then replace, if not, add.
     *
     * @param {{city: string}} filter The filter is the city used as unique identifier to find the document from mongo
     * @return {JSON} The data response from the mongodb.
     */
    async findOneReplace(filter, replace) {
        await WEATHER.findOneAndReplace(filter, replace, {new: true, upsert: true});
    }
    getWeatherData = async (cityName, tempMetric) => {

        /**
         * Use get api for "By city" (https://openweathermap.org/current#q)
         * - The "us" query stands for "United States
         * - "process.env.WEATHER_KEY" is the api key that we get from the .env file
         * - "units" query can be either imperial (Fahrenheit) or metric (Celsius)
         */
        let url = `${baseUrl}?q=${cityName},&appid=${process.env.WEATHER_KEY}&units=${tempMetric}`;

        // Awaitable call to get the information from the weather api and then return the data.
        // TODO: Add error handling for this call
        return (await axios(url)).data;
    }
}

module.exports = Weather;