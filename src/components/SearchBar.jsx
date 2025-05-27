import React from "react";

const SearchBar = ({ setSearchQuery }) => (
  <div className="search-input-wrapper">
    <i className="fas fa-search search-icon"></i>
    <input
      className="search-bar"
      type="text"
      placeholder="Search..."
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </div>
);

export default SearchBar;
