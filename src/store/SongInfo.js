import {createSlice} from '@reduxjs/toolkit';

const SiSlice = createSlice({
  name: 'SI',
  initialState: {
    si: {
      title: 'UpFM.co.nz',
      duration: 0,
      elapsed: 0,
      played_at: 0,
      art: '',
      artwork: '',
      album: '',
      artist: '',
      playlist: '',
      text: '',
      song_history: [],
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
