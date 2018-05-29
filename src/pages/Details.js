import React from 'react';
import findLogo from '../services/logoService';

class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flightDetails: {},
            companyLogoUrl: '',
        }
    }

    componentDidMount() {

        let flightData = sessionStorage.getItem('flight');

        if (flightData) {
            let flightDataObject = JSON.parse(flightData);
            let company = flightDataObject.company;

            findLogo(company)
                .then(data => {
                    let logoImg = data;
                    this.setState({
                        flightDetails: flightDataObject,
                        companyLogoUrl: logoImg || 'http://via.placeholder.com/128x128',
                    })

                })
                .catch(() => {
                    this.setState({
                        flightDetails: flightDataObject,
                    })
                })
        } else {
            // redirectio to "/" if user manually entered url
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row" id="details-card">
                    <div className="col m6 offset-m3">
                        <div className="card horizontal">
                            <div className="card-image">
                                <img src={this.state.companyLogoUrl} alt="" />
                            </div>
                            <div className="card-content">
                                <p>Manufacturer: <span>{this.state.flightDetails.manufacturer}</span></p>
                                <p>Model: <span>{this.state.flightDetails.model}</span></p>
                                <p>Origin: <span>{this.state.flightDetails.origin}</span></p>
                                <p>Destination: <span>{this.state.flightDetails.destination}</span></p>
                                <p>Company: <span>{this.state.flightDetails.company}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Details;
