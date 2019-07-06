import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Confetti from "../Congrats/Confetti";
import FixedButton from "./FixedButton";
import kiss from "../../assets/kiss.png";

const Modal = () => {
  return (
    <Fragment>
      <div className="modal is-active p-5">
        <div className="modal-background app" />
        <section className="modal-content has-text-centered">
          <h1 className="title has-text-white">Hi Caye, welcome to Merawr!</h1>
          <div
            className="has-text-centered"
            style={{ justifyContent: "center" }}
          >
            <img src={kiss} alt="Good Job!" className="mb-2" />
            <p>
              We're glad you're here. Let's get started and give you the
              encouragement you need.
            </p>
          </div>
          <div style={{ justifyContent: "center" }}>
            <FixedButton>
              <Link to="/how-are-you" className="button is-primary is-large">
                Continue
              </Link>
            </FixedButton>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Modal;
