import { combineReducers } from 'redux'
import weather from './weather';
import cityName from './cityName';
import temperature from "./temperature";
import history from "./history";

export default combineReducers({
    cityName,
    weather,
    temperature,
    history
})