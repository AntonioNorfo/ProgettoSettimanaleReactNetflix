import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const chunkedMovies = [];
    for (let i = 0; i < movies.length; i += 6) {
      chunkedMovies.push(movies.slice(i, i + 6));
    }

    return (
      <div className="gallery">
        <h2>{title}</h2>
        <Carousel controls={true} indicators={false} interval={null}>
          {chunkedMovies.map((movieChunk, index) => (
            <Carousel.Item key={index}>
              <div className="row">
                {movieChunk.map((movie) => (
                  <div className="col-md-2" key={movie.imdbID}>
                    <div className="card">
                      <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                    </div>
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
