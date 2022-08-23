import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LatoText from './LatoText';

export default function ListEmpty({ text, height, }) {
  
    return (
          <View style={{...styles.container, height }}>
          <LatoText color={'#828282CC'}>{text}</LatoText>
          </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
})  