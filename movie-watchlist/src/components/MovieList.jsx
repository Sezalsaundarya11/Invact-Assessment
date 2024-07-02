import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteMovie, toggleWatchStatus } from '../redux/moviesSlice';

const MovieList = ({ movies }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  const handleToggleWatchStatus = (id, watched) => {
    dispatch(toggleWatchStatus({ id, watched: !watched }));
  };

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <p>{movie.releaseYear}</p>
          <p>{movie.genre}</p>
          <label>
            Watched:
            <input
              type="checkbox"
              checked={movie.watched}
              onChange={() => handleToggleWatchStatus(movie.id, movie.watched)}
            />
          </label>
          <button onClick={() => handleDelete(movie.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
