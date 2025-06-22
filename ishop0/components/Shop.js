import React from "react";

import "./Shop.css";

class Shop extends React.Component {
  render() {
    return (
      <div className="shop">
        <h1>Интернет-магазин</h1>
        <span className="name">
          <h3>Название интернет-магазина:</h3>
          {this.props.name}
        </span>
        <span className="address">
          <h3>Адрес:</h3>
          {this.props.address}
        </span>
        <span className="time">
          <h3>Время работы:</h3>
          {this.props.time}
        </span>
      </div>
    );
  }
}

export default Shop;
