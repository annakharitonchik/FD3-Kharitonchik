import React from "react";

import "./Shop.css";

import Items from "./Items.js";
import ItemCard from "./ItemCard.js";
import EditItem from "./EditItem.js";

class Shop extends React.Component {
  headers = ["Name", "Price", "URL", "Quantity", "Control"];

  state = {
    selectedCode: null,
    items: this.props.items,
    mode: "itemCard",
    disable: false,
    saveDisable: false,
  };

  select = (code) => {
    this.setState({
      selectedCode: code,
      mode: "itemCard",
    });
  };
  deleteItem(name, code) {
    let ans = confirm(`Вы точно хотите удалить ${name}?`);
    if (ans) {
      let updatedItems = this.state.items.filter((item) => item.code !== code);
      this.setState({ items: updatedItems });
    }
  }
  editItem(code) {
    this.setState({ selectedCode: code, mode: "editItem" });
  }
  changeToDefMode = () => this.setState({ mode: null });
  changeDisable = (disableState) =>
    this.setState({
      disable: disableState,
    });
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
          <span className="TwoButtons">
            <button
              disabled={this.state.disable}
              onClick={(eo) => {
                eo.stopPropagation();
                this.editItem(v.code);
              }}
            >
              Edit
            </button>
            <button
              disabled={this.state.disable}
              onClick={(eo) => {
                eo.stopPropagation();
                this.deleteItem(v.name, v.code);
              }}
            >
              Delete
            </button>
          </span>
        }
        selected={this.state.selectedCode === v.code}
        onSelect={() => this.select(v.code)}
        disabled={this.state.disable}
      />
    ));
    const ItemCardCode = this.state.items.map((v) => (
      <ItemCard
        key={v.code}
        code={v.code}
        name={v.name}
        price={`Price: ${v.price}`}
        url={v.url}
        quantity={`Quantity ${v.quantity}`}
        selected={this.state.selectedCode === v.code}
      />
    ));
    const EditItemCode = this.state.items.map((v, i) => (
      <EditItem
        key={v.code}
        code={v.code}
        mode={this.state.mode}
        id={i + 1}
        name={v.name}
        price={v.price}
        url={v.url}
        quantity={v.quantity}
        changeDisable={this.changeDisable}
        selected={this.state.selectedCode === v.code}
        changeToDefMode={this.changeToDefMode}
        onSave={(updatedItem) => {
          const newItems = this.state.items.map((element) => {
            if (element.code == updatedItem.code) {
              return updatedItem;
            } else {
              return element;
            }
          });
          this.setState({
            items: newItems,
          });
        }}
      />
    ));
    const NewItemCode = (
      <EditItem
        key={this.state.items.length + 1}
        code={this.state.items.length + 1}
        mode={this.state.mode}
        id={this.state.items.length + 1}
        saveDisable={this.state.saveDisable}
        name={""}
        price={""}
        url={""}
        quantity={""}
        changeToDefMode={this.changeToDefMode}
        changeDisable={this.changeDisable}
        onSave={(newItem) => {
          this.state.items.push(newItem);
        }}
      />
    );

    return (
      <div className="Shop">
        <table className="TableShop" border={1}>
          <thead className="NameOfItems">
            <tr>
              {this.headers.map((header, index) => (
                <th key={index + 10}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="Items">{ItemsCode}</tbody>
        </table>
        <button
          className="AddProduct"
          disabled={this.state.mode == "newCard" ? true : this.state.disable}
          onClick={() => {
            this.setState(
              { mode: "newCard", selectedCode: null, saveDisable: true },
              this.changeDisable(true)
            );
          }}
        >
          New product
        </button>
        {this.state.mode == "itemCard" && ItemCardCode}
        {this.state.mode == "editItem" && EditItemCode}
        {this.state.mode == "newCard" && NewItemCode}
      </div>
    );
  }
}

export default Shop;
