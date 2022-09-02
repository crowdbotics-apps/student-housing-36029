import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNVideoPlayer from '../components/RNVideoPlayer';

export default function VideoPlayerScreen() {
    const route = useRoute();
    const video = route.params?.video; 

    return (
          <SafeAreaView style={styles.container}>
            <RNVideoPlayer
              source={{ uri: video.url }}
              style={styles.videoPlayer}
              title={video.title}              
            />
          </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  videoPlayer: {
    backgroundColor: '#000',
    flex: 1,
    paddingVertical: 10
  },

})