import { Pagination } from 'antd';
import React, { Component } from 'react';
import './pagination.css';
export default class Paginations extends Component {
  render() {
    return (
      <Pagination
        className="pagination"
        defaultCurrent={1}
        total={50}
        onChange={(value) => this.props.getPage(value)}
      />
    );
  }
}
