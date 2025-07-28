import React from "react";

class DoubleButton extends React.Component {
  render() {
    return (
      <div
        style={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "bold",
          margin: " 10px 0",
        }}
      >
        <input  style={{
            fontSize: "15px",
            fontWeight: "bold",
            margin: " 0 5px ",
          }}
          type="button"
          value={this.props.caption1}
          onClick={() => this.props.cbPressed(1)}
        />
        <span>{this.props.children}</span>
        <input
          style={{
            fontSize: "15px",
            fontWeight: "bold",
            margin: " 0 5px ",
          }}
          type="button"
          value={this.props.caption2}
          onClick={() => this.props.cbPressed(2)}
        />
      </div>
    );
  }
}

export default DoubleButton;
