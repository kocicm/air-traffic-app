import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import FlightList from './pages/FlightList';
import Details from './pages/Details';

class App extends Component {

  render() {

    return (
      <React.Fragment>
        <div className="main-container">
          <Switch>
            <Route exact path="/" component={FlightList} />
            <Route exact path="/details" component={Details} />
            <Redirect from="/" to="/" />
          </Switch>
          <div id="push"></div>
        </div>
      </React.Fragment>
    )
  }
}

export default App;
