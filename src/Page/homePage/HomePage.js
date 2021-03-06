import { useEffect, useState } from "react";
import React from "react";
import { Empty, Input, Pagination, Spin } from "antd";
import { Link } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { httpClient } from "../../customHook/httpClient";

const token = localStorage.getItem("token");
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listPost, setListPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAuthor, setIsAuthor] = useState(false);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (token) {
      const myToken = decodeToken(token);
      const role = myToken.role.map((r) => r.authority);
      setIsAuthor(role.filter((r) => r.includes("AUTHOR")).length !== 0);
    }
  }, []);

  useEffect(() => {
    document.title = "Post";
  }, []);

  useEffect(() => {
    setIsLoading(true);
    let didCancel = false;
    httpClient
      .get("api/v1/posts/search?searchTerm=" + searchText)
      .then(function (response) {
        if (!didCancel) {
          setListPost(response.data);
          setIsLoading(false);
        }
      })
      .catch(function (error) {
        // handle error
        setIsLoading(false);
        console.log(error);
      });
    return () => {
      didCancel = true;
    };
  }, [searchText]);

  const handlePageChange = (page, pageS) => {
    setCurrentPage(parseInt(page));
    setPageSize(pageS);
  };

  return (
    <div className="mainContent">
      <Input
        allowClear
        style={{
          width: "70%",
          bottom: "10px",
          float: "right",
          borderRadius: "15px",
        }}
        value={searchText}
        onChange={(evt) => {
          setSearchText(evt.target.value);
        }}
        placeholder="Search by title"
      />
      <div className="clearFix"></div>
      {isLoading ? (
        <div
          style={{
            textAlign: "center",
            marginBottom: 50,
            marginLeft: "47%",
            display: "inline-block",
          }}
        >
          <br />
          <Spin />
        </div>
      ) : listPost.length !== 0 ? (
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
                    Posted by {post.userId} on {post.createdDate} - 8 mins read
                  </span>
                  <div className="edit-post">
                    <Link
                      to={{
                        pathname: isAuthor ? `/post/edit/${post.id}` : "/403",
                      }}
                    >
                      Edit post ...
                    </Link>
                  </div>
                  <hr />
                </div>
              );
            })}
        </div>
      ) : (
        <Empty />
      )}
      <Pagination
        hideOnSinglePage
        current={currentPage}
        style={{
          margin: "auto",
          width: "70%",
          position: "relative",
          top: "15px",
        }}
        onChange={handlePageChange}
        total={listPost.length}
      />
    </div>
  );
};
export default HomePage;
