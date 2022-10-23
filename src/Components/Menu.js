import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Easing,
  Text,
  Linking,
  Platform,
  StatusBar,
  Share,
} from 'react-native';
import Rate, {AndroidMarket} from 'react-native-rate';

import SvgIcon from '../Components/SvgIcons';
import Colors from '../Colors';
import Constants from '../Constants';

const Menu = props => {
  const [menuVisible, setMenuVisible] = useState(0);
  const [moveranim, setMoverAnim] = useState(
    new Animated.Value(-Constants.Dimension.ScreenWidth()),
  );
  // const {moveranim, visible, setMenuVisible} = props;

  const GOOGLE_PACKAGE_NAME = 'nz.co.upfm';
  const APPLE_STORE_ID = 'id2193813192';

  const hideMenu = () => {
    Animated.timing(moveranim, {
      toValue: -Constants.Dimension.ScreenWidth(),
      duration: 250,
      easing: Easing.circle,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(0);
    });
  };

  const naviGate = action => {
    hideMenu();
    if (!props.isChat) {
      props.navigation.navigate('webV', {action: action});
    } else {
      props.setAction(action);
      props.setBufferVisible(!0);
    }
  };
  const showMenu = () => {
    setMenuVisible(!0);
    Animated.timing(moveranim, {
      toValue: 0,
      duration: 250,
      easing: Easing.circle,
      useNativeDriver: true,
    }).start();
  };

  const openStore = () => {
    const options = {
      AppleAppID: APPLE_STORE_ID,
      GooglePackageName: GOOGLE_PACKAGE_NAME,
      preferredAndroidMarket: AndroidMarket.Google,
      preferInApp: true,
      openAppStoreIfInAppFails: true,
      fallbackPlatformURL: 'https://upfm.co.nz/info/',
    };
    Rate.rate(options, (success, errorMessage) => {
      if (success) {
        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
        console.log('went to store');
      }
      if (errorMessage) {
        // errorMessage comes from the native code. Useful for debugging, but probably not for users to view
        console.error(`Example page Rate.rate() error: ${errorMessage}`);
      }
    });
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'UpFM',
        message: 'Here I found an amazing Radio FM Application',
        url:
          'https://play.google.com/store/apps/details?id=' +
          GOOGLE_PACKAGE_NAME,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={showMenu}
        style={{
          flex: 0.3626,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <SvgIcon name="menu" style={{marginRight: 26}} />
      </TouchableOpacity>
      {menuVisible == 1 && (
        <Animated.View
          {...props}
          style={[{transform: [{translateX: moveranim}]}, styles.menuOverlay]}>
          <TouchableOpacity style={styles.closeIcon} onPress={hideMenu}>
            <SvgIcon name="cross" color={Colors.coquelicot} stw={3} />
          </TouchableOpacity>
          <View>
            <Text
              style={styles.menuItems}
              onPress={() => {
                naviGate('chat');
              }}>
              {' '}
              LIVE Chat
            </Text>
            <Text
              style={styles.menuItems}
              onPress={() => {
                naviGate('support');
              }}>
              {' '}
              Support Us
            </Text>
            <Text
              style={styles.menuItems}
              onPress={() => {
                naviGate('timetable');
              }}>
              {' '}
              Show Timetable
            </Text>
            <Text
              style={styles.menuItems}
              onPress={() => {
                naviGate('events');
              }}>
              {' '}
              Events
            </Text>
            <Text style={styles.menuItems} onPress={openStore}>
              {' '}
              Rate App
            </Text>
            <Text style={styles.menuItems} onPress={onShare}>
              {' '}
              Share
            </Text>
          </View>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  menuOverlay: {
    top: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,
    position: 'absolute',
    width: Constants.Dimension.ScreenWidth(),
    height: Constants.Dimension.ScreenHeight(),
    backgroundColor: Colors.zinnwaldite,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  menuItems: {
    color: Colors.coquelicot,
    fontSize: Constants.fontSize.huge,
    marginRight: 38,
    lineHeight: 35,
    marginBottom: 23,
    alignSelf: 'flex-end',
  },
  closeIcon: {
    position: 'absolute',
    top: 64,
    right: 37,
    width: 20,
    height: 20,
  },
});

export default Menu;
