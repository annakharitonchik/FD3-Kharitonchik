import React from "react";
import "./MobileCompany.css";
import MobileClient from "./MobileClient.js";
import PropTypes from "prop-types";
import { clientEvents } from "./events";

class MobileCompany extends React.PureComponent {
  headers = [
    "Фамилия",
    "Имя",
    "Отчество",
    "Баланс",
    "Статус",
    "Редактировать",
    "Удалить",
  ];

  static propTypes = {
    clients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        surname: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        middleName: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };
  state = {
    clients: this.props.clients,
    clientsFilter: "all", // active | blocked
  };

  componentDidMount = () => {
    clientEvents.addListener("ETextChanged", this.textChanged);
    clientEvents.addListener("EDelClient", this.deleteClient);
  };

  componentWillUnmount = () => {
    clientEvents.removeListener("ETextChanged", this.textChanged);

    clientEvents.removeListener("EDelClient", this.deleteClient);
  };
  textChanged = (info) => {
    let { id, surname, name, middleName, balance } = info;
    let newClients = this.state.clients.map((client) => {
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
    this.setState({ clients: newClients });
  };

  deleteClient = (id) => {
    this.setState({
      clients: this.state.clients.filter((client) => id != client.id),
    });
  };
  clientKey = 125;
  addClient = () => {
    this.setState({
      clients: [
        ...this.state.clients,
        {
          surname: "",
          name: "",
          middleName: "",
          balance: 0,
          id: this.clientKey,
        },
      ],
    });
    this.clientKey += 5;
  };
  render() {
    let filteredClients = this.state.clients.filter((client) => {
      if (this.state.clientsFilter === "active") return client.balance > 0;
      if (this.state.clientsFilter === "blocked") return client.balance <= 0;
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
              this.setState({ clientsFilter: "all" });
            }}
          >
            Все
          </button>
          <button
            onClick={() => {
              this.setState({ clientsFilter: "active" });
            }}
          >
            Активные
          </button>
          <button
            onClick={() => {
              this.setState({ clientsFilter: "blocked" });
            }}
          >
            Заблокированные
          </button>
        </div>
        <div className="InfoHeaders">
          {this.headers.map((header, index) => (
            <h3 key={index + 10}>{header}</h3>
          ))}
        </div>
        <div className="Clients">{MobileClientsCode}</div>

        <button className="AddClient" onClick={this.addClient}>
          Добавить клиента
        </button>
      </div>
    );
  }
}

export default MobileCompany;
