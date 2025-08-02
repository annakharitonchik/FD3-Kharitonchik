import React from "react";
import "./MobileClient.css";
import PropTypes from "prop-types";
import { clientEvents } from "./events";

class MobileClient extends React.PureComponent {
  static propTypes = {
    info: PropTypes.shape({
      id: PropTypes.number.isRequired,
      surname: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      middleName: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
    }).isRequired,
  };

  surnameRef = React.createRef(); // return { current: undefined }
  nameRef = React.createRef();
  middleNameRef = React.createRef();
  balanceRef = React.createRef();
  state = {
    isEdit: false,
  };
  startEdit = () => {
    this.setState({ isEdit: true });
  };

  saveEdit = () => {
    if (
      this.surnameRef.current &&
      this.nameRef.current &&
      this.middleNameRef.current &&
      this.balanceRef.current
    ) {
      let newSurname = this.surnameRef.current.value;
      let newName = this.nameRef.current.value;
      let newMiddleNname = this.middleNameRef.current.value;
      let newBalance = Number(this.balanceRef.current.value);

      clientEvents.emit("ETextChanged", {
        id: this.props.info.id,
        surname: newSurname,
        name: newName,
        middleName: newMiddleNname,
        balance: newBalance,
      });
    }

    this.setState({ isEdit: false });
  };

  render() {
    console.log("MobileClient name = " + this.props.info.name + " render");
    return (
      <div className="Client">
        {this.state.isEdit ? (
          <React.Fragment>
            <input
              defaultValue={this.props.info.surname}
              ref={this.surnameRef}
            ></input>
            <input
              defaultValue={this.props.info.name}
              ref={this.nameRef}
            ></input>
            <input
              defaultValue={this.props.info.middleName}
              ref={this.middleNameRef}
            ></input>
            <input
              defaultValue={this.props.info.balance}
              ref={this.balanceRef}
            ></input>
            <p
              className={
                this.props.info.balance > 0 ? "StatusActive" : "StatusBlocked"
              }
            >
              {this.props.info.balance > 0 ? "active" : "blocked"}
            </p>
            <p>
              <button className="Save" onClick={this.saveEdit}>
                Сохранить
              </button>
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <p className="Surname">{this.props.info.surname}</p>
            <p className="Name">{this.props.info.name}</p>
            <p className="MiddleName">{this.props.info.middleName}</p>
            <p className="Balance">{this.props.info.balance}</p>
            <p
              className={
                this.props.info.balance > 0 ? "StatusActive" : "StatusBlocked"
              }
            >
              {this.props.info.balance > 0 ? "active" : "blocked"}
            </p>
            <p>
              <button className="Edit" onClick={this.startEdit}>
                Редактировать
              </button>
            </p>
          </React.Fragment>
        )}

        <p>
          <button
            className="Delete"
            onClick={() => clientEvents.emit("EDelClient", this.props.info.id)}
          >
            Удалить
          </button>
        </p>
      </div>
    );
  }
}

export default MobileClient;
