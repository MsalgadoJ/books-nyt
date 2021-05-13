import React, { useState, useEffect } from "react";
//API
import books from "./apis/books";
//COMPONENTS
import SearchBar from "./components/SearchBar";
import Dropdown from "./components/Dropdown";
import Results from "./components/Results";
// CSS
import "./styles/app.css";

const App = () => {
  // STATES
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [results, setResults] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [term, setTerm] = useState("");

  // FETCH CATEGORIES FROM THE API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await books.get(
      `lists/names.json?api-key=${process.env.REACT_APP_BOOKS_API_KEY}`
    );
    setCategories(response.data.results.slice(0, 10));
  };

  return (
    <div id="app">
      <div className="navbar">
        <div className="container">
          <div className="card">
            <div className="heading">
              <h4 className="title">NYTimes Books</h4>
            </div>
            <div className="top-bar">
              <SearchBar
                term={term}
                onTermChange={setTerm}
                selected={selected}
                disabled={disabled}
                onResultsFetch={setResults}
              />
              <Dropdown
                selected={selected}
                categories={categories}
                onDisabledChange={setDisabled}
                onResultsFetch={setResults}
                onSelectedChange={setSelected}
              />
            </div>
            <Results results={results} term={term} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
