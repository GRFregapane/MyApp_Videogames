import React, { useState } from "react";
import { validateSearchTerm } from "./utils";
import { useDispatch } from "react-redux";
import { searchVideoGames } from "./actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const searchError = validateSearchTerm(searchTerm);
    if (searchError) {
      setError(searchError);
    } else {
      dispatch(searchVideoGames(searchTerm));
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SearchBar;

