import axios from "axios";
import { useEffect, useState } from "react";
import { Spin, Empty } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

import SearchInput from "../components/searchInput/SearchInput";
import Login from "./Login";

import "antd/dist/antd.css";

const Post = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listPost, setListPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    document.title = "Post";
  }, []);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        setIsLoading(false);
        setListPost(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handlePageChange = (page, pageS) => {
    setCurrentPage(parseInt(page));
    setPageSize(pageS);
    console.log(page, pageS);
  };

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
  if (listPost.length === 0) {
    return (
      <div className="mainContent">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Empty />
      </div>
    );
  }
  return (
    <div className="mainContent">
      <div className="list-posts">
        {listPost
          .slice(pageSize * (currentPage - 1), pageSize * currentPage)
          .map((post) => {
            return (
              <div className="post" key={post.id}>
                <Link className="title" to={{ pathname: `/post/${post.id}` }}>
                  {post.title}
                </Link>
                <span className="description">{post.description}</span>
                <span className="author">
                  Posted by {post.userId} on May 20 2019 - 8 mins read
                </span>
                <div className="edit-post">
                  <Link to={{ pathname: `/post/edit/${post.id}` }}>
                    Edit post ...
                  </Link>
                </div>
                <hr />
              </div>
            );
          })}
      </div>
      <Pagination
        hideOnSinglePage
        style={{ margin: "auto", width: "70%" }}
        defaultCurrent={currentPage}
        onChange={handlePageChange}
        total={100}
      />
    </div>
  );
};
export default Post;
