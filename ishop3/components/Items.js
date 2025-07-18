import React from "react";
import "./Items.css";

class Items extends React.Component {
  render() {
    return (
      <tr
        className={this.props.selected ? "CheckedItemBlock" : "ItemBlock"}
        onClick={() => {
          if (!this.props.disabled) {
            this.props.onSelect();
          }
        }}
      >
        <td className="Name">{this.props.name}</td>
        <td className="Price">{this.props.price}</td>
        <td className="Url">{this.props.url}</td>
        <td className="Quantity">{this.props.quantity}</td>
        <td className="Control">{this.props.control}</td>
      </tr>
    );
  }
}

export default Items;
