import React, { Component, Fragment } from "react";

var SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
var SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
// var SpeechRecognitionEvent =
//   window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

var phrases = [
  "I love to sing because it's fun",
  "where are you going",
  "can I call you tomorrow",
  "why did you talk while I was talking",
  "she enjoys reading books and playing games",
  "where are you going",
  "have a great day",
  "she sells seashells on the seashore"
];

class Speech extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phrase: "hello",
      listening: false
    };
  }

  componentDidMount() {
    var selectedPhrase = Math.floor(Math.random() * phrases.length);
    this.setState({
      phrase: phrases[selectedPhrase]
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
      console.log(speechResult);
    };

    recognition.onspeechend = () => {
      recognition.stop();
      this.setState({ listening: false });
    };

    recognition.onerror = event => {
      console.log(`Error occured: ${event.error}`);
    };

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
        <h1 className="title">{this.state.phrase}</h1>
        <button
          className="button"
          onClick={event => this.testSpeech(event)}
          disabled={this.state.listening}
        >
          Listen
        </button>
      </Fragment>
    );
  }
}

export default Speech;
