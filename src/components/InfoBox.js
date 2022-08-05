import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function InfoBox({ children, style }) {
  
    return (
          <View style={[styles.container, style]}>
            {children}
          </View>
    )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C3FFDB',
    borderRadius: 6
  },
})