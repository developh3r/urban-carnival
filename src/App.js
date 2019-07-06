import React, { Component } from "react";
// import Recorder from "./components/SpeechRecognition/Recorder";
// import Speech from "./components/SpeechRecognition/Speech";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import Login from "./components/Login/Login";
import Welcome from "./components/Login/Welcome";
import Congrats from "./components/Congrats/Congrats";
import Home from "./components/Home/Home";
import HowAreYou from "./components/HowAreYou/HowAreYou";
import Layout from "./components/Layout";
import EncourageMe from "./components/EncourageMe/EncourageMe";

import "./styles/global.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <Router>
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/encourage-me" component={EncourageMe} />
            <Route path="/congrats" component={Congrats} />
            <Route path="/how-are-you" component={HowAreYou} />
            <Redirect to="/login" />
          </Switch>
        </Router>
      </Layout>
    );
  }
}

export default App;
