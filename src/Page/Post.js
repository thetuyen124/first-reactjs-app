import axios from "axios";
import { useEffect, useState } from "react";
import { Spin, Empty } from "antd";

import TablePost from "../components/tablePost/TablePost";
import SearchInput from "../components/searchInput/SearchInput";

const Post = () => {
  const arrSort = ["(NONE)", "ASC", "DESC"];

  const [sort, setSort] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [listPost, setListPost] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    document.title = "Post";
  }, []);

  useEffect(() => {
    setResult(
      listPost.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, listPost]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        setIsLoading(false);
        setListPost(response.data);
        setResult(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <Spin />
      </div>
    );
  }
  if (result.length === 0) {
    return (
      <div className="mainContent">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Empty />;
      </div>
    );
  }
  return (
    <div className="mainContent">
      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <table className="post-table">
        <thead>
          <tr className="table-header">
            <td style={{ width: 40 }}>Id</td>
            <td
              onClick={() => {
                setSort((sort + 1) % 3);
              }}
            >
              Title --sort: {arrSort[sort]}
            </td>
            <td style={{ width: 100 }}>Action</td>
          </tr>
        </thead>
        <tbody>
          <TablePost listPost={result} sort={sort} />
        </tbody>
      </table>
    </div>
  );
};
export default Post;
