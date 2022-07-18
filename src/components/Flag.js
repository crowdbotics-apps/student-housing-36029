import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

export default function Flag({ style, countryCode, containerStyle }) {
  
    return (
          <View style={{ width: style.width, height: style.height/1.5, elevation: 3, backgroundColor: '#FFF', ...containerStyle }}>
           <Image source={{uri: `https://www.countryflags.io/${countryCode}/flat/64.png`}} style={{ width: style.width, height: style.height/1.5, resizeMode: 'cover' }}  />
          </View>
    )
}
