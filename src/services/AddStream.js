import TrackPlayer from 'react-native-track-player';
import {store} from '../store';

let rsi = {};
store.subscribe(() => {
  rsi = store.getState().songinfo.si;
});

export const AddStream = () => {
  return TrackPlayer.add([
    {
      url: 'https://stream.upfm.live/radio/8000/radio.mp3',
      ...rsi,
      isLiveStream: true,
    },
  ]);
};
