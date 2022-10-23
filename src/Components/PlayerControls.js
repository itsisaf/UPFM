import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import TrackPlayer, {Event} from 'react-native-track-player';

import {AddStream, SetupService} from '../services';
import SvgIcon from '../Components/SvgIcons';
import Spinner from '../Components/Spinner';

export const PlayerControls = () => {
  const [pstate, setPstate] = useState('');
  const [autoPlay, setAutoPlay] = useState(0);

  useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackState, event => {
      setPstate(event.state);
    });
  }, []);

  const playRadio = () => {
    if (pstate == 'playing') {
      TrackPlayer.reset();
    } else {
      playStream();
    }
  };
  async function playStream() {
    setAutoPlay(1);
    AddStream().then(() => {
      TrackPlayer.play();
    });
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

  useEffect(() => {
    async function run() {
      const isSetup = await SetupService();

      const queue = await TrackPlayer.getQueue();
      if (isSetup && queue.length <= 0) {
        await AddStream();
      }
    }

    run();
  }, []);

  return (
    <TouchableOpacity onPress={playRadio}>
      {getPlayIcon() == 'buffering' && <Spinner />}
      {getPlayIcon() !== 'buffering' && <SvgIcon name={getPlayIcon()} />}
    </TouchableOpacity>
  );
};
