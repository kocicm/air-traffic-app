const getDirection = (angle) => {
    return angle < 180 ? 'east' : 'west';
}

class Flight {
    constructor(flightData) {
        this.altitude = flightData.Alt;
        this.flightNumber = flightData.Icao;
        this.manufacturer = flightData.Man;
        this.model = flightData.Type;
        this.destination = flightData.To || 'No information';
        this.origin = flightData.From || 'No information';
        this.heading = getDirection(flightData.Trak);
        this.company = flightData.Op;
    }
}

export default Flight;
