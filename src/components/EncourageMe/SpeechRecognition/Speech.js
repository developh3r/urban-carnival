import React, { Component, Fragment } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

import styles from "../encourageMe.module.scss";
var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
// var SpeechRecognitionEvent =
//   window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

class Speech extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: "",
      voiceInput: "",
      listening: false
    };
  }

  componentDidMount() {
    this.setState({
      phrase: this.props.phrase.toLowerCase().slice(0, -1)
    });
  }

  testSpeech = event => {
    this.setState(previousState => {
      return { listening: !previousState.listening };
    }, this.checkSpeech(event));
  };

  checkSpeech = () => {
    var grammar =
      "#JSGF V1.0; grammar phrase; public <phrase> = " +
      this.state.phrase +
      ";";
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();
    recognition.onresult = event => {
      var speechResult = event.results[0][0].transcript.toLowerCase();
      this.setState(
        {
          voiceInput: speechResult
        },
        () => {
          if (this.state.voiceInput === this.state.phrase) {
            return this.setState({
              message: "ang galing ko"
            });
          } else {
            this.setState({
              message: "Repeat again"
            });
          }
        }
      );
    };

    recognition.onspeechend = () => {
      recognition.stop();
      this.setState({ listening: false });
    };

    // recognition.onerror = event => {
    //   this.setState({
    //     result: `We can't recognize your voice, please try again.`,
    //     listening: false
    //   });
    // };

    recognition.onaudiostart = event => {
      //Fired when the user agent has started to capture audio.
      //   console.log("SpeechRecognition.onaudiostart");
    };

    recognition.onaudioend = event => {
      //Fired when the user agent has finished capturing audio.
      //   console.log("SpeechRecognition.onaudioend");
    };

    recognition.onend = event => {
      //Fired when the speech recognition service has disconnected.
      //   console.log("SpeechRecognition.onend");
    };

    recognition.onnomatch = event => {
      //Fired when the speech recognition service returns a final result with no significant recognition. This may involve some degree of recognition, which doesn't meet or exceed the confidence threshold.
      //   console.log("SpeechRecognition.onnomatch");
    };

    recognition.onsoundstart = event => {
      //Fired when any sound — recognisable speech or not — has been detected.
      //   console.log("SpeechRecognition.onsoundstart");
    };

    recognition.onsoundend = event => {
      //Fired when any sound — recognisable speech or not — has stopped being detected.
      //   console.log("SpeechRecognition.onsoundend");
    };

    recognition.onspeechstart = event => {
      //Fired when sound that is recognised by the speech recognition service as speech has been detected.
      //   console.log("SpeechRecognition.onspeechstart");
    };
    recognition.onstart = event => {
      //Fired when the speech recognition service has begun listening to incoming audio with intent to recognize grammars associated with the current SpeechRecognition.
      //   console.log("SpeechRecognition.onstart");
    };
  };

  render() {
    return (
      <Fragment>
        <h1 className="subtitle has-text-white">{this.state.voiceInput}</h1>
        {/* <h1 className="subtitle has-text-white">{this.state.message}</h1> */}
        <button
          className={classNames(
            "button is-primary is-large",
            styles.recordButton
          )}
          onClick={event => this.testSpeech(event)}
          disabled={this.state.listening}
        >
          <FontAwesomeIcon icon={faMicrophone} size="lg" />
        </button>
      </Fragment>
    );
  }
}

export default Speech;
