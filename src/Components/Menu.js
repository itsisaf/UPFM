import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
  Easing,
  Text,
  Platform,
  StatusBar,
  Linking,
} from 'react-native';

import SvgIcon from '../Components/SvgIcons';
import Colors from '../Colors';
import Constants from '../Constants';

const chatUrl =
  'https://chat.upfm.co.nz/embed/474247737798426644?username=Live-Listener';
const supportUrl = 'https://upfm.co.nz/support/';
const timetbleUrl = 'https://upfm.co.nz/showtimes/';
const eventsUrl = 'https://upfm.co.nz/info/';

const Menu = props => {
  const [menuVisible, setMenuVisible] = useState(0);
  const [moveranim, setMoverAnim] = useState(
    new Animated.Value(+Constants.Dimension.ScreenWidth()),
  );

  const hideMenu = () => {
    Animated.timing(moveranim, {
      toValue: +Constants.Dimension.ScreenWidth(),
      duration: 250,
      easing: Easing.circle,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(0);
    });
  };

  const naviGate = url => {
    hideMenu();
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
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
                naviGate(chatUrl);
              }}>
              {' '}
              LIVE Chat
            </Text>
            <Text
              style={styles.menuItems}
              onPress={() => {
                naviGate(supportUrl);
              }}>
              {' '}
              Support Us
            </Text>
            <Text
              style={styles.menuItems}
              onPress={() => {
                naviGate(timetbleUrl);
              }}>
              {' '}
              Show Timetable
            </Text>
            <Text
              style={styles.menuItems}
              onPress={() => {
                naviGate(eventsUrl);
              }}>
              {' '}
              Events
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
    width: Constants.Dimension.ScreenWidth(0.816),
    height: Constants.Dimension.ScreenHeight(),
    right: 0,
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
    width: 47,
    height: 47,
  },
});

export default Menu;
