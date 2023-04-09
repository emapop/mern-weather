import React, {Component} from "react";
import {Form, Button, Row, Col, ButtonGroup, ToggleButton} from "react-bootstrap";
import {connect} from "react-redux";
import {saveCityName, saveWeatherData, saveTemperature, updateHistory} from "../actions";

import axios from 'axios';

class WeatherForm extends Component {
    // default state values
    state = {
        tempMetric: "metric",
        cityNameInput: "London"
    }

    componentDidMount() {
        this.refreshSavedWeather();
    }

    // Refreshes the current weather data for the most recent city code, if it exists
    refreshSavedWeather = () => {
        if (localStorage.getItem("cityName")) {
            axios.post("/api/weather", {
                cityName: localStorage.getItem("cityName"),
                tempMetric: localStorage.getItem("tempMetric")
            }).then(d => {
                this.props.saveWeatherData(d.data);
               // localStorage.setItem("CurrentWeatherData", JSON.stringify(d.data));
            });
        }
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    saveFormData = (event) => {
        event.preventDefault();

        // Gets the weather data from the weather api and returns it to save into local storage and redux store.
        axios.post("/api/weather", {
            cityName: this.state.cityNameInput,
            tempMetric: this.state.tempMetric
        }).then(response => {
            let weatherData = response.data;

            this.saveToStore(weatherData);
            this.saveToLocalStorage(weatherData);
        });
    }

    // Save data from form to local storage
    saveToLocalStorage = (weatherData) => {
        localStorage.setItem("cityName", this.state.cityNameInput);
        localStorage.setItem("tempMetric", this.state.tempMetric);
        localStorage.setItem("CurrentWeatherData", JSON.stringify(weatherData));
        localStorage.setItem("WeatherHistory", JSON.stringify(this.props.history));
    }

    saveToMongo = (event) => {
        axios.post("/api/weatherMongo", {
            cityName: this.state.cityNameInput,
            tempMetric: this.state.tempMetric
        }).then(response => {
            let weatherData = response.data;
        });
    }
    // Saves data to the Redux store
    saveToStore = (weatherData) => {
        this.props.saveTemperature(this.state.tempMetric);
        this.props.saveCityName(this.state.cityNameInput);
        this.props.saveWeatherData(weatherData);

        this.props.updateHistory({
            timestamp: (new Date()).toLocaleString(),
            city: weatherData.name,
            cityName: this.state.cityNameInput,
            temperature: weatherData.main.temp,
            description: weatherData.weather[0].description
        });
    }

    render() {
        return (
            <Form className="weather-form" onSubmit={this.saveFormData}>

                <Row type="flex" justify="center" align="center" className="city">
                    <Col>
                        <span>City Name: </span>
                        <Form.Control name="cityNameInput"
                                      type="text"
                                      placeholder="Enter your city"
                                      onChange={this.onChange}
                                      className="cityInput"/>
                    </Col>
                </Row>

                <Row type="flex" justify="center" align="center">
                    <Col span={4}>
                        <ButtonGroup toggle="true">
                            <ToggleButton
                                key={"C"}
                                type="radio"
                                variant="secondary"
                                name="tempMetric"
                                value={"metric"}
                                checked={this.state.tempMetric === "metric"}
                                onChange={this.onChange}
                            >
                                Celsius (°C)
                            </ToggleButton>
                            <ToggleButton
                                key={"F"}
                                type="radio"
                                variant="secondary"
                                name="tempMetric"
                                value={"imperial"}
                                checked={this.state.tempMetric === "imperial"}
                                onChange={this.onChange}
                            >
                                Fahrenheit (°F)
                            </ToggleButton>
                        </ButtonGroup>
                    </Col>
                </Row>

                <Row type="flex" justify="center" align="center">
                    <Col span={4}>
                        <Button className="save-btn" variant="primary" type="submit">
                            Save
                        </Button>
                    </Col>
                </Row>

            </Form>
        );
    }
}
// Mapping state from the store to props;
// meaning...if we update these props, it'll update the redux store
const mapStateToProps = (state) => {
    return {
        cityName: state.cityName,
        weather: state.weather,
        tempMetric: state.tempMetric,
        history: state.history
    }
};

// These are the actions we can dispatch and just mapping it to props
const mapDispatchToProps = () => {
    return {
        saveCityName,
        saveWeatherData,
        saveTemperature,
        updateHistory
    }
};

// This connects our mapping the state & dispatch to props to use in WeatherForm
export default connect(mapStateToProps, mapDispatchToProps())(WeatherForm);

export{WeatherForm};