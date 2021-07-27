import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { httpClient } from "../../customHook/httpClient";
import Error403 from "../error403/Error403";

const token = localStorage.getItem("token");
const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (token) {
      const myToken = decodeToken(token);
      const role = myToken.role.map((r) => r.authority);
      setIsAdmin(role.filter((r) => r.includes("ADMIN")).length !== 0);
    }
  }, [isAdmin]);
  useEffect(() => {
    httpClient
      .get("api/v1/admin/post/statistic?author=BillGate")
      .then((response) => {
        setData(response.data);
      })
      .catch((errors) => {
        if (errors.response.status === 401) {
          console.log(errors.response.status);
        }
      });
  }, []);
  if (!isAdmin) {
    return <Error403 />;
  }

  return (
    <div className="mainContent">
      <h1 className="title">User: {data.author}</h1>
      <h1 className="content">Number of post: {data.numberOfPost}</h1>
    </div>
  );
};
export default AdminPage;
