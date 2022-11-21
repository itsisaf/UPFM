import TrackPlayer from 'react-native-track-player';
import {store} from '../store';

let rsi = {};
store.subscribe(() => {
  rsi = store.getState().songinfo.si;
  try {
    TrackPlayer.getCurrentTrack().then(index => {
      index == 0 && TrackPlayer.updateMetadataForTrack(index, rsi);
      // console.log(' updating metadata in subscribe');
    });
  } catch (e) {
    console.warn(e);
  }
});

export const AddStream = (ap = 0) => {
  // TrackPlayer.play();
  return TrackPlayer.add(
    {
      url: 'https://stream.upfm.live/radio/8000/radio.mp3',
      // url: 'https://whmsonic.radio.gov.pk:7002/stream?type=http&nocache=12',
      ...rsi,
    },
    0,
  ).then(() => {
    // console.log(' song added');
    if (ap) {
      TrackPlayer.skip(0).then(() => {
        // console.log(' skipped to 0 . ');
        TrackPlayer.play();
        TrackPlayer.removeUpcomingTracks();
        // TrackPlayer.updateMetadataForTrack(0, rsi).then(() => {
        //   console.log(' updating metadata in callback');
        //   TrackPlayer.play();
        //   TrackPlayer.removeUpcomingTracks();
        // });
      });
    }
  });
};
