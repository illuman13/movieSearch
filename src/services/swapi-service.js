export default class SwapiService {
  _apiBace = 'https://swapi.dev/api';
  _apiKey = 'b5681bcf45d8df282a78a6a6c73485e5';
  async getResourceMovie(query, page) {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=b5681bcf45d8df282a78a6a6c73485e5&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    if (!res.ok) {
      throw new Error('error');
    }
    return await res.json();
  }
  async getAllMovie(query, page) {
    const res = await this.getResourceMovie(query, page);
    return res.results.map(this.getMovieInfo);
  }
  async getResourceGenre() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this._apiKey}&language=en-US`);
    if (!res.ok) {
      throw new Error('error');
    }
    return await res.json();
  }
  async getAllGenre() {
    const res = await this.getResourceGenre();
    return res.genres;
  }
  async getResource(url) {
    const res = await fetch(`${this._apiBace}${url}`);
    if (!res.ok) {
      throw new Error('error');
    }
    return await res.json();
  }
  async getAllPlanets() {
    const res = await this.getResource('/planets/');
    return res.results;
  }
  getMovieInfo(movie) {
    return {
      genre: movie.genre_ids,
      id: movie.id,
      url: movie.backdrop_path,
      name: movie.original_title,
      description: movie.overview,
      release: movie.release_date,
    };
  }
}
