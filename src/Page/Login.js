import axios from "axios";

import { Formik } from "formik";
import { useEffect } from "react";
import React from "react";
import { Form, Button } from "react-bootstrap";

const Login = (props) => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <div className="mainContent container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length <= 7) {
            errors.password = "Almost 8 character";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .get("https://60dff0ba6b689e001788c858.mockapi.io/token")
            .then((response) => {
              localStorage.clear();
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userId", response.data.userId);
              setSubmitting(false);
              window.location.href = "/";
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form className="sign-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                isInvalid={errors.email && touched.email}
                name="email"
                placeholder="Enter email"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                isInvalid={errors.password && touched.password}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Password"
                required
                value={values.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default Login;
