import React, { useState, useEffect } from "react";

import "./Filter.css";
import Controls from "./Controls";
import List from "./List";
const Filter = (props) => {
  const [curList, changeList] = useState(props.words);
  const [searchingText, setText] = useState("");
  const [checkboxStatus, setCheckbox] = useState(false);

  useEffect(() => {
    let filtered = props.words.filter((word) => word.includes(searchingText));

    if (checkboxStatus) {
      filtered.sort((a, b) => a.localeCompare(b));
    }
    changeList(filtered);
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
    changeList(props.words);
  };
  return (
    <form>
      <Controls
        checkboxStatus={checkboxStatus}
        filteredWords={filteredWords}
        searchedWords={searchedWords}
        searchingText={searchingText}
        reset={reset}
      />
      <List words={curList} />
    </form>
  );
};
export default Filter;
