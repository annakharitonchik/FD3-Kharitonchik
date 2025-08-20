import React, { useState, useEffect } from "react";
import "./MobileCompany.css";
import MobileClient from "./MobileClient.js";
import { clientEvents } from "./events.js";
import { useDispatch, useSelector } from "react-redux";

import {
  textChanged,
  deleteClient,
  addClient,
  getCompanyData,
} from "../redux/clients.js";

// we'll use this asyncronous action-function INSTEAD of a regular action-object
// the thunk will just execute this action-function instead of passing it to reducers
// the thunk with pass dispatch-function as an argument to this action-function

const MobileCompany = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCompanyData());
  }, [dispatch]);

  let clients = useSelector((state) => state.companyData.clientsArr);
  let companyName = useSelector((state) => state.companyData.companyName);

  const headers = [
    "Фамилия",
    "Имя",
    "Отчество",
    "Баланс",
    "Статус",
    "Редактировать",
    "Удалить",
  ];

  const [clientsFilter, setClientsFilter] = useState("all"); // active | blocked
  const doTextChanged = (info) => {
    console.log("Редактируем клиента:", info);
    dispatch(textChanged(info));
  };
  const doDelete = (id) => dispatch(deleteClient({ id }));

  useEffect(() => {
    clientEvents.addListener("ETextChanged", doTextChanged);
    clientEvents.addListener("EDelClient", doDelete);
    return () => {
      clientEvents.removeListener("ETextChanged", doTextChanged);
      clientEvents.removeListener("EDelClient", doDelete);
    };
  }, []);

  let filteredClients = clients.filter((client) => {
    if (clientsFilter === "active") return client.balance > 0;
    if (clientsFilter === "blocked") return client.balance <= 0;
    return true;
  });
  let dataLoadError = useSelector((state) => state.companyData.dataLoadError);

  console.log("MobileCompany render", "err:" + dataLoadError);
  const MobileClientsCode = filteredClients.map((client) => (
    <MobileClient key={client.id} info={client} />
  ));
  let dataLoadState = useSelector((state) => state.companyData.dataLoadState);
  return dataLoadState === 3 ? (
    <div style={{ color: "red" }} className="MobileCompany">
      {dataLoadError}
    </div>
  ) : dataLoadState === 2 ? (
    <div className="MobileCompany ">
      <p className="NameCompany">{companyName}</p>
      <div className="ThreeButtons">
        <button
          onClick={() => {
            setClientsFilter("all");
          }}
        >
          Все
        </button>
        <button
          onClick={() => {
            setClientsFilter("active");
          }}
        >
          Активные
        </button>
        <button
          onClick={() => {
            setClientsFilter("blocked");
          }}
        >
          Заблокированные
        </button>
      </div>
      <div className="InfoHeaders">
        {headers.map((header, index) => (
          <h3 key={index + 10}>{header}</h3>
        ))}
      </div>
      <div className="Clients">{MobileClientsCode}</div>

      <button className="AddClient" onClick={() => dispatch(addClient())}>
        Добавить клиента
      </button>
    </div>
  ) : (
    <div className="MobileCompany ">
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default MobileCompany;
