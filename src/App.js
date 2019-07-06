import React, { Component } from "react";
// import Recorder from "./components/SpeechRecognition/Recorder";
import Speech from "./components/SpeechRecognition/Speech";

import "./styles/global.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="hero is-primary has-text-centered">
        <div className="hero-body">
          <h3 className="title">Speech-to-text</h3>
          {/* <Recorder /> */}
          <Speech />
        </div>
      </section>
    );
  }
}

export default App;
