import React, { useState, useEffect } from "react";

import "./Filter.css";
const Controls = (props) => {
  const [searchingText, setText] = useState("");
  const [checkboxStatus, setCheckbox] = useState(false);

  useEffect(() => {
    let filtered = props.words.filter((word) => word.includes(searchingText));

    if (checkboxStatus) {
      filtered.sort((a, b) => a.localeCompare(b));
    }
    props.ChangeList(filtered);
  }, [searchingText, checkboxStatus]);

  const searchedWords = (eo) => {
    setText(eo.target.value.toLowerCase());
  };

  const filteredWords = (eo) => {
    setCheckbox(eo.target.checked);
  };

  const reset = () => {
    setText("");
    setCheckbox(false);
    props.ChangeList(props.words);
  };

  return (
    <React.Fragment>
      <input
        type="checkbox"
        className="check"
        checked={checkboxStatus}
        onChange={filteredWords}
      ></input>
      <input
        type="text"
        className="search"
        onChange={searchedWords}
        value={searchingText}
      ></input>
      <input
        type="button"
        className="reset"
        value="Сброс"
        onClick={reset}
      ></input>
    </React.Fragment>
  );
};

export default Controls;
