import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import LatoText from './LatoText';

export default function ListEmpty({ text}) {
  
    return (
          <View style={styles.container}>
          <LatoText color={'#828282CC'}>{text}</LatoText>
          </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})  