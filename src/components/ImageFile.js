import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import Colors from '../constants/Colors';
import { rf } from '../constants/Constants';
import LatoText from './LatoText';

export default function ImageFile({ data, thumbnail, containerStyle, onAdd }) {
  if(thumbnail && thumbnail.length)
    return (
      <ImageBackground source={{ uri: thumbnail }} style={containerStyle} resizeMode='cover'>
        <Icon 
          name='close' type='ionicon' 
          size={20} color={Colors.text} 
          containerStyle={{ width:24, height: 24, backgroundColor: '#FFFFFF50', borderRadius:2, position: 'absolute', top:10, right: 10 }} 
          />
      </ImageBackground>
    )
  else return (
    <Pressable onPress={onAdd}>
    <View style={{...containerStyle, backgroundColor: '#ededed'}}>
       <Icon 
        name='add-a-photo' type='material' 
        size={50} color={'#999'} 
       />
       <View style={{ height: 10 }} />
       <LatoText bold color={'#999'} fontSize={rf(1.6)}>Add Photo</LatoText>
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