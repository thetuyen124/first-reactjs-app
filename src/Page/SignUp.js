import { useEffect } from "react";

import React from "react";
import { Formik } from "formik";
import { Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
const SignUp = () => {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const radios = [{ value: "Male" }, { value: "Female" }, { value: "Other" }];

  return (
    <div className="mainContent container">
      <Formik
        initialValues={{
          email: "",
          password: "",
          passwordRT: "",
          username: "",
          gender: "Male",
          checked: false,
        }}
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

          if (!values.username) {
            errors.username = "Required";
          } else if (values.username.length <= 3) {
            errors.username = "Almost 4 character";
          } else if (!/^[0-9a-zA-Z_.]+$/.test(values.username)) {
            errors.username = "Invalid email username";
          }

          if (values.password !== values.passwordRT) {
            errors.passwordRT = "Password not match";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            setTimeout(() => {
              window.location.href = "/login";
            }, 200);
          }, 400);
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
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                isInvalid={errors.username && touched.username}
                name="username"
                placeholder="Enter username"
                required
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
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
            <ButtonGroup className="mb-2">
              {radios.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant="secondary"
                  name="gender"
                  value={radio.value}
                  checked={values.gender === radio.value}
                  onChange={handleChange}
                >
                  {radio.value}
                </ToggleButton>
              ))}
            </ButtonGroup>

            <Form.Group className="mb-3">
              <Form.Label>Enter Password</Form.Label>
              <Form.Control
                type="password"
                isInvalid={errors.password && touched.password}
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Password"
                required
                value={values.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                type="password"
                isInvalid={errors.passwordRT && touched.passwordRT}
                name="passwordRT"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Retype Password"
                required
                value={values.passwordRT}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordRT}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Check
                checked={values.checked}
                feedback="You must agree before submitting."
                label="Agree to terms and conditions"
                name="checked"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={
                !values.checked ||
                errors.email ||
                errors.username ||
                errors.passwordRT ||
                errors.password ||
                isSubmitting
              }
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default SignUp;
