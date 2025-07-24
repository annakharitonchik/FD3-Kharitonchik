import React from "react";

class RainbowFrame extends React.Component {
  render() {
    let readyLayer = (
      <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
        {this.props.children}
      </p>
    );
    this.props.colors.forEach((color, i) => {
      readyLayer = (
        <div style={{ border: ` solid 10px ${color}`, margin: `10px` }}>
          {readyLayer}
        </div>
      );
    });
    return <div>{readyLayer}</div>;
  }
}

export default RainbowFrame;
