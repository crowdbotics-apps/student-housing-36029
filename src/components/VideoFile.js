import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import Colors from '../constants/Colors';
import { rf } from '../constants/Constants';
import LatoText from './LatoText';
import { createThumbnail } from "react-native-create-thumbnail";
import { navigate } from '../navigations/NavigationService';

export default function VideoFile({ data, containerStyle, onAdd, onRemove }) {
  
  const [thumbnail, setThumbnail] = useState();
  useEffect(() => {
    if(data && data.uri)
      createThumbnail({
        url: data.uri,
        timeStamp: 1000,
      })
      .then(response => console.log({ response }))
      .catch(err => console.log({ err }));    
  }, [data]);

  if(thumbnail && thumbnail.length)
    return (
      <ImageBackground source={{ uri: thumbnail }} style={containerStyle} resizeMode='cover' onPress={() => navigate('VideoPlayer', { video: data })}>
        <Icon 
          name='close' type='ionicon' 
          size={20} color={Colors.text} 
          containerStyle={{ width:24, height: 24, backgroundColor: '#FFFFFF50', borderRadius:2, position: 'absolute', top:10, right: 10 }} 
          onPress={onRemove}
          />
        <Icon 
          name='play' type='ionicon' 
          size={24} color={Colors.text} 
          containerStyle={{ width: 60, height: 40, backgroundColor: '#FFFFFF70', borderRadius:4 }} 
          />
      </ImageBackground>
    )
  else return (
    <Pressable onPress={onAdd}>
    <View style={{...containerStyle, backgroundColor: '#ededed'}}>
       <Icon 
        name='device-camera-video' type='octicon' 
        size={50} color={'#999'} 
       />
       <View style={{ height: 10 }} />
       <LatoText bold color={'#999'} fontSize={rf(1.6)}>Add Video</LatoText>
    </View>
    </Pressable>
  )
}
const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
})