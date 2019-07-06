import React, { Fragment, useState, useEffect } from "react";
import { Transition } from "react-transition-group";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import styles from "./login.module.scss";
import classNames from "classnames";
import image from "./../../assets/mirror.png";

const Login = () => {
  const [isNewAccount, setIsNewAccount] = useState(true);

  return (
    <Transition>
      <Fragment>
        {/* <div className="logo pt-5">H</div> */}
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
                // MyImaginaryRestApiCall(user.id, values).then(
                //   updatedUser => {
                //     actions.setSubmitting(false);
                //     updateUser(updatedUser);
                //     onClose();
                //   },
                //   error => {
                //     actions.setSubmitting(false);
                //     actions.setErrors(transformMyRestApiErrorsToAnObject(error));
                //     actions.setStatus({
                //       msg: "Set some arbitrary status or data"
                //     });
                //   }
                // );
                console.log("You clicked submit. Here are the values:");
                console.log(values);
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
                  {!!isNewAccount && (
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
                    {!!isNewAccount ? "SIGN UP" : "LOG IN"}
                  </button>
                </Form>
              )}
            />
            <p className="mt-1 has-text-centered">
              {!!isNewAccount ? (
                <Fragment>
                  Already have an account?{" "}
                  <Link onClick={() => setIsNewAccount(false)}>Log in</Link>
                </Fragment>
              ) : (
                <Fragment>
                  Don't have an account?{" "}
                  <Link onClick={() => setIsNewAccount(true)}>Sign up</Link>
                </Fragment>
              )}
            </p>
          </div>
        </div>
      </Fragment>
    </Transition>
  );
};

export default Login;
