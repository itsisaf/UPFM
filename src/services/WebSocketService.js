// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSI} from '../store/SongInfo';

const socketURL = 'wss://stream.upfm.live/api/live/nowplaying/up_fm';

export const WebSocketService = () => {
  const [socketUp, setSocketUp] = useState(0);
  const dispatch = useDispatch();

  if (!socketUp) {
    let socket = new WebSocket(socketURL);
    socket.onopen = () => {
      console.log('Socket connected');
      setSocketUp(!0);
      return true;
    };
    socket.onmessage = event => {
      let data = JSON.parse(event.data);

      dispatch(
        setSI({
          title: data.now_playing.song.title,
          duration: parseInt(data.now_playing.duration),
          elapsed: parseInt(data.now_playing.elapsed),
          played_at: parseInt(data.now_playing.played_at),
          art: data.now_playing.song.art,
          artwork: data.now_playing.song.art,
          album: data.now_playing.song.album,
          artist: data.now_playing.song.artist,
          genre: data.now_playing.song.genre,
          text: data.now_playing.song.text,
          song_history: data.song_history.map(i => {
            return i.song.title;
          }),
        }),
      );
    };
  }
};
