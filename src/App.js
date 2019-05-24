import React, { Component } from "react";
import MovieRow from "./MovieRow.js";
import "./App.css";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.performSearch("ant");
  }

  performSearch(search) {
    const urlString =
      "https://api.themoviedb.org/3/search/movie?api_key=c445fe1b184998da434a74f867259d8e&language=en-US&query=" +
      search +
      "&page=1&include_adult=false";
    $.ajax({
      url: urlString,
      success: searchResults => {
        console.log("success");
        const results = searchResults.results;
        var movieRows = [];
        results.forEach(movie => {
          console.log(movie.poster_path);
          movie.poster_src =
            "https://image.tmdb.org/t/p/w185" + movie.poster_path;
          const movieRow = <MovieRow movie={movie} />;
          movieRows.push(movieRow);
        });
        this.setState({ row: movieRows });
      },
      error: (xhr, status, err) => console.error("failed to fetch")
    });
  }
  searchchangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    boundObject.performSearch(event.target.value);
  }
  render() {
    return (
      <div className="App">
        <table className="titlebar">
          <tbody>
            <tr>
              <td>
                <img alt="app-logo" width="50" src="logo.png" />
              </td>
              <td width="8" />
              <td>MovieDB </td>
            </tr>
          </tbody>
        </table>
        <input
          placeholder="search"
          style={{
            fontSize: 24,
            display: "block",
            width: "99%",
            paddingTop: 10,
            paddingBottom: 8,
            paddingLeft: 16
          }}
          onChange={this.searchchangeHandler.bind(this)}
        />
        {this.state.row}
      </div>
    );
  }
}

export default App;
