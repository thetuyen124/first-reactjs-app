import { useEffect, useState } from "react";
import axios from "axios";
import { Spin } from "antd";
import Login from "./Login";

import "antd/dist/antd.css";
const Profile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [id, setId] = useState(null);

  const userId = localStorage.getItem("userId");
  console.log(userId);
  console.log(localStorage.getItem("token"));
  console.log(localStorage.getItem("token") !== null);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      axios
        .get(`https://60dff0ba6b689e001788c858.mockapi.io/users/${userId}`)
        .then((response) => {
          setName(response.data.name);
          setId(response.data.id);
          setIsLoading(false);
        });
    }
  }, [userId]);

  useEffect(() => {
    document.title = "Profile";
  }, []);

  if (userId === null) {
    return <Login message="You need to login to continue" />;
  }
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: 150, marginBottom: 50 }}>
        <Spin />
      </div>
    );
  }
  return (
    <div className="mainContent">
      <div className="title">Profile</div>
      <div className="content">
        <h2>Name: {name}</h2>
        <h2>UserID:{id} </h2>
      </div>
    </div>
  );
};
export default Profile;
