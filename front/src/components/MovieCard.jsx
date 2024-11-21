import React from "react";

const MovieCard = ({ imageUrl, title, year, onClick }) => {
  return (
    <div
      className=" bg-card hover:bg-hovercard rounded-lg shadow-lg overflow-hidden sm:p-2 "
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt="movie-image"
        className="w-full max-sm:max-h-[334px] h-[400px] object-cover sm:rounded-xl "
      />
      <div className="bottom-0 text-white gap-2  p-3">
        <h2 className="text-body-large">{title}</h2>
        <p className="text-body-small">{year}</p>
      </div>
    </div>
  );
};

export default MovieCard;
