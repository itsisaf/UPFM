import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';
import Colors from '../Colors';
import Constants from '../Constants';
import Images from '../Images';

import {useSelector} from 'react-redux';

const SongTitle = props => {
  const title = useSelector(state => state.songinfo.si.title);

  return (
    <>
      <Text style={styles.songName}>{title}</Text>
    </>
  );
};

const DJName = props => {
  const artist = useSelector(state => state.songinfo.si.artist);

  return (
    <>
      <Text style={styles.djname}>{artist}</Text>
    </>
  );
};
const ArtImage = props => {
  const art = useSelector(state => state.songinfo.si.art);

  return (
    <>
      <Image
        style={styles.artThumb}
        resizeMode={'cover'}
        source={art ? {uri: art} : Images.background}
      />
    </>
  );
};

const Genre = props => {
  const genre = useSelector(state => state.songinfo.si.genre);

  return (
    <>
      <Text numberOfLines={1} style={{color: 'white'}}>
        {genre}
      </Text>
    </>
  );
};

const DurationProgress = () => {
  const songInfo = useSelector(state => state.songinfo.si);
  const [songProgress, setSongProgress] = useState(0);
  const [telapsed, setTelapsed] = useState(songInfo?.elapsed);

  useEffect(() => {
    setTelapsed(songInfo?.elapsed);
  }, [songInfo]);

  useEffect(() => {
    let progress = (telapsed / songInfo.duration) * 100;
    if (!isNaN(progress) && progress > 0 && progress <= 100) {
      setSongProgress(progress);
    }
  }, [telapsed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelapsed(telapsed + 2);
    }, 2000);
    return () => clearInterval(interval);
  }, [telapsed]);

  return (
    <View>
      <View style={[styles.redHLine, {width: songProgress + '%'}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  songName: {
    color: 'white',
    marginBottom: 17.5,
  },
  djname: {
    color: Colors.white,
    fontSize: Constants.fontSize.huge,
    textAlign: 'center',
  },
  artThumb: {
    width: '100%',
    height: '95%',
    marginTop: 20,
    resizeMode: 'contain',
  },
  redHLine: {
    borderBottomWidth: 2,
    borderColor: Colors.coquelicot,
  },
});

export default SongTitle;
export {DJName, ArtImage, Genre, DurationProgress};
