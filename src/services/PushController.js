const PushNotification = require('react-native-push-notification');
import firebase from '@react-native-firebase/app';
import {Platform} from 'react-native';

export function PushController(handleNotification) {
  PushNotification.configure({
    onNotification: function (notification) {
      handleNotification(notification);
    },
    // (optional) Called when Token is generated (iOS and Android)
    // onRegister: function (token) {
    // console.log('TOKEN:', token);
    // },
    senderID: '111773939608',
    permissions: {
      alert: true,
      // badge: true,
      // sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });

  PushNotification.createChannel(
    {
      channelId: 'upfm_notifchannel',
      channelName: 'My channel',
      channelDescription: 'A channel to show notifications',
      playSound: false,
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );

  return PushNotification;
}

export const subscribeTopic = async topic => {
  firebase
    .messaging()
    .subscribeToTopic(topic)
    .then(() => console.log('Subscribed to topic:', topic))
    .catch(e => {
      console.log(e);
    });
};
