import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from './redux/moviesSlice';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';

function App() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const movieStatus = useSelector((state) => state.movies.status);

  useEffect(() => {
    if (movieStatus === 'idle') {
      dispatch(fetchMovies());
    }
  }, [movieStatus, dispatch]);

  return (
    <div className="App">
      <h1>Movie Watchlist</h1>
      <AddMovieForm />
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
