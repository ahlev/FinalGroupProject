import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import Room from "./Pages/Room";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";
import Callback from "./Pages/Callback";

// // Still need to import API (?)

class App extends Component {
  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar />
            <Switch>
            <Route exact path="/callback" component={Callback} />
              <Route exact path="/" component={HomePage} />
              <Route exact path="/Room" component={Room} />
              <Route component={PageNotFound} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
