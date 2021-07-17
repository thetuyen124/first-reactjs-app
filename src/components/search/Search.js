import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";

const Search = () => {
  return (
    <div className="search-area">
      <input type="text" className="search-box" placeholder="Search" />
      <button className="search-btn" type="submit">
        <SearchIcon style={{ fontSize: 17, marginLeft: -4 }} />
      </button>
    </div>
  );
};
export default Search;
