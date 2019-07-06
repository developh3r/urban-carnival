import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";

import "./styles/global.scss";
import Index from "./pages/Index";
import VideoInput from "./views/VideoInput";
import Speech from "./components/SpeechRecognition/Speech";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div className="route">
          <Route exact path="/" component={Index} />
          <Route exact path="/speech" component={Speech} />
          <Route exact path="/camera" component={VideoInput} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
