export const saveCityName = (cityName) => {
    return {
        type: "SAVE_CITY",
        payload: cityName
    }
}

export const saveWeatherData = (data) => {
    return {
        type: "SAVE_WEATHER_DATA",
        payload: data
    }
}

export const saveTemperature = (data) => {
    return {
        type: "SAVE_TEMPERATURE",
        payload: data
    }
}

export const updateHistory = (data) => {
    return {
        type: "UPDATE_HISTORY",
        payload: data
    }
}