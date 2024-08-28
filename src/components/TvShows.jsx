import React from "react";
import LimitedGallery from "./LimitedGallery";

const TVShows = () => {
  return (
    <div className="container">
      <h1 className="text-center">TV Shows</h1>
      <div className="row justify-content-center">
        <div className="col-12">
          <LimitedGallery title="Marvel" query="marvel" limit={2} />
        </div>
        <div className="col-12">
          <LimitedGallery title="Harry Potter" query="harry potter" limit={2} />
        </div>
        <div className="col-12">
          <LimitedGallery title="Lord of the Rings" query="Lord of the rings" limit={2} />
        </div>
      </div>
    </div>
  );
};

export default TVShows;
