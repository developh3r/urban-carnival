import React, { Fragment, Component } from "react";
// import Recorder from "./components/SpeechRecognition/Recorder";
import Speech from "./components/SpeechRecognition/Speech";
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./styles/global.scss";
import Login from "./components/Login/Login";
import Welcome from "./components/Login/Welcome";
import Camera from "./components/Camera/Camera";
import Congrats from "./components/Camera/Congrats";
import Home from "./components/Home/Home";
import HowAreYou from "./components/HowAreYou/HowAreYou";
import Layout from "./components/Layout";

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
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/encourage-me" component={Camera} />
            <Route path="/congrats" component={Congrats} />
            <Route path="/how-are-you" component={HowAreYou} />
          </Switch>
        </Router>
      </Layout>
    );
  }
}

export default App;
