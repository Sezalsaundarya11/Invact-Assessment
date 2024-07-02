import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMovie } from '../redux/moviesSlice';

const AddMovieForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [genre, setGenre] = useState('');
  const [watched, setWatched] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMovie({ title, description, releaseYear, genre, watched }));
    setTitle('');
    setDescription('');
    setReleaseYear('');
    setGenre('');
    setWatched(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Release Year:
        <input
          type="number"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
      </label>
      <label>
        Genre:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </label>
      <label>
        Watched:
        <input
          type="checkbox"
          checked={watched}
          onChange={(e) => setWatched(e.target.checked)}
        />
      </label>
      <button type="submit">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
