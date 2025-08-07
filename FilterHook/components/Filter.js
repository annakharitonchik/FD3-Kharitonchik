import React, { useState } from "react";

import "./Filter.css";
import Controls from "./Controls";
import List from "./List";
const Filter = (props) => {
  const [curList, ChangeList] = useState(props.words);

  return (
    <form>
      <Controls words={props.words} ChangeList={ChangeList} />
      <List words={curList} />
    </form>
  );
};
export default Filter;
