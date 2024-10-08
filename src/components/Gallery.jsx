import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const Gallery = ({ title, query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=7cd45db2&s=${query}`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [query]);

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
                  <Link to={`/movie-details/${movie.imdbID}`}>
                    <img src={movie.Poster} alt={movie.Title} />
                  </Link>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
