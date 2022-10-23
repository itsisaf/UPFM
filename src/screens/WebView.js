import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import SvgIcon from '../Components/SvgIcons';
import Menu from '../Components/Menu';
import Spinner from '../Components/Spinner';

import Colors from '../Colors';
import Constants from '../Constants';

const MyWebView = ({route, navigation}) => {
  const [bufferVisible, setBufferVisible] = useState(1);
  const [currentURL, setCurrentURL] = useState('');

  const chatUrl =
    'https://chat.upfm.co.nz/embed/474247737798426644?username=Live-Listener';
  const supportUrl = 'https://upfm.co.nz/support/';
  const timetbleUrl = 'https://upfm.co.nz/showtimes/';
  const eventsUrl = 'https://upfm.co.nz/info/';
  const [action, setAction] = useState(route.params.action);
  const [prevAct, setPrevAct] = useState('');

  useEffect(() => {
    switch (action) {
    case 'chat': {
      setCurrentURL(chatUrl);
      break;
    }
    case 'support': {
      setCurrentURL(supportUrl);
      break;
    }
    case 'timetable': {
      setCurrentURL(timetbleUrl);
      break;
    }
    case 'events': {
      setCurrentURL(eventsUrl);
      break;
    }
    }
    if (action == prevAct) {
      setBufferVisible(0);
    }
    setPrevAct(action);
  }, [action, bufferVisible]);

  return (
    <>
      <View style={{backgroundColor: Colors.zinnwaldite, zIndex: 1}}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <View style={styles.topCont}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.topBack}>
            <SvgIcon
              name="backArrow"
              height={44}
              width={44}
              style={{marginLeft: 26}}
            />
          </TouchableOpacity>
          <View style={styles.topLogo}>
            <SvgIcon width={101} height={81} name="logo" />
          </View>
          <Menu
            isChat={true}
            setAction={setAction}
            setBufferVisible={setBufferVisible}
          />
        </View>
      </View>
      <WebView
        onLoad={() => setBufferVisible(0)}
        style={styles.webview}
        source={{uri: currentURL}}
      />
      {bufferVisible == 1 && (
        <View
          style={{
            position: 'absolute',
            top: Constants.Dimension.ScreenHeight(0.49),
            alignItems: 'center',
            width: '100%',
          }}>
          <Spinner />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  topCont: {
    // position: 'absolute',
    width: Constants.Dimension.ScreenWidth(),
    height:
      Constants.Dimension.ScreenHeight(0.19783) +
      (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 15),
    // top:
    //   Platform.OS === 'ios'
    //     ? StatusBar.currentHeight + (Platform.OS === 'ios' ? 45 : 15)
    //     : 0,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.zinnwaldite,
    paddingTop: 55,
  },
  webview: {
    // top: StatusBar.currentHeight + Constants.Dimension.ScreenHeight(0.19783),
    // position: 'absolute',
    // height:
    //   Constants.Dimension.ScreenHeight(0.80217) -
    //   303 -
    //   (Platform.OS === 'ios' ? 0 : StatusBar.currentHeight + 15),
    width: Constants.Dimension.ScreenWidth(),
  },

  topLogo: {
    flex: 0.2746,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBack: {
    flex: 0.3626,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default MyWebView;
