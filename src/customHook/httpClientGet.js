import axios from "axios";

const httpClientGet = (url, data) => {
  const accessToken = localStorage.getItem("token");
  const authHeader = accessToken
    ? { Authorization: "Bearer " + accessToken }
    : {};

  return {
    get: axios({
      method: "GET",
      url: url,
      headers: authHeader,
    }),
  };
};
export default httpClientGet;
