import React, { Component } from "react";
import "./congrats.scss";

class Confetti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: []
    };
  }

  fillArray = () => {
    let array = [];
    for (var i = 0; i < 500; i++) {
      array.push(i);
    }

    this.setState({ numbers: array });
  };

  componentDidMount() {
    this.fillArray();
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.numbers.map((number, index) => (
          <div className={`confetti-${number}`} key={index} />
        ))}
      </div>
    );
  }
}

export default Confetti;
