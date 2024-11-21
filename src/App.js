import React, { useReducer, useEffect } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import Movie from "./components/Movie";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const initialState = {
  movies: [],
  loading: false,
  error: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, movies: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: "Movies not found" };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchMovies = async (query = "Naruto") => {
    dispatch({ type: "FETCH_START" });
    try {
      const response = await fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === "True") {
        dispatch({ type: "FETCH_SUCCESS", payload: data.Search });
      } else {
        dispatch({ type: "FETCH_ERROR" });
      }
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <nav className="navbar bg-info">
        <div className="container">
          <Header title="MovieAPP" />
          <Search onSearch={fetchMovies} />
        </div>
      </nav>
      <div className="container mb-5">
        <h5 className="mt-5 mb-5">{state.error ? "Movie Is Not Defined" : "Show Your Favorite Movies"}</h5>
        {state.loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="movies d-flex flex-wrap gap-2 justify-content-center">
            {state.movies.map((movie) => (
              <Movie key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
