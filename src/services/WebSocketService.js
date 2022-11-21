// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setSI} from '../store/SongInfo';
import TrackPlayer from 'react-native-track-player';

import {AddStream, SetupService} from '../services';

const socketURL = 'wss://stream.upfm.live/api/live/nowplaying/up_fm';
import {store} from '../store';

let rsi = {};
store.subscribe(() => {
  rsi = store.getState().songinfo.si;
});

export const WebSocketService = () => {
  const [socketUp, setSocketUp] = useState(0);
  // const [streamAdded, setStreamAdded] = useState(0);
  const dispatch = useDispatch();
  SetupService().then(() => {
    run();
  });

  async function run() {
    const queue = await TrackPlayer.getQueue();
    if (queue.length <= 0) {
      await AddStream();
    }
  }

  if (!socketUp) {
    let socket = new WebSocket(socketURL);
    socket.onopen = () => {
      console.log('Socket connected');

      setSocketUp(!0);
      return true;
    };
    socket.onmessage = event => {
      let data = JSON.parse(event.data);
      let trackData = {
        title: data.now_playing.song.title,
        duration: parseInt(data.now_playing.duration),
        elapsed: parseInt(data.now_playing.elapsed),
        played_at: parseInt(data.now_playing.played_at),
        art: data.now_playing.song.art,
        artwork: data.now_playing.song.art,
        album: data.now_playing.song.album,
        artist: data.now_playing.song.artist,
        playlist: data.now_playing.song.playlist,
        text: data.now_playing.song.text,
        song_history: data.song_history.map(i => {
          return i.song.title;
        }),
      };

      if (rsi?.title != trackData?.title) {
        dispatch(setSI(trackData));
      }
    };
  }
};
