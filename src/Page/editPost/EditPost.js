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
import Modal from "antd/lib/modal/Modal";

const EditPost = () => {
  const token = localStorage.getItem("token");
  const { isExpired } = useJwt(token);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("<div></div>");
  const [show, setShow] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [post, setPost] = useState({
    id: null,
    title: null,
    description: null,
  });
  useEffect(() => {
    document.title = "Edit post";
  }, []);

  let { id } = useParams();

  const onDelete = () => {
    setShow(false);
    setIsLoading(true);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    axios({
      method: "DELETE",
      url: `http://localhost:8080/api/v1/author/deletepost?id=${id}`,
      headers: headers,
    })
      .then((response) => {
        setIsLoading(false);
        console.log(response);
        window.location.href = "/";
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    httpClientGet(`http://localhost:8080/api/v1/posts/view?id=${id}`)
      .get.then((response) => {
        setPost({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
        });
        setContent(response.data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
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
    <div>
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
              } else if (error.response.status === 500) {
                setUpdateError(true);
              } else if (error.response.status === 401) {
                window.location.href = "/login";
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
              />
              <div
                style={{
                  width: "188px",
                  marginLeft: "auto",
                  marginTop: "10px",
                }}
              >
                <Button
                  variant="outline-danger"
                  disabled={isSubmitting || isLoading}
                  onClick={() => setShow(true)}
                >
                  Delete Post
                </Button>{" "}
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                  Update
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      <Modal
        title="Caution"
        visible={show}
        onOk={onDelete}
        onCancel={() => setShow(false)}
        okText="Delete"
        okType="danger"
        bodyStyle={{ fontSize: "20px" }}
      >
        <p>Do you want to delete this post?</p>
      </Modal>
      <Modal
        title="Error"
        visible={updateError}
        onOk={() => setUpdateError(false)}
        onCancel={() => setUpdateError(false)}
        bodyStyle={{ fontSize: "20px" }}
      >
        <p>Content is too long</p>
      </Modal>
    </div>
  );
};
export default EditPost;
