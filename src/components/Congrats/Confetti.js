import React, { Component } from "react";
import "./congrats.scss";

class Confetti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ]
    };
  }

  componentDidMount() {}

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
