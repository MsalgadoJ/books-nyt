import React from "react";
// API
import books from "../apis/books";
// CSS
import "../styles/searchbar.css"

const SearchBar = ({
  term,
  onTermChange,
  selected,
  disabled,
  onResultsFetch,
}) => {
   // FETCH BOOKS FROM THE API
  const search = async () => {
    if (selected !== "") {
      const response = await books.get(
        `lists.json?list=${selected.list_name_encoded}&api-key=${process.env.REACT_APP_BOOKS_API_KEY}`
      );
      onResultsFetch(response.data.results);
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    search();
  };

  return (
    <div className="search">
      <form action="" onSubmit={onFormSubmit}>
        <input
          type="text"
          value={term}
          onChange={(e) => onTermChange(e.target.value)}
          className="form-control"
          placeholder="Search by title"
          disabled={disabled}
        />
      </form>
    </div>
  );
};

export default SearchBar;
