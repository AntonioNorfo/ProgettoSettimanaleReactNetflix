import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies() {
    fetch(`http://www.omdbapi.com/?apikey=fe77793b&s=${this.props.query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          this.setState({ movies: data.Search, loading: false });
        } else {
          this.setState({ error: data.Error, loading: false });
        }
      })
      .catch((err) => {
        this.setState({ error: err.message, loading: false });
      });
  }

  render() {
    const { title } = this.props;
    const { movies, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    const chunkedMovies = [];
    for (let i = 0; i < movies.length; i += 6) {
      chunkedMovies.push(movies.slice(i, i + 6));
    }

    return (
      <div className="gallery">
        <h2>{title}</h2>
        <Carousel className="custom-carousel" interval={null} indicators={true}>
          {chunkedMovies.map((movieChunk, index) => (
            <Carousel.Item key={index}>
              <div className="d-flex">
                {movieChunk.map((movie) => (
                  <div key={movie.imdbID} className="col">
                    <img src={movie.Poster} alt={movie.Title} />
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default Gallery;
