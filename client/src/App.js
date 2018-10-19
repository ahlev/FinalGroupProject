import React, { Component } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./Pages/HomePage";
// import Room from "./Pages/Room";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={HomePage} />
              {/* <Route exact path="/Room" component={Room} /> */}
            </Switch>

            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
