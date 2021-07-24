import axios from "axios";

const httpClientPost = (url, data) => {
  const accessToken = localStorage.getItem("token");
  axios.defaults.headers.common = { Authorization: `Bearer ${accessToken}` };
  const authHeader = {
    Authorization: `Bearer ${accessToken}`,
  };

  return {
    post: axios({
      method: "POST",
      url: url,
      data: { data },
      headers: authHeader,
    }),
  };
};
export default httpClientPost;
