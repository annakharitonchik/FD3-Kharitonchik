import React from "react";

import "./Items.css";

class ShopItems extends React.Component {
  render() {
    return (
      <div className="ItemBlock">
        <span className="Name">{this.props.name}</span>
        <span className="Price">{this.props.price}</span>
        <span className="Quantity">{this.props.quantity}</span>
        <img className="Photo" src={this.props.photo} alt="овощ"></img>
      </div>
    );
  }
}

export default ShopItems;
