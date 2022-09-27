import React, { Component } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';
import './rated.css';

export default class Rated extends Component {
  state = {
    arr: Object.values(localStorage),
  };
  strSlice(str) {
    return str.split(' ').slice(0, 15).join(' ');
  }
  borderStyle(star) {
    if (star >= 0 && star < 3) return { borderColor: '#E90000' };
    if (star >= 3 && star < 5) return { borderColor: '#E97E00' };
    if (star >= 5 && star < 7) return { borderColor: '#E9D100' };
    if (star > 7) return { borderColor: '#66E900' };
  }
  rendersMovie(movies) {
    return movies.map((item) => {
      const { release, description, id, name, stars, url } = JSON.parse(item);
      const releaseCheck = release ? format(new Date(release), 'd MMMM yyyy') : 'дата релиза неизвестна';
      return (
        <div key={id} className="column">
          <img className="image" src={`https://image.tmdb.org/t/p/original${url}`} />
          <div className="description-container">
            <h5 className="title">{name}</h5>
            <div className="rated" style={this.borderStyle(stars)}>
              {stars}
            </div>
            <p>{releaseCheck}</p>
            <button>Action</button> <button>Drama</button>
            <p className="description">{`${this.strSlice(description)}...`}</p>
            <Rate className="rate" count="10" value={stars} />
          </div>
        </div>
      );
    });
  }
  render() {
    const item = this.rendersMovie(this.state.arr);
    return <div className="row">{item}</div>;
  }
}
