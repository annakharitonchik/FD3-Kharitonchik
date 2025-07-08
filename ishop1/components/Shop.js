import React from "react";

import "./Shop.css";

import Items from "./Items.js";

class Shop extends React.Component {
  headers = ["Name", "Price", "URL", "Quantity", "Control"];

  state = {
    selectedCode: null,
    items: this.props.items,
  };

  select = (code) => {
    this.setState({ selectedCode: code });
  };
  deleteItem(name, code) {
    let ans = confirm(`Вы точно хотите удалить ${name + code}?`);
    if (ans) {
      let updatedItems = this.state.items.filter((item) => item.code !== code);
      this.setState({ items: updatedItems });
    }
  }
  render() {
   const ItemsCode = this.state.items.map((v) => (
      <Items
        key={v.code}
        code={v.code}
        name={v.name}
        price={v.price}
        url={v.url}
        quantity={v.quantity}
        control={
          <button
            onClick={(eo) => {
              eo.stopPropagation();
              this.deleteItem(v.name, v.code);
            }}
          >
            Delete
          </button>
        }
        selected={this.state.selectedCode === v.code}
        onSelect={() => this.select(v.code)}
      />
    ));

    return (
      <table className="Shop" border={1}>
        <thead className="NameOfItems">
          <tr>
            {this.headers.map((header, index) => (
              <th key={index + 10}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="Items">{ItemsCode}</tbody>
      </table>
    );
  }
}

export default Shop;
