import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import TrackPlayer, {Event} from 'react-native-track-player';
import {AddStream} from '../services';
import SvgIcon from '../Components/SvgIcons';
import Spinner from '../Components/Spinner';

export const PlayerControls = () => {
  const [pstate, setPstate] = useState('');
  const [autoPlay, setAutoPlay] = useState(0);

  useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackState, event => {
      setPstate(event.state);
    });

    TrackPlayer.addEventListener(Event.RemotePause, () => {
      console.log('Event.RemotePause');
      resetPlayer();
    });

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
      playStream();
    });
  }, []);
  const resetPlayer = () => {
    TrackPlayer.pause();
  };

  const playRadio = () => {
    if (pstate == 'playing') {
      resetPlayer();
    } else {
      playStream();
    }
  };
  async function playStream() {
    setAutoPlay(1);
    AddStream(1);
  }
  const getPlayIcon = () => {
    if (pstate == 'playing') {
      return 'pause';
    } else if (
      pstate == 'buffering' ||
      pstate == 'connecting' ||
      (autoPlay && pstate == 'ready')
    ) {
      return 'buffering';
    } else {
      return 'play';
    }
  };

  return (
    <TouchableOpacity onPress={playRadio}>
      {getPlayIcon() == 'buffering' && <Spinner />}
      {getPlayIcon() !== 'buffering' && <SvgIcon name={getPlayIcon()} />}
    </TouchableOpacity>
  );
};
