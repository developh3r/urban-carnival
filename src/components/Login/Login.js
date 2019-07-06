import React, { Fragment } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const Login = () => {
  return (
    <Fragment>
      <div className="has-background-primary">Hello</div>

      <div className="columns is-mobile pt-5 mt-5">
        <div className="column">Welcome to merawr!</div>
        <div className="column">Image here</div>
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
                <div className="field mt-2">
                  <label className="label">Name</label>
                  <div className="control">
                    <Field className="input" name="name" />
                  </div>
                </div>
                <ErrorMessage name="email" component="div" />
                <div className="field mt-2">
                  <label className="label">Email</label>
                  <div className="control">
                    <Field className="input" name="email" />
                  </div>
                </div>
                <ErrorMessage name="email">
                  {errorMessage => <div className="error">{errorMessage}</div>}
                </ErrorMessage>
                <div className="field mt-2">
                  <label className="label">Password</label>
                  <div className="control">
                    <Field className="input" name="password" />
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
                  className="button is-primary mt-4"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
