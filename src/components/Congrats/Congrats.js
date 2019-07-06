import React from "react";
import { Link } from "react-router-dom";
import Confetti from "./Confetti";

import kiss from "../../assets/kiss.png";
import FixedButton from "../UIKit/FixedButton";

const Congrats = () => {
  return (
    <div>
      <Confetti />
      <div className="hero has-text-centered is-large is-fullheight">
        <div className="hero-body">
          <h1 className="title has-text-white">You're ready, you can do it!</h1>
        </div>
        <div
          className="hero-body has-text-centered"
          style={{ justifyContent: "center" }}
        >
          <img src={kiss} alt="Good Job!" />
        </div>
        <div className="hero-body" style={{ justifyContent: "center" }}>
          <FixedButton>
            <Link to="/home" className="button is-primary is-large">
              View logs
            </Link>
          </FixedButton>
        </div>
      </div>
    </div>
  );
};

export default Congrats;
