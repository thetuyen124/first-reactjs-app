import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Login from "./Login";

const PostDetail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({ id: null, title: null, body: null });
  let { id } = useParams();

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
  if (localStorage.getItem("token") === null) {
    return <Login message="You need to login to continue" />;
  }
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
      <div className="content">Body: {post.body}</div>
    </div>
  );
};
export default PostDetail;
