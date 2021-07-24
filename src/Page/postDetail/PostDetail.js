import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import httpClientGet from "../../customHook/httpClientGet";

const PostDetail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({ id: null, title: "Post", body: null });
  let { id } = useParams();

  useEffect(() => {
    httpClientGet(`http://localhost:8080/api/v1/posts/view/?id=${id}`).get.then(
      (response) => {
        setPost({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          content: response.data.content,
        });
        setIsLoading(false);
      }
    );
  }, [id]);

  useEffect(() => {
    document.title = post.title;
  }, [post.title]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className="mainContent">
      <div>Id: {post.id}</div>
      <div className="title">Title: {post.title}</div>
      <div className="description">Description: {post.description}</div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};
export default PostDetail;
