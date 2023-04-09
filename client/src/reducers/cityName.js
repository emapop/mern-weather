// Default city will be Berlin
const cityName = (state = "Berlin", action) => {
    switch (action.type) {
        case "SAVE_CITY":
            return action.payload
        default:
            return state;
    }
};

export default cityName;