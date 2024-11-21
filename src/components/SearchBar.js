import React, { useState } from "react";
import "../App.css";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleSearch = () => {
    if (query.trim() === "") {
      alert("Please enter a search query!");
      return;
    }
    onSearch(query);
  };

  return (
    <div className="container d-flex gap-3">
      <input
        type="text"
        value={query}
        placeholder="Search articles..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
