import "./tablePost.css";

import { Link } from "react-router-dom";
import React from "react";

const TablePost = (props) => {
  const { listPost, sort } = props;

  switch (sort) {
    case 0:
      listPost.sort((post1, post2) => {
        return post1.id - post2.id;
      });
      break;
    case 1:
      listPost.sort((post1, post2) => {
        return post1.title.localeCompare(post2.title);
      });
      break;
    case 2:
      listPost.sort((post1, post2) => {
        return post2.title.localeCompare(post1.title);
      });
      break;
    default:
  }
  return listPost.map((post) => {
    return (
      <tr key={post.id}>
        <td>{post.id}</td>
        <td>{post.title}</td>
        <td>
          <Link className="a-link" to={{ pathname: `/post/${post.id}` }}>
            View detail
          </Link>
        </td>
      </tr>
    );
  });
};
export default TablePost;
