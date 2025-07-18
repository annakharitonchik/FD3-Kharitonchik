import React from "react";
import "./EditItem.css";
class EditItem extends React.Component {
  state = {
    saveDisable: this.props.saveDisable,
    name: this.props.name,
    price: this.props.price,
    url: this.props.url,
    quantity: this.props.quantity,
    mode: this.props.mode,
    errCount:
      this.props.mode === "editItem"
        ? { name: false, price: false, url: false, quantity: false }
        : { name: true, price: true, url: true, quantity: true },
  };

  validStr(input, maxLenth) {
    let errCount = 0;
    const message = input.nextElementSibling;
    let value = input.value;
    if (value.trim().length === 0) {
      message.textContent = "Поле пустое!";
      message.style.display = "flex";
      errCount++;
    } else if (value.trim().length > maxLenth) {
      message.style.display = "flex";
      message.textContent = "Слишком длинный текст!";
      errCount++;
    } else {
      message.style.display = "none";
    }

    return errCount;
  }
  validNum(input, minNum, maxNum) {
    let errCount = 0;
    const message = input.nextElementSibling;
    let value = input.value;
    if (value.trim().length === 0) {
      message.textContent = "Поле пустое или значение некорректно!";
      message.style.display = "flex";
      errCount++;
    } else if (Number(value) < minNum) {
      message.style.display = "flex";
      message.textContent = "Слишком маленькое значение!";
      errCount++;
    } else if (Number(value) > maxNum) {
      message.style.display = "flex";
      message.textContent = "Слишком большое значение!";
      errCount++;
    } else {
      message.style.display = "none";
    }
    return errCount;
  }

  errCount =
    this.state.mode == "editItem"
      ? {
          name: false,
          price: false,
          url: false,
          quantity: false,
        }
      : {
          name: true,
          price: true,
          url: true,
          quantity: true,
        };

  DisSave(input) {
    let name = input.name;
    if (name == "name") {
      this.errCount[name] = this.validStr(input, 20);
    } else if (name == "price") {
      this.errCount[name] = this.validNum(input, 10, 1000);
    } else if (name == "url") {
      this.errCount[name] = this.validStr(input, 40);
    } else if (name == "quantity") {
      this.errCount[name] = this.validNum(input, 1, 100);
    }
    this.props.changeDisable(true);
    this.setState({
      saveDisable: Object.values(this.errCount).some((value) => value == true),
    });
  }

  render() {
    return (
      <form
        className={
          this.state.mode == "editItem"
            ? this.props.selected
              ? "EditCard"
              : "NoEditCard"
            : "EditCard"
        }
      >
        <p className="description">
          {this.state.mode == "editItem"
            ? "Edit existing product"
            : "Add new product"}
        </p>
        <p className="ID">{`ID:${this.props.id}`}</p>
        <span className="Name">
          <label>
            <p>Name</p>
            <input
              type="text"
              onBlur={(eo) => this.validStr(eo.target, 20)}
              onChange={(eo) =>
                this.setState({ name: eo.target.value }, () =>
                  this.DisSave(eo.target, this.props.name)
                )
              }
              value={this.state.name}
              name="name"
            />
            <p className="warning"></p>
          </label>
        </span>
        <span className="Price">
          <label>
            <p>Price</p>
            <input
              type="number"
              onBlur={(eo) => this.validNum(eo.target, 10, 1000)}
              onChange={(eo) =>
                this.setState({ price: eo.target.value }, () =>
                  this.DisSave(eo.target)
                )
              }
              value={this.state.price}
              name="price"
            />
            <p className="warning"></p>
          </label>
        </span>
        <span className="Url">
          <label>
            <p>URL</p>
            <input
              type="text"
              onBlur={(eo) => this.validStr(eo.target, 40)}
              onChange={(eo) =>
                this.setState({ url: eo.target.value }, () =>
                  this.DisSave(eo.target)
                )
              }
              value={this.state.url}
              name="url"
            />
            <p className="warning"></p>
          </label>
        </span>
        <span className="Quantity">
          <label>
            <p>Quantity</p>
            <input
              type="number"
              onBlur={(eo) => this.validNum(eo.target, 1, 100)}
              onChange={(eo) =>
                this.setState({ quantity: eo.target.value }, () =>
                  this.DisSave(eo.target)
                )
              }
              value={this.state.quantity}
              name="quantity"
            />
            <p className="warning"></p>
          </label>
        </span>

        <span
          className="TwoButtons"
          style={{ justifyContent: "flex-start", marginTop: "10px" }}
        >
          <button
            style={{
              fontSize: "20px",
              width: "auto",
              backgroundColor: "rgb(137, 116, 255)",
            }}
            type="button"
            disabled={this.state.saveDisable}
            onClick={() => {
              this.props.onSave({
                code: this.props.code,
                name: this.state.name,
                price: this.state.price,
                url: this.state.url,
                quantity: this.state.quantity,
              });
              this.props.changeToDefMode();
              this.props.changeDisable(false);
            }}
          >
            {this.state.mode == "editItem" ? "Save" : "Add"}
          </button>
          <button
            type="button"
            disabled={false}
            style={{
              fontSize: "20px",
              width: "auto",
              backgroundColor: "rgb(137, 116, 255)",
            }}
            onClick={() => {
              this.props.changeDisable(false),
                this.setState({
                  name: this.props.name,
                  price: this.props.price,
                  url: this.props.url,
                  quantity: this.props.quantity,
                  saveDisable: true,
                });

              this.errCount =
                this.state.mode == "editItem"
                  ? {
                      name: false,
                      price: false,
                      url: false,
                      quantity: false,
                    }
                  : {
                      name: true,
                      price: true,
                      url: true,
                      quantity: true,
                    };

              const messages = document.querySelectorAll(".warning");
              messages.forEach((element) => {
                element.style.display = "none";
              });
            }}
          >
            Cancel
          </button>
        </span>
      </form>
    );
  }
}

export default EditItem;
