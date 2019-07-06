import React, { Fragment, Component } from "react";
import axios from "axios";
// import { Transition } from "react-transition-group";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./login.module.scss";
import classNames from "classnames";
import image from "./../../assets/mirror.png";
import Modal from "../UIKit/Modal";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewAccount: true,
      isActiveModal: false,
      isLoggedIn: false
    };
  }

  // handleSubmit = ({ values }) => {
  //   console.log("You tried posting!");
  //   console.log(values);
  //   return axios({
  //     method: `post`,
  //     url: `https://mirrorbackend.milkylorejo.com/save_signup.php`,
  //     config: { headers: { "Content-Type": "application/json" } },
  //     data: {
  //       values
  //     }
  //   })
  //     .then(response => console.log("Success!", response))
  //     .catch(error => console.log("Yikes, here's your error: ", error));
  // };

  render() {
    return (
      <Fragment>
        {/* <div className="logo pt-5">H</div> */}
        {!!this.state.isLoggedIn && <Modal />}
        <div className="columns is-mobile pt-5 mt-5">
          <div className="column">
            <p>WELCOME TO</p>
            <h1 className="is-size-1 has-text-weight-bold">MERAWR</h1>
          </div>
          <div className="column is-one-quarter-tablet">
            <img src={image} alt="Merawr logo" className="mt-2" />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <Formik
              // initialValues={user /** { email, social } */}
              onSubmit={(values, actions) => {
                const data = {
                  name: values.name,
                  email: values.email,
                  password: values.password
                };
                console.log("You clicked submit. Here's the data: ", data);
                // axios
                // .post(
                //   "https://mirrorbackend.milkylorejo.com/save_signup.php",
                //   {
                //     data
                //   },
                //   {
                //     headers: {
                //       "Content-Type": "application/json"
                //     },
                //     mode: "no-cors"
                //   }
                // )
                axios({
                  method: "post",
                  url: "https://mirrorbackend.milkylorejo.com/save_signup.php",
                  data,
                  headers: {
                    "Content-Type":
                      "application/x-www-form-urlencoded; charset=UTF-8"
                  }
                  // data: {
                  //   name: values.name,
                  //   email: values.email,
                  //   password: values.password
                  // }
                }).then(
                  response => {
                    console.log(
                      "Congrats! Here's the response data: ",
                      response
                    );
                    actions.setSubmitting(false);
                  },
                  updatedUser => {
                    actions.setSubmitting(false);
                    // updateUser(updatedUser);
                    // onClose();
                  },
                  error => {
                    actions.setSubmitting(false);
                    // actions.setStatus({
                    //   msg: "Set some arbitrary status or data"
                    // });
                    console.log(error);
                  },
                  this.setState({ isLoggedIn: true })
                );
                // .error(error =>
                //   console.log("Yikes, we got an error: ", error)
                // );
                // setIsNewAccount(true);
              }}
              render={({
                values,
                errors,
                status,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting
              }) => (
                <Form>
                  {!!this.state.isNewAccount && (
                    <div className="field mt-2">
                      <label className={classNames("label", styles.label)}>
                        Name
                      </label>
                      <div className="control">
                        <Field
                          className={classNames("input", styles.input)}
                          name="name"
                        />
                      </div>
                    </div>
                  )}
                  <ErrorMessage name="email" component="div" />
                  <div className="field mt-2">
                    <label className={classNames("label", styles.label)}>
                      Email
                    </label>
                    <div className="control">
                      <Field
                        className={classNames("input", styles.input)}
                        name="email"
                      />
                    </div>
                  </div>
                  <ErrorMessage name="email">
                    {errorMessage => (
                      <div className="error">{errorMessage}</div>
                    )}
                  </ErrorMessage>
                  <div className="field mt-2">
                    <label className={classNames("label", styles.label)}>
                      Password
                    </label>
                    <div className="control">
                      <Field
                        className={classNames("input", styles.input)}
                        name="password"
                        type="password"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    className="error"
                    component="div"
                  />
                  {status && status.msg && <div>{status.msg}</div>}
                  <button
                    type="submit"
                    className="button is-primary mt-4 is-fullwidth is-large"
                    disabled={isSubmitting}
                  >
                    {!!this.state.isNewAccount ? "SIGN UP" : "LOG IN"}
                  </button>
                </Form>
              )}
            />
            <p className="mt-1 has-text-centered">
              {!!this.state.isNewAccount ? (
                <Fragment>
                  Already have an account?{" "}
                  <Link onClick={() => this.setState({ isNewAccount: false })}>
                    Log in
                  </Link>
                </Fragment>
              ) : (
                <Fragment>
                  Don't have an account?{" "}
                  <Link onClick={() => this.setState({ isNewAccount: true })}>
                    Sign up
                  </Link>
                </Fragment>
              )}
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
