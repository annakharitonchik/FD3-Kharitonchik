import React, { useState, useEffect, useRef } from "react";
import "./MobileCompany.css";
import MobileClient from "./MobileClient.js";
import PropTypes from "prop-types";
import { clientEvents } from "./events";

const MobileCompany = (props) => {
  const headers = [
    "Фамилия",
    "Имя",
    "Отчество",
    "Баланс",
    "Статус",
    "Редактировать",
    "Удалить",
  ];

  const [clients, setClients] = useState(props.clients);
  const [clientsFilter, setClientsFilter] = useState("all"); // active | blocked
  const clientKey = useRef(125);
  useEffect(() => {
    clientEvents.addListener("ETextChanged", textChanged);
    clientEvents.addListener("EDelClient", deleteClient);
    return () => {
      clientEvents.removeListener("ETextChanged", textChanged);
      clientEvents.removeListener("EDelClient", deleteClient);
    };
  }, [clients]);

  const textChanged = (info) => {
    let { id, surname, name, middleName, balance } = info;
    let newClients = clients.map((client) => {
      if (id === client.id) {
        return {
          ...client,
          surname,
          name,
          middleName,
          balance,
        };
      }
      return client;
    });
    setClients(newClients);
  };

  const deleteClient = (id) => {
    setClients(clients.filter((client) => id != client.id));
  };

  const addClient = () => {
    setClients([
      ...clients,
      {
        surname: "",
        name: "",
        middleName: "",
        balance: 0,
        id: clientKey.current,
      },
    ]);

    clientKey.current += 5;
  };

  let filteredClients = clients.filter((client) => {
    if (clientsFilter === "active") return client.balance > 0;
    if (clientsFilter === "blocked") return client.balance <= 0;
    return true;
  });
  console.log("MobileCompany render");
  const MobileClientsCode = filteredClients.map((client) => (
    <MobileClient key={client.id} info={client} />
  ));

  return (
    <div className="MobileCompany ">
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

      <button className="AddClient" onClick={addClient}>
        Добавить клиента
      </button>
    </div>
  );
};
MobileCompany.propTypes = {
  clients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      surname: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      middleName: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    })
  ).isRequired,
};
export default MobileCompany;
