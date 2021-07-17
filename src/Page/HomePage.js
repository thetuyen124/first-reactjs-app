import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    document.title = "Homepage";
  }, []);
  return (
    <div className="mainContent">
      <span style={{ fontSize: 35 }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book
      </span>
    </div>
  );
};
export default HomePage;
