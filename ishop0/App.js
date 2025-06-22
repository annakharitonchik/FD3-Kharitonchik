import React from "react";
import ReactDOM from "react-dom";

import Shop from "./components/Shop";

ReactDOM.render(
  <Shop
    name="Ромашка"
    address="г. Минск, ул. Полевая, 6"
    time="9:00 - 18:00"
  />,
  document.getElementById("container")
);
