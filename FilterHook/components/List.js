import React from "react";

import "./Filter.css";

const List = (props) => {
  return (
    <select className="words" multiple size={4}>
      {props.words.map((v, i) => (
        <option key={i + 10 + 1} value={i + 1}>
          {v}
        </option>
      ))}
    </select>
  );
};

export default List;
