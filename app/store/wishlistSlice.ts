import {createSlice} from '@reduxjs/toolkit';

export type iWishList = {
  id: string;
  title: string;
  img_poster: string;
};

export type InitialState = iWishList[];

const initialState: InitialState = [];

const tasksSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    movieAdded(state, action) {
      const movie = action.payload;
      state.push(movie);
    },
    moviewDelete(state, action) {
      state.splice(state.findIndex(v => v.id === action.payload), 1);
    },
    resetMovie(state) {
      state = initialState;
    },
  },
});

export const { movieAdded, moviewDelete, resetMovie } = tasksSlice.actions;

export default tasksSlice.reducer;
