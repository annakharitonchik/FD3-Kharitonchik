import React from "react";
import ReactDOM from "react-dom";

import MobileCompany from "./components/MobileCompany";

let companyName = "A1";
let clientsArr = [
  {
    id: 101,
    surname: "Иванов",
    name: "Иван",
    middleName: "Иванович",
    balance: 200,
  },
  {
    id: 105,
    surname: "Сидоров",
    name: "Сидор",
    middleName: "Сидорович",
    balance: 250,
  },
  {
    id: 110,
    surname: "Петров",
    name: "Пётр",
    middleName: "Петрович",
    balance: 180,
  },
  {
    id: 120,
    surname: "Григорьев",
    name: "Григорий",
    middleName: "Григорьевич",
    balance: -220,
  },
];

ReactDOM.render(
  <MobileCompany clients={clientsArr} />,
  document.getElementById("container")
);
