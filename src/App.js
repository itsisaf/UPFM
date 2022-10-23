/**
 * UPFM React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MyWebView from './screens/WebView';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/messaging';
import {PushController, subscribeTopic} from './services/PushController';

const Stack = createNativeStackNavigator();

const App = () => {
  const _handleNotificationOpen = () => {
    // console.log('i am handling notification');
  };

  let pushNotif = PushController(_handleNotificationOpen);

  useEffect(() => {
    subscribeTopic('upfm_live');
  }, []);

  async function getCurrentToken() {
    let token, retry;
    try {
      token = await firebase.messaging().getToken();
      // console.log('tocken : ', token);
    } catch (error) {
      if (error.code !== 'messaging/unregistered') {
        throw error;
      }
      retry = true;
    }
    if (retry) {
      try {
        // console.log('requesting permission');
        await firebase.messaging().requestPermission(); // IMPORTANT!
        await firebase.messaging().registerDeviceForRemoteMessages(); // IMPORTANT!
        token = await firebase.messaging().getToken();
      } catch (error) {
        throw error;
      }
    }
    return token;
  }

  const onMessage = () => {
    firebase.messaging().onMessage(response => {
      showNotification(response.notification);
    });
  };

  const showNotification = notification => {
    // console.log('Showing notification');
    console.log(JSON.stringify(notification));
    pushNotif.localNotification({
      title: notification.title,
      message: notification.body,
      channelId: 'upfm_notifchannel',
      priority: 'high',
    });
  };
  getCurrentToken();
  onMessage();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="webV" component={MyWebView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
