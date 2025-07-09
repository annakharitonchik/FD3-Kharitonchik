import React from "react";

import "./Filter.css";

class Filter extends React.Component {
  state = {
    searchingText: "",
    checkboxStatus: false,
  };

  searchedWords = (eo) => {
    this.setState({
      searchingText: eo.target.value.toLowerCase(),
    });
  };

  filteredWords = (eo) => {
    this.setState({
      checkboxStatus: eo.target.checked,
    });
  };
  reset = () => {
    this.setState({
      searchingText: "",
      checkboxStatus: false,
    });
  };
  getWords() {
    const filtered = this.props.words.filter((word) =>
      word.includes(this.state.searchingText)
    );

    if (this.state.checkboxStatus) {
      return filtered.sort((a, b) => a.localeCompare(b));
    } else {
      return filtered;
    }
  }

  render() {
    return (
      <form>
        <input
          type="checkbox"
          className="check"
          checked = {this.state.checkboxStatus}
          onChange={this.filteredWords}
        ></input>
        <input
          type="text"
          className="search"
          onChange={this.searchedWords}
          value={this.state.searchingText}
        ></input>
        <input
          type="button"
          className="reset"
          value="Сброс"
          onClick={this.reset}
        ></input>
        <select className="words" multiple size={4}>
          {this.getWords().map((v, i) => (
            <option key={i + 10 + 1} value={i + 1}>
              {v}
            </option>
          ))}
        </select>
      </form>
    );
  }
}

export default Filter;
