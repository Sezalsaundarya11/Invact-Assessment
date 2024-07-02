import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  movies: [],
  status: 'idle',
  error: null,
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get('http://localhost:5000/movies');
  return response.data;
});

export const addMovie = createAsyncThunk('movies/addMovie', async (newMovie) => {
  const response = await axios.post('http://localhost:5000/movies', newMovie);
  return response.data;
});

export const updateMovie = createAsyncThunk('movies/updateMovie', async (updatedMovie) => {
  const response = await axios.put(`http://localhost:5000/movies/${updatedMovie.id}`, updatedMovie);
  return response.data;
});

export const deleteMovie = createAsyncThunk('movies/deleteMovie', async (movieId) => {
  await axios.delete(`http://localhost:5000/movies/${movieId}`);
  return movieId;
});

export const toggleWatchStatus = createAsyncThunk('movies/toggleWatchStatus', async ({ id, watched }) => {
  const response = await axios.patch(`http://localhost:5000/movies/${id}`, { watched });
  return response.data;
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload);
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex((movie) => movie.id === action.payload.id);
        state.movies[index] = action.payload;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter((movie) => movie.id !== action.payload);
      })
      .addCase(toggleWatchStatus.fulfilled, (state, action) => {
        const index = state.movies.findIndex((movie) => movie.id === action.payload.id);
        state.movies[index].watched = action.payload.watched;
      });
  },
});

export default moviesSlice.reducer;
