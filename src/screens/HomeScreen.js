/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  LogBox,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {MultiplyBlendColor} from 'react-native-image-filter-kit';
import SvgIcon from '../Components/SvgIcons';
import Menu from '../Components/Menu';
import {PlayerControls} from '../Components';
import {WebSocketService} from '../services';
import Volume from '../Components/Volume';
import RecentSongs from '../Components/RecentSongs';
import SongTitle, {
  DJName,
  ArtImage,
  Genre,
  DurationProgress,
} from '../Components/SongInfo';
import Images from '../Images';
import Colors from '../Colors';
import Constants from '../Constants';

LogBox.ignoreAllLogs();

const HomeScreen = ({navigation}) => {
  WebSocketService();

  const showChat = () => {
    navigation.navigate('webV', {action: 'chat'});
  };

  return (
    <TouchableOpacity activeOpacity={1} style={styles.mainContainer}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <MultiplyBlendColor
        dstImage={<Image style={styles.bgImage} source={Images.background} />}
        srcColor={Colors.coquelicot}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        colors={[Colors.zinnwalditeBrown_0, Colors.zinnwalditeBrown_1]}
        style={styles.linearGradient}
      />

      <View style={styles.topCont}>
        <TouchableOpacity
          onPress={showChat}
          style={{
            flex: 0.3626,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <SvgIcon name="chat" style={{marginLeft: 26}} />
        </TouchableOpacity>
        <View
          style={{
            flex: 0.2746,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <SvgIcon width={101} height={81} name="logo" />
        </View>
        <Menu navigation={navigation} />
      </View>

      <View style={styles.middleCont}>
        <View style={{flexDirection: 'row', height: '100%'}}>
          <View
            style={{
              width: '25%',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                width: Constants.Dimension.ScreenHeight(0.4265),
                transform: [
                  {rotate: '270deg'},
                  {translateY: -Constants.Dimension.ScreenHeight(0.113)},
                  {translateX: Constants.Dimension.ScreenHeight(0.2)},
                ],
              }}>
              <Genre />
            </View>
          </View>
          <View style={{width: '50%'}}>
            <ArtImage />
          </View>
        </View>
      </View>

      <View style={styles.bottomUpCont}>
        <DJName />
      </View>

      <View style={styles.bottomCont}>
        <View style={styles.bottomContA}>
          <SongTitle />
        </View>
        <DurationProgress />

        <View style={styles.bottomContB}>
          <RecentSongs style={styles.list} />
          <PlayerControls style={styles.play} />
          <Volume style={styles.volume} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.coquelicot,
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: Constants.Dimension.ScreenHeight(0.3165),
    bottom: 0,
  },
  topCont: {
    position: 'absolute',
    width: '100%',
    height: Constants.Dimension.ScreenHeight(0.13783) - StatusBar.currentHeight,
    top: StatusBar.currentHeight + (Platform.OS === 'ios' ? 45 : 15),
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 1,
    zIndex: 1,
  },

  middleCont: {
    position: 'absolute',
    width: '100%',
    height: Constants.Dimension.ScreenHeight(0.4265),
    bottom: Constants.Dimension.ScreenHeight(0.3565),
    justifyContent: 'flex-end',
  },
  bottomCont: {
    position: 'absolute',
    width: '100%',
    height: Constants.Dimension.ScreenHeight(0.3165),
    bottom: 0,
    flex: 1,
  },

  bottomContA: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bottomContB: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  bottomUpCont: {
    position: 'absolute',
    width: '100%',
    height: Constants.Dimension.ScreenHeight(0.05),
    bottom: Constants.Dimension.ScreenHeight(0.3065),
    textAlign: 'center',
  },

  list: {
    marginLeft: 20,
  },
  play: {},
  volume: {
    marginRight: 20,
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  bgOverlay: {
    backgroundColor: Colors.coquelicot,
    width: '100%',
    height: '100%',
  },
  redHLine: {
    borderBottomWidth: 2,
    borderColor: Colors.coquelicot,
  },
});

export default HomeScreen;
