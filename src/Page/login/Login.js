import { Formik } from "formik";
import { useEffect, useState } from "react";
import React from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { Alert } from "antd";

const Login = (props) => {
  const [submitError, setSubmitError] = useState("");
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
          }
          if (!values.password) {
            errors.password = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          axios({
            method: "POST",
            url: "http://localhost:8080/authenticate",
            headers: {},
            data: {
              username: values.email,
              password: values.password,
            },
          })
            .then((response) => {
              setSubmitting(false);
              console.log(response);
              localStorage.clear();
              localStorage.setItem("token", response.data.jwttoken);
              window.location.href = "/";
            })
            .catch((error) => {
              setSubmitting(false);
              console.log(error);
              setSubmitError(
                "Login fails status code: " + error.response.status
              );
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
                type="text"
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
            {submitError && (
              <Alert
                closable
                style={{ marginBottom: 15 }}
                message={submitError}
                type="error"
                showIcon
              />
            )}

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
