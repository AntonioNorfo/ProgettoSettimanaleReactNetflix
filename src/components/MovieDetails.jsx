import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log(`Fetching movie details for ID: ${movieId}`);
        const response = await fetch(`http://www.omdbapi.com/?apikey=7cd45db2&i=${movieId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchComments = async () => {
      try {
        console.log(`Fetching comments for movie ID: ${movieId}`);
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${movieId}`, {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNmMzRhNDAwOGQxMDAwMTVkZDNiNWQiLCJpYXQiOjE3MjQ4NTU0NjEsImV4cCI6MTcyNjA2NTA2MX0.xiYC9ZlvQ3ZqAWlGgsfT0LQrCpTAYm_lRsG7RcUqcUU`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovieDetails();
    fetchComments();
    setLoading(false);
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {movie && (
        <div>
          <h1>{movie.Title}</h1>
          <p>{movie.Plot}</p>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      )}
      <div>
        <h2>Comments</h2>
        {comments.length > 0 ? (
          comments.map((comment, index) => <p key={index}>{comment}</p>)
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
