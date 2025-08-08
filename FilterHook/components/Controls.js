import React from "react";

import "./Filter.css";
const Controls = (props) => {
  return (
    <React.Fragment>
      <input
        type="checkbox"
        className="check"
        checked={props.checkboxStatus}
        onChange={props.filteredWords}
      ></input>
      <input
        type="text"
        className="search"
        onChange={props.searchedWords}
        value={props.searchingText}
      ></input>
      <input
        type="button"
        className="reset"
        value="Сброс"
        onClick={props.reset}
      ></input>
    </React.Fragment>
  );
};

export default Controls;
