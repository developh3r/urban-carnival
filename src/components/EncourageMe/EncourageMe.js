import React, { Fragment, Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { Container, Link as Button } from "react-floating-action-button";
import { Redirect } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

import VideoInput from "../EncourageMe/VideoInput";
// import Speech from "./SpeechRecognition/Speech";

import styles from "./encourageMe.module.scss";
import FixedButton from "../UIKit/FixedButton";

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
// var SpeechRecognitionEvent =
//   window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

class EncourageMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: "",
      voiceInput: "",
      listening: false,
      listenCount: 0,
      redirect: false
    };
  }

  componentDidMount() {
    axios({
      method: `get`,
      url: `https://mirrorbackend.milkylorejo.com/random_select.php`,
      config: { headers: { "Content-Type": "application/json" } }
    }).then(response =>
      this.setState({
        phrase: response.data.phrase,
        purePhrase: response.data.phrase.toLowerCase().slice(0, -1)
      })
    );
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
          if (this.state.voiceInput === this.state.purePhrase) {
            console.log(this.state.listenCount);
            return this.setState(previousState => {
              if (previousState.listenCount < 2) {
                switch (previousState.listenCount) {
                  case 0:
                    return {
                      listenCount: previousState.listenCount + 1,
                      message: "That's the spirit. Say it again!"
                    };
                  case 1:
                    return {
                      listenCount: previousState.listenCount + 1,
                      message: "Feel it more, say it one last time!"
                    };
                  default:
                    return {
                      listenCount: previousState.listenCount + 1,
                      message: "Repetition is key. Let's say it again!"
                    };
                }
              } else {
                this.props.history.push(`/congrats`);
              }
            });
          } else {
            this.setState({
              message: "We didn't hear it loud enough, try again."
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

  // renderRedirect = () => {
  //   if (this.state.redirect) {
  //     return <Redirect to="/congrats" />;
  //   }
  // };

  render() {
    return (
      <Fragment>
        <h1 className="is-size-4 has-text-centered">Hi Caye, let's do this!</h1>
        <VideoInput />

        <p className="has-text-centered has-text-white mt-3">
          Look yourself in the eye and say this out loud:
        </p>
        <h1 className="is-size-3 has-text-white has-text-weight-bold has-text-centered">
          {this.state.phrase}
        </h1>
        <div className="has-text-centered">
          <h1 className="help has-text-white">{this.state.message}</h1>
        </div>

        <FixedButton>
          <div className="columns">
            <div className="column p-1">
              <button
                className={classNames("button is-primary is-large", {
                  "is-active is-focused is-loading": this.state.listening
                })}
                onClick={event => this.testSpeech(event)}

                // disabled={this.state.listening}
                // className={classNames("", {styles.recordButton: !!this.state.listening})}
              >
                Tap to speak
                <FontAwesomeIcon
                  icon={faMicrophone}
                  size="lg"
                  className="ml-3"
                />
              </button>
            </div>
            <div className="column p-1">
              <Link to="/home">
                <button className="button is-info is-danger is-fullwidth">
                  Go back
                </button>
              </Link>
            </div>
          </div>
        </FixedButton>
      </Fragment>
    );
  }
}

export default EncourageMe;
