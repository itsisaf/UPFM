import React, {useState, useEffect} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import SvgIcon from './SvgIcons';
import SystemSetting from 'react-native-system-setting';
import Slider from '@react-native-community/slider';

import Colors from '../Colors';
import Constants from '../Constants';
import TrackPlayer from 'react-native-track-player';

const Volume = props => {
  const [volVisible, setVolVisible] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(1);

  const showVolume = () => {
    setVolVisible(!0);
  };

  const onVolChange = vol => {
    TrackPlayer.setVolume(vol);
    setVolumeLevel(vol);
  };
  return (
    <>
      <TouchableOpacity
        style={{
          height: 35,
          width: 61,
        }}
        onPress={showVolume}
        {...props}>
        <SvgIcon name="volume" />
      </TouchableOpacity>
      {volVisible == 1 && (
        <TouchableOpacity activeOpacity={1} style={styles.modal}>
          <SvgIcon name="bottomModal" />
          <TouchableOpacity
            style={styles.buttonA}
            onPress={() => {
              setVolVisible(0);
            }}>
            <SvgIcon name="cross" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonB}>
            <Slider
              value={volumeLevel}
              thumbTintColor={Colors.coquelicot}
              minimumTrackTintColor={Colors.coquelicot}
              maximumTrackTintColor={Colors.coquelicot}
              sliderHeight={2}
              sliderWidth={Constants.Dimension.ScreenWidth() - 50}
              thumbButtonSize={21}
              onValueChange={onVolChange}
              disabledHoverEffect={false}
              style={{width: '90%'}}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    height: 217,
    bottom: 0,
    left: 0,
    elevation: 1,
    zIndex: 1,
    width: Constants.Dimension.ScreenWidth(),
  },
  buttonA: {
    position: 'absolute',
    bottom: 137,
    right: 37,
    width: 20,
    height: 20,
  },
  buttonB: {
    bottom: 99,
    alignItems: 'center',
  },
});

export default Volume;
