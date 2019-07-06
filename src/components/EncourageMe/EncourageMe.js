import React, { Fragment, Component } from "react";
import axios from "axios";

import VideoInput from "../EncourageMe/VideoInput";

import Speech from "./SpeechRecognition/Speech";

class EncourageMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: ""
    };
  }

  componentDidMount() {
    axios({
      method: `get`,
      url: `https://mirrorbackend.milkylorejo.com/random_select.php`,
      config: { headers: { "Content-Type": "application/json" } }
    }).then(response => this.setState({ phrase: response.data.phrase }));
  }

  render() {
    return (
      <Fragment>
        <h1 className="subtitle has-text-white has-text-centered">
          Hi Name, let's do this!
        </h1>
        <VideoInput />

        <p className="has-text-white">Look yourself in the eye and say,</p>
        <h1 className="subtitle has-text-white has-text-weigh-bold">
          {this.state.phrase}
        </h1>
        <div className="has-text-centered">
          <Speech phrase={this.state.phrase} />
        </div>
      </Fragment>
    );
  }
}

export default EncourageMe;
