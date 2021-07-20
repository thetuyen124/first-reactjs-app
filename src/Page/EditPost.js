import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";

import axios from "axios";
import React from "react";

const EditPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({ id: null, title: null, body: null });
  let { id } = useParams();
  useEffect(() => {
    document.title = "Edit post";
  }, []);
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => {
        setPost({
          id: response.data.id,
          title: response.data.title,
          body: response.data.body,
        });
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <Spin />
      </div>
    );
  }
  return (
    <Formik
      initialValues={{
        id: post.id,
        title: post.title,
        description: "",
        content: post.body,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Required";
        }

        if (!values.content) {
          errors.content = "Required";
        }
        if (!values.description) {
          errors.description = "Required";
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          setTimeout(() => {
            window.location.href = "/post/" + id;
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
        <div className="mainContent">
          <h2>id: {values.id}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.title && errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.description && errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                as="textarea"
                name="content"
                value={values.content}
                rows={10}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.content && errors.content}
              />
              <Form.Control.Feedback type="invalid">
                {errors.content}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default EditPost;
