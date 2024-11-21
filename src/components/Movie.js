const Movie = ({ movie }) => {
  return (
    <div className="card bg-info" style={{ width: "200px" }}>
      <img src={movie.Poster} className="card-img-top h-75" alt={movie.Title} />
      <div className="card-body d-flex justify-content-center align-items-center py-0">
        <h6 className="card-text text-light text-center">{movie.Title}</h6>
      </div>
    </div>
  );
};

export default Movie;
