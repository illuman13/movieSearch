import React, { Component } from 'react';
import './inputSearch.css';
import { debounce } from 'lodash';
export default class InputSearch extends Component {
  state = {
    isLoading: false,
    label: '',
    debouncedMessage: '',
  };
  debounceTest = debounce((value) => {
    this.setState({
      isLoading: false,
      debouncedMessage: value,
      label: '',
    });
    this.props.queryMovies(value);
  }, 1000);
  testDebounce = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      isLoading: true,
      label: value,
    });
    this.debounceTest(value);
  };
  render() {
    return (
      <form onSubmit={this.testDebounce}>
        <input
          type="text"
          className="new-todo"
          placeholder="Type to search..."
          autoFocus
          onChange={this.testDebounce}
          value={this.state.label}
        />
        {/*<p>{this.state.isLoading ? '' : this.state.debouncedMessage}</p>*/}
      </form>
    );
  }
}
