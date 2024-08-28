import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

const LimitedGallery = ({ title, query, limit }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=7cd45db2&s=${query}`);
        const data = await response.json();
        if (data.Response === "True") {
          setMovies(data.Search.slice(0, limit));
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };

    fetchMovies();
  }, [query, limit]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="gallery">
      <h2 className="text-center my-5 text-danger">{title}</h2>
      <div className="d-flex justify-content-center">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="col-2 mx-5 border border-2 border-danger">
            <Link to={`/movie-details/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} className="img-fluid" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitedGallery;
