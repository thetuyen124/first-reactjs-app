import { Spin } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";

import React from "react";
import httpClientGet from "../../customHook/httpClientGet";
import { useJwt } from "react-jwt";
import Login from "../login/Login";
import JoditEditor from "jodit-react";

const EditPost = () => {
  const token = localStorage.getItem("token");
  const { isExpired } = useJwt(token);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("<div></div>");
  const [post, setPost] = useState({
    id: null,
    title: null,
    description: null,
  });
  let { id } = useParams();
  useEffect(() => {
    document.title = "Edit post";
  }, []);
  useEffect(() => {
    httpClientGet(`http://localhost:8080/api/v1/posts/view?id=${id}`).get.then(
      (response) => {
        setPost({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
        });
        setContent(response.data.content);
        setIsLoading(false);
      }
    );
  }, [id]);
  if (isExpired) {
    return <Login />;
  }
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
        description: post.description,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Required";
        }
        if (!values.description) {
          errors.description = "Required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        axios
          .post(
            `http://localhost:8080/api/v1/author/update?id=${id}`,
            {
              title: values.title,
              description: values.description,
              content: String(content),
            },
            {
              headers: headers,
            }
          )
          .then((response) => {
            setSubmitting(false);
            window.location.href = "/post/" + id;
          })
          .catch((error) => {
            setSubmitting(false);
            console.log(error.response.status);
            if (error.response.status === 403) {
              window.location.href = "/403";
            }
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
            <JoditEditor
              value={content}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              onChange={(newContent) => {}}
            />
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Update
            </Button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
export default EditPost;
