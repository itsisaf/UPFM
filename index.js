/**
 * @format
 */

import React from 'react';
import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import TrackPlayer from 'react-native-track-player';
import {PlaybackService} from './src/services';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/store/index.js';

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);

TrackPlayer.registerPlaybackService(() => PlaybackService);
