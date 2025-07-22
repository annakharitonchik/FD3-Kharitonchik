import React from "react";
import "./ItemCard.css";
class ItemCard extends React.Component {
  render() {
    return (
      <div className="Card">
        <h5 className="Name">{this.props.name}</h5>
        <div className="Info">
          <div className="TextInfo">
            <p className="Price">{this.props.price}</p>
            <p className="Quantity">{this.props.quantity}</p>
          </div>
          <img className="Url" src={this.props.url} alt="item"></img>
        </div>
      </div>
    );
  }
}

export default ItemCard;
