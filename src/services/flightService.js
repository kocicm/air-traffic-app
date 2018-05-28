import Flight from "../entities/flights";
import fetchJsonp from 'fetch-jsonp';


const getFlights = (url) => {

    return fetchJsonp(url)
        .then(data => {
            return data.json();
        })
        .then(data => {
            return data.acList.map(el => {
                return new Flight(el);
            })
        })
}

export default getFlights;
