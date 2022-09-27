import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './item-list.css';
import { Rate } from 'antd';
import { format } from 'date-fns';

import Spinner from '../spiner';
import Paginations from '../pagination';
import ErrorMassege from '../errorMassege';
import SwapiService from '../../services/swapi-service';
import { GenreConsumer } from '../genreContext';

export default class ItemList extends Component {
  swapiService = new SwapiService();
  state = {
    loaded: true,
    error: false,
    arr: [],
    page: 1,
    notFound: false,
    s: '',
  };
  err = (err) => {
    console.log(err);
    this.setState({
      loaded: true,
      error: true,
    });
  };
  strSlice(str) {
    return str.split(' ').slice(0, 15).join(' ');
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.UpdeteMovies();
      this.setState({
        loaded: false,
        error: false,
        notFound: false,
      });
    }
    if (this.state.page !== prevState.page) {
      this.UpdeteMovies();
      this.setState({
        loaded: false,
        error: false,
      });
    }
  }
  componentWillUnmount() {
    this.props.updateQuery();
  }

  UpdeteMovies() {
    this.swapiService
      .getAllMovie(this.props.query, this.state.page)
      .then((movie) => {
        if (movie.length === 0) {
          this.setState({
            arr: [],
            loaded: true,
            notFound: true,
          });
        } else {
          this.setState({
            s: this.props.query,
            arr: movie,
            loaded: true,
          });
        }
      })
      .catch(this.err);
  }
  renderGenre(genre, arr) {
    return genre.map(({ id, name }) => {
      for (let i = 0; i < arr.length; i++) {
        if (id === arr[i])
          return (
            <button key={id + 1} className="genre">
              {name}
            </button>
          );
      }
    });
  }
  renderMovie(movies, genres) {
    if (this.state.notFound) {
      return <div className="notFound">Ничего не найдено</div>;
    }
    return movies.map(({ url, name, description, release, id, genre }) => {
      const releaseCheck = release ? format(new Date(release), 'd MMMM yyyy') : 'дата релиза неизвестна';
      return (
        <div key={id} className="column">
          <img className="image" src={`https://image.tmdb.org/t/p/original${url}`} />
          <div className="description-container">
            <h5>{name}</h5>
            <p>{releaseCheck}</p>
            {this.renderGenre(genres, genre)}
            <p className="description">{`${this.strSlice(description)}...`}</p>
            <Rate
              className="rate"
              count="10"
              onChange={(stars) => {
                localStorage.setItem(id, JSON.stringify({ stars, url, name, description, release, id }));
              }}
            />
          </div>
        </div>
      );
    });
  }
  getPage = (number) => {
    this.setState({
      page: number,
    });
  };
  render() {
    const { arr, loaded, error } = this.state;
    const item = loaded && !error ? <GenreConsumer>{(item) => this.renderMovie(arr, item)}</GenreConsumer> : null;
    const spinner = !loaded ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMassege /> : null;
    const pagination = arr.length && !error ? <Paginations getPage={this.getPage} /> : null;
    return (
      <div>
        <div className="row">
          {errorMessage}
          {spinner}
          {item}
        </div>
        {pagination}
      </div>
    );
  }
}
