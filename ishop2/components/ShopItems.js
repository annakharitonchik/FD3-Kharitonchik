import React from "react";
import "./Items.css";

class ShopItems extends React.Component {
  render() {
    return (
      <div className="ItemBlock">
        <span className="Name">{this.props.name}</span>
        <span className="Price">{this.props.price}</span>
        <span className="Quantity">{this.props.quantity}</span>
        <img
          className={this.props.selected ? "Photo selected" : "Photo"}
          src={this.props.photo}
          alt="овощ"
          onClick={this.props.onSelect}
        ></img>
      </div>
    );
  }
}

export default ShopItems;
