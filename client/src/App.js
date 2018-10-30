import React, { Component } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import HomePage from "./Pages/HomePage";
import Room from "./Pages/Room";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound";

// // Still need to import API (?)

class App extends Component {
  state = {
    open: false,
    sessionName: ''
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onInputChange = (event) => {
    // this.preventDefault();
    this.setState({sessionName: event.target.value});
    // console.log(this.state.sessionName)
  }
  
  

  // handleInputChange = (event) => {
  //   // Using object destructuring to create two variables (off of our event), then set the state dynamically based on those values
  //   const {name, value} = event.target;
  //   this.setState({[name]:value});
  // };


  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar />
            <Switch>
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
