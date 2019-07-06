import React, { Fragment } from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Formik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import sadEmoji from "./../../assets/sad.png";
import FixedButton from "../UIKit/FixedButton";

const HowAreYou = () => {
  return (
    <Fragment>
      <div className="hero mt-5 pt-2 has-text-centered">
        <div className="level">
          <div className="level-item has-text-centered">
            <figure class="image is-128x128 is-inline-block">
              <img src={sadEmoji} alt="Feeling down today?" />
            </figure>
          </div>
        </div>
        <p>We all need a little motivation every now and then.</p>
        <h3 className="is-size-3">What's getting you down today?</h3>

        <Formik
          // initialValues={{ name: "jared" }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              <textarea
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.notes}
                name="notes"
                className="textarea my-2"
              />
              {props.errors.notes && (
                <div id="feedback">{props.errors.notes}</div>
              )}
              <FixedButton>
                <div className="columns">
                  <div className="column p-1">
                    <Link
                      className="button is-primary is-large is-fullwidth mt-2"
                      to="/encourage-me"
                    >
                      I need a pep talk
                      <span className="icon is-large ml-1">
                        <FontAwesomeIcon icon={faCamera} className="fas" />
                      </span>
                    </Link>
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
            </form>
          )}
        />
      </div>
    </Fragment>
  );
};

// const mapDispatchToProps = dispatch => ({
//   notes: () => dispatch(addNotes())
// });

// export default connect(
//   null,
//   mapDispatchToProps
// )(HowAreYou);

export default HowAreYou;
