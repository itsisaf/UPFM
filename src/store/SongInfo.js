import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const SiSlice = createSlice({
  name: 'SI',
  initialState: {
    si: {
      title: 'live',
      duration: 0,
      elapsed: 0,
      played_at: 0,
      art: '',
      artwork: 'artwork',
      album: 'album',
      artist: 'artist',
      genre: 'genre',
      text: 'text',
      song_history: ['A', 'B', 'C'],
    },
  },
  reducers: {
    setSI(state, action) {
      // console.log(action);
      state.si = action.payload;
    },
  },
});

export const {setSI} = SiSlice.actions;
export default SiSlice.reducer;
