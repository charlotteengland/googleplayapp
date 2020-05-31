import React, { Component } from 'react';
import AppDetail from './app/appdetail';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      search: '',
      sort: '',
      genres:'',
      error: null
    }
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setSort(sort) {
    this.setState({
      sort
    });
  }

  setGenre(genres) {
    this.setState({
      genres
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if (this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if (this.state.sort) {
      params.push(`sort=${this.state.sort}`);
    }

    if (this.state.genres) {
      params.push(`genres=${this.state.genres}`);
    }

    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          apps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get books at this time.'
        });
      })

  }



  render() {
    //map over all the appdeails
    const apps = this.state.apps.map((app, i) => {
      return <AppDetail {...app} key={i}/>
    })
    return (
      <main className="App">
        <h1>Top Google Apps</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search: </label>
            <input
              type="text"
              id="search"
              name="search"
              value={this.state.search}
              onChange={e => this.setSearch(e.target.value)}/>

            <label htmlFor="sort">Sort: </label>
            <select id="sort" name="sort" onChange={e => this.setSort(e.target.value)}>
              <option value="">None</option>
              <option value="review">Rating</option>
              <option value="rating">Review</option>
            </select>
            <label htmlFor="genre"> Genre: </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={this.state.genre}
              onChange={e => this.setGenre(e.target.value)}/>
            <button type="submit">Search</button>
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {apps}
      </main>
    );
  }
}

export default App;