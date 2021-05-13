import React, { useState, useEffect, useRef } from "react";
import "../styles/dropdown.css";

const Dropdown = ({
  categories,
  selected,
  onDisabledChange,
  onResultsFetch,
  onSelectedChange,
}) => {

  // STATES
  const [open, setOpen] = useState(false);

  //REF
  const ref = useRef();

  // MANUAL DOM EVENT FOR CLOSING DROPDOWN
  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener("click", onBodyClick);
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  // CATEGORIES TO SHOW AS OPTIONS
  let renderedCategories = [];
  if (categories.length > 0 && selected !== undefined) {
    // NOT SHOWING THE CATEGORY THAT HAS BEEN SELECTED
    renderedCategories = categories.map((category) => {
      if (category.display_name === selected.display_name) {
        return null;
      }
      return (
        <div
          key={category.display_name}
          className="item"
          onClick={() => {
            onSelectedChange(category);
            onDisabledChange(false);
            onResultsFetch([]);
          }}
        >
          {category.display_name}
        </div>
      );
    });
  }

  return (
    <div className="ui form" ref={ref}>
      <div className="field">
        <div
          onClick={() => setOpen(!open)}
          className={`ui selection dropdown ${open ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">
            {selected ? selected.display_name : "Select a Category"}
          </div>
          <div className={`menu ${open ? "visible transition" : ""}`}>
            {renderedCategories}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
