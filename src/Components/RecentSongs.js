import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SectionList,
} from 'react-native';
import SvgIcon from './SvgIcons';
import SystemSetting from 'react-native-system-setting';
import Slider from '@react-native-community/slider';

import Colors from '../Colors';
import Constants from '../Constants';
import {useSelector} from 'react-redux';

const RecentSongs = props => {
  const [recentVisible, setRecentVisible] = useState(0);

  const songInfo = useSelector(state => state.songinfo.si);

  const showRecentSongs = () => {
    setRecentVisible(!0);
  };
  return (
    <>
      <TouchableOpacity
        style={{height: 35, width: 61}}
        onPress={showRecentSongs}
        {...props}>
        <SvgIcon name="list" />
      </TouchableOpacity>
      {recentVisible == 1 && (
        <TouchableOpacity activeOpacity={1} style={styles.recentmodal}>
          <SvgIcon name="recentModal" />
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 289,
              right: 37,
              width: 20,
              height: 20,
            }}
            onPress={() => {
              setRecentVisible(0);
            }}>
            <SvgIcon name="cross" />
          </TouchableOpacity>
          <View
            style={{
              bottom: 290,
              paddingHorizontal: 25,
            }}>
            <Text
              style={{
                position: 'absolute',
                bottom: 240,
                fontSize: Constants.fontSize.big,
                color: 'white',
                left: 25,
                width: 200,
              }}>
              Recently Played
            </Text>
            <SectionList
              sections={[{data: songInfo.song_history}]}
              renderItem={({item, index}) => (
                <View>
                  <Text style={styles.recentSongs}>{item}</Text>
                  {index !== 4 && (
                    <View
                      style={{
                        borderBottomColor: Colors.coquelicot,
                        borderBottomWidth: 1,
                      }}
                    />
                  )}
                </View>
              )}
              renderSectionHeader={({section}) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
              )}
              keyExtractor={(item, index) => `basicListEntry-${item.title}`}
            />
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  recentmodal: {
    position: 'absolute',
    height: 341,
    bottom: 0,
    left: 0,
    elevation: 1,
    zIndex: 1,
    width: Constants.Dimension.ScreenWidth(),
  },
  recentSongs: {
    color: Colors.white,
    paddingVertical: 14,
  },
});

export default RecentSongs;
