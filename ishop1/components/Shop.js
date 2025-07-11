﻿import React from "react";

import "./Shop.css";

import ShopName  from "./ShopName.js";
import ShopItems from "./ShopItems.js";

class Shop extends React.Component {

  state = {
    selectedCode: null
  };

  select = (code) => {
    this.setState({ selectedCode: code });
  };

  render() {
    const ItemsCode = this.props.items.map((v) => (
      <ShopItems key={v.code} name={v.name} price={v.price+"р/кг"} code={v.code} photo={v.photo} quantity = {v.quantity+'кг'}
      selected={this.state.selectedCode === v.code}
      onSelect={() => this.select(v.code)}/>
    ));

    return (
      <div className="Shop">
        <ShopName name ={this.props.name} />
        <div className="Items">{ItemsCode}</div>
      </div>
    );
  }
}

export default Shop;
