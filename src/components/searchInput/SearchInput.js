import React from "react";
const SearchInput = (props) => {
  const onFocus = (evt) => {
    evt.target.style.borderColor = "#0c4e87";
  };
  const onBlur = (evt) => {
    evt.target.style.borderColor = "darkkhaki";
  };
  const onChange = (evt) => {
    setSearchTerm(evt.target.value);
  };
  const { searchTerm, setSearchTerm } = props;
  return (
    <input
      className="search-input"
      placeholder="Search by title"
      value={searchTerm}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
    />
  );
};
export default SearchInput;
