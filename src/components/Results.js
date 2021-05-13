import React from "react";
// CSS
import "../styles/results.css"

const Results = ({ results, term }) => {
  // FILTER RESULTS ACCORDING TO TERM SUBMITTED BY USER
  let filteredResults = [];

  if (results !== []) {
    filteredResults = results.filter((result) => {
      return (
        result.book_details[0].title
          .toLowerCase()
          .indexOf(term.toLocaleLowerCase()) !== -1
      );
    });
  }

  // RESULTS TO SHOW
  let renderedResults = [];

  if (renderedResults !== []) {
    renderedResults = filteredResults.map((result) => {
      return (
        <ul
          key={result.book_details[0].title}
          className="list"
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="500"
        >
          <li>
            <a
              target="_blank"
              rel="noreferrer"
              // THE TITLE SHOULD TAKE THE USER TO A GOOGLE SEARCH PAGE
              href={`http://www.google.com/search?q=${result.book_details[0].title
                .split(" ")
                .join("+")}+${result.book_details[0].author
                .split(" ")
                .join("+")}`}
            >
              <p>{result.book_details[0].title}</p>
            </a>
            <span>By {result.book_details[0].author}</span>
            <p>{result.book_details[0].description}</p>
          </li>
        </ul>
      );
    });
  }

  return (
    <div className="content">
      {results.length > 0 && renderedResults.length === 0 ? (
        <p className="no-content" data-aos="fade-down">
          There are no results for your search
        </p>
      ) : (
        <div>
          {renderedResults.length === 0 ? null : (
            <p className="number-res">
              Number of results: {renderedResults.length}
            </p>
          )}
          {renderedResults}
        </div>
      )}
    </div>
  );
};

export default Results;
