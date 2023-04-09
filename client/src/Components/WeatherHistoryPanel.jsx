import React, {Component} from "react";
import {Card, ListGroup} from "react-bootstrap";
import {connect} from "react-redux";

class WeatherHistoryPanel extends Component {
    state = {
        history: [
            {
                "_id": 1,
                "timestamp": "7/27/2020, 11:10:33 PM",
                "city": "Fort Worth",
                "name": "Forth Worth",
                "temperature": 82.13,
                "description": "clear sky"
            },
            {
                "_id": 2,
                "timestamp": "7/27/2020, 11:10:36 PM",
                "city": "Redmond",
                "name": "Redmond",
                "temperature": 73.67,
                "description": "clear sky"
            }
        ]
    }

    createHistoryList = () => {
        let historyComponents = [];
        let historyList = this.props.history;

        // Listing history of city submissions in "most recent" order
        for (let i = historyList.length - 1; i >= 0; i--) {
            let infoCard = this.getInfoListItem(historyList[i]);
            historyComponents.push(infoCard);
        }
    

        return (
            <Card>
                <ListGroup variant="flush">
                    {historyComponents}
                </ListGroup>
            </Card>
        );
    }

    getInfoListItem = (info) => {
        return (
            <ListGroup.Item key={info.timestamp}><b>{info.timestamp}</b> -
                [{info.city}, {info.city}]:[{info.temperature}, {info.description}]</ListGroup.Item>
        );
    }
    render() {
        return (
            <section className="weather-history-panel">
                {!!this.props.history.length ? this.createHistoryList() : "No History!"}
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        history: state.history
    }
};

export default connect(mapStateToProps)(WeatherHistoryPanel);


export {WeatherHistoryPanel};