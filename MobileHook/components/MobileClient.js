import React, { useState, useRef } from "react";
import "./MobileClient.css";
import PropTypes from "prop-types";
import { clientEvents } from "./events";

const MobileClient = React.memo((props) => {
  const surnameRef = useRef();
  const nameRef = useRef();
  const middleNameRef = useRef();
  const balanceRef = useRef();

  const [isEdit, setIsEdit] = useState(false);

  const startEdit = () => {
    setIsEdit(true);
  };

  const saveEdit = () => {
    if (
      surnameRef.current &&
      nameRef.current &&
      middleNameRef.current &&
      balanceRef.current
    ) {
      let newSurname = surnameRef.current.value;
      let newName = nameRef.current.value;
      let newMiddleName = middleNameRef.current.value;
      let newBalance = Number(balanceRef.current.value);

      clientEvents.emit("ETextChanged", {
        id: props.info.id,
        surname: newSurname,
        name: newName,
        middleName: newMiddleName,
        balance: newBalance,
      });
    }

    setIsEdit(false);
  };

  console.log("MobileClient name = " + props.info.name + " render");
  return (
    <div className="Client">
      {isEdit ? (
        <React.Fragment>
          <input defaultValue={props.info.surname} ref={surnameRef}></input>
          <input defaultValue={props.info.name} ref={nameRef}></input>
          <input
            defaultValue={props.info.middleName}
            ref={middleNameRef}
          ></input>
          <input defaultValue={props.info.balance} ref={balanceRef}></input>
          <p
            className={
              props.info.balance > 0 ? "StatusActive" : "StatusBlocked"
            }
          >
            {props.info.balance > 0 ? "active" : "blocked"}
          </p>
          <p>
            <button className="Save" onClick={saveEdit}>
              Сохранить
            </button>
          </p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p className="Surname">{props.info.surname}</p>
          <p className="Name">{props.info.name}</p>
          <p className="MiddleName">{props.info.middleName}</p>
          <p className="Balance">{props.info.balance}</p>
          <p
            className={
              props.info.balance > 0 ? "StatusActive" : "StatusBlocked"
            }
          >
            {props.info.balance > 0 ? "active" : "blocked"}
          </p>
          <p>
            <button className="Edit" onClick={startEdit}>
              Редактировать
            </button>
          </p>
        </React.Fragment>
      )}

      <p>
        <button
          className="Delete"
          onClick={() => clientEvents.emit("EDelClient", props.info.id)}
        >
          Удалить
        </button>
      </p>
    </div>
  );
});
MobileClient.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number.isRequired,
    surname: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    middleName: PropTypes.string.isRequired,
    balance: PropTypes.number.isRequired,
  }).isRequired,
};

export default MobileClient;
