import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import TVShows from "./components/TvShows";
import MovieDetails from "./components/MovieDetails";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container-fluid mt-4 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/movie-details/:movieId" element={<MovieDetails />} />
          <Route path="/movies" element={<MovieDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

const Home = () => (
  <div>
    <Gallery title="Marvel" query="marvel" />
    <Gallery title="Harry Potter" query="harry potter" />
    <Gallery title="Lord of the Rings" query="Lord of the rings" />
  </div>
);

export default App;
