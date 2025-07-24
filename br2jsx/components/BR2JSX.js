import React from "react";

class BR2JSX extends React.Component {
  render() {
    let linesArr = this.props.text.split(/<br\s*\/?>/i);
    let newArray = [];

    linesArr.forEach((line, index) => {
      newArray.push(line);
      if (index < linesArr.length - 1) {
        newArray.push(<br key={index} />);
      }
    });

    return (
      <div
        className="br2jsx"
        style={{
          padding: "8px",
          background: "#2f4f4f",
          textAlign: "center",
          color: "white",
          fontSize: "25px",
          display: "inline-block",
        }}
      >
        {newArray}
      </div>
    );
  }
}

export default BR2JSX;
