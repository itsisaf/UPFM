/**
 * Created by InspireUI on 20/12/2016.
 *
 * @format
 */

import {Dimensions} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';

const {width, height} = Dimensions.get('window');

export const UPDATE_SONGINFO = 'UPDATE_SONGINFO';

const Constants = {
  fontSize: {
    XSTiny: RFPercentage(0.7), //8
    STiny: RFPercentage(0.8), //10
    MTiny: RFPercentage(1.2), //??
    tiny: RFPercentage(1.7), // 12
    tinyP: RFPercentage(1.8), //13
    small: RFPercentage(1.9), //14
    SNormal: RFPercentage(2.1), //15
    normal: RFPercentage(2.2), // was 16 but set to 15
    SMedium: RFPercentage(2.3), //17
    medium: RFPercentage(2.4), //18
    large: RFPercentage(2.6), //20
    extraLarge: RFPercentage(2.8), //24
    big: RFPercentage(3.0), //??
    huge: RFPercentage(4.0), // 40
  },
  //   VIEWS: {
  //     LIST: {
  //       index: 0,
  //       cols: 1,
  //     },
  //     GRID: {
  //       index: 1,
  //       cols: 3,
  //     },
  //     CARD: {
  //       index: 2,
  //       cols: 1,
  //     },
  //   },
  //   ICONS: ['list', 'grid', 'card'],
  Dimension: {
    ScreenWidth(percent = 1) {
      return Dimensions.get('window').width * percent;
    },
    ScreenHeight(percent = 1) {
      return Dimensions.get('window').height * percent;
    },
  },

  Window: {
    width,
    height,
    headerHeight: (65 * height) / 100,
    headerBannerAndroid: (55 * height) / 100,
    profileHeight: (45 * height) / 100,
  },

  fontFamily: {
    Roboto: 'Roboto',
    RobotoBlack: 'Roboto-Black',
    RobotoBlackItalic: 'Roboto-BlackItalic',
    RobotoBold: 'Roboto-Bold',
    RobotoBoldItalic: 'Roboto-BoldItalic',
    RobotoItalic: 'Roboto-Italic',
    RobotoLight: 'Roboto-Light',
    RobotoLightItalic: 'Roboto-LightItalic',
    RobotoMedium: 'Roboto-Medium',
    RobotoMediumItalic: 'Roboto-MediumItalic',
    RobotoRegular: 'Roboto-Regular',
    RobotoThin: 'Roboto-Thin',
    RobotoThinItalic: 'Roboto-ThinItalic',
    TruenoRg: 'TruenoRg',
    TruenoLt: 'TruenoLt',
    TruenoBd: 'TruenoBd',
    TruenoSBd: 'TruenoSBd',
  },
};
export default Constants;
