import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Webcam from "react-webcam";
import { loadModels, getFullFaceDescription } from "../../api/face";
import styles from "./encourageMe.module.scss";

const WIDTH = 400;
const HEIGHT = 350;
const inputSize = 160;

class VideoInput extends Component {
  constructor(props) {
    super(props);
    this.webcam = React.createRef();
    this.state = {
      fullDesc: null,
      detections: null,
      descriptors: null,
      faceMatcher: null,
      match: null,
      facingMode: "user",
      expressions: [],
      message: null,
      currentExpression: null,
      averageExpressions: []
    };
  }

  componentWillMount = async () => {
    await loadModels();
    this.setState({ message: "Smile! You look beautiful when you do!" });
    this.setInputDevice();
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async devices => {
      // console.log(devices);
      let inputDevice = await devices.filter(
        device => device.kind === "videoinput"
      );
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: "user"
        });
      } else {
        await this.setState({
          facingMode: { exact: "environment" }
        });
      }
      this.startCapture();
    });
  };

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture();
    }, 500);
  };

  capture = async () => {
    if (!!this.webcam.current) {
      await getFullFaceDescription(
        this.webcam.current.getScreenshot(),
        inputSize
      ).then(fullDesc => {
        fullDesc !== "undefined" && fullDesc.length > 0
          ? this.setState(
              {
                detections: fullDesc.map(fd => fd.detection),
                descriptors: fullDesc.map(fd => fd.descriptor),
                currentExpression: fullDesc[0].expressions
              },
              this.getExpressions
            )
          : this.setState({
              message:
                "We cannot detect your face. Please make sure that your camera is working."
            });
      });
    }
  };

  getExpressions = () => {
    if (this.state.expressions !== "undefined") {
      this.setState(previousState => {
        let currentExpression;
        let expressions;
        let count = 0;

        if (previousState.currentExpression !== "undefined") {
          currentExpression = previousState.currentExpression;
        }

        if (previousState.expressions !== "undefined") {
          expressions = previousState.expressions;
        }

        for (count = 0; expressions.length < 50; count++) {
          expressions.push(currentExpression);
          count++;
        }

        return {
          expressions: expressions
        };
      });
    }
  };

  render() {
    const { detections, match, facingMode } = this.state;
    let videoConstraints = null;
    let camera;
    if (!!facingMode) {
      videoConstraints = {
        width: WIDTH,
        height: HEIGHT,
        facingMode: facingMode
      };
    }

    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: "absolute",
                border: "solid",
                borderColor: "#2a307c",
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`
              }}
            >
              {!!match && !!match[i] ? (
                <h3
                  style={{
                    backgroundColor: "blue",
                    border: "solid",
                    borderColor: "#2a307c",
                    width: _W,
                    marginTop: 0,
                    color: "#fff",
                    transform: `translate(-3px,${_H}px)`
                  }}
                  // className="has-text-centered is-size-4"
                >
                  {match[i]._label}
                </h3>
              ) : null}
            </div>
          </div>
        );
      });
    }

    return (
      <Fragment>
        <div className={styles.videoContainer}>
          <div
            style={{
              width: WIDTH,
              height: HEIGHT
            }}
          >
            <p className="help has-text-centered has-text-white">
              {this.state.message}
            </p>
            <div style={{ position: "relative", width: WIDTH }}>
              {!!videoConstraints ? (
                <div style={{ position: "absolute", padding: "15px" }}>
                  <Webcam
                    audio={false}
                    width={WIDTH}
                    height={HEIGHT}
                    ref={this.webcam}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                </div>
              ) : null}
              {!!drawBox ? drawBox : null}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(VideoInput);
