import React, {useEffect, useState} from 'react';
import {Animated, Easing} from 'react-native';
import SvgIcon from '../Components/SvgIcons';

export const Spinner = () => {
  const [spinValue, setSpinValue] = useState(new Animated.Value(0));
  useEffect(() => {
    initSpinning();
  }, []);

  const initSpinning = () => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
        isInteraction: false,
      }),
    ).start();
  };
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{transform: [{rotate: spin}]}}>
      <SvgIcon name="buffering" />
    </Animated.View>
  );
};

export default Spinner;
