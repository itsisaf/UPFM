import {configureStore} from '@reduxjs/toolkit';
import SiReducer from './SongInfo';

export const store = configureStore({
  reducer: {
    songinfo: SiReducer,
  },
});
