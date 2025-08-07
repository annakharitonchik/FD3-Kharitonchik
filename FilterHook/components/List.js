import React, { useState, useEffect } from "react";

import "./Filter.css";

const List = (props) => {
  const [words, setWords] = useState(props.words);
  useEffect(() => {
    setWords(props.words);
  }, [props.words]);
  return (
    <select className="words" multiple size={4}>
      {words.map((v, i) => (
        <option key={i + 10 + 1} value={i + 1}>
          {v}
        </option>
      ))}
    </select>
  );
};

export default List;
