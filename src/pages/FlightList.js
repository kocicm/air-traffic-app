import React from 'react';
import getFlights from '../services/flightService';

class FlightList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flights: [],
            refreshId: '',
            connectionError: false
        }
    }


    componentDidMount() {

        navigator.geolocation.getCurrentPosition(position => {

            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            const url = `http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${long}&fDstL=0&fDstU=100`;
            this.collectFlightData(url);
        }, (error) => {
            if (error.message.includes('denied')) {
                this.setState({
                    geolocationError: true
                })
            } else {
                this.setState({
                    connectionError: true
                })
            }
        })

    }

    collectFlightData = (url) => {

        getFlights(url)
            .then(data => {
                this.setState({
                    flights: data.sort(function (a, b) { return b.altitude - a.altitude }),
                    refreshId: setTimeout(() => this.collectFlightData(url), 60000),
                    loading: false
                })
            })
            .catch(() => {
                this.setState({
                    connectionError: true
                })
            })

    }


    handleClick = (event) => {
        let flightData = event.currentTarget.getAttribute('data');
        sessionStorage.setItem('flight', flightData);
        this.props.history.push("/details");
    }

    componentWillUnmount() {
        clearTimeout(this.state.refreshId);
    }

    render() {

        return (
            <React.Fragment>
                {!this.state.connectionError
                    ? this.state.flights.length
                        ? <table className="container centered">
                            <thead>
                                <tr>
                                    <th>Direction</th>
                                    <th>Altitude (ft)</th>
                                    <th>Flight number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.flights.map((el, index) => {
                                    return <tr key={index} data={JSON.stringify(el)} onClick={this.handleClick}>
                                        <td>{el.altitude}</td>
                                        <td>{el.flightNumber}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                        : <h2 className="error">There is no fligts at your location at the moment!</h2>
                    : <h2 className="error">Connection error!</h2>}
            </React.Fragment>
        )
    }
}

export default FlightList;
