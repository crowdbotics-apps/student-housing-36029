import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Colors from '../constants/Colors';
import { wp } from '../constants/Constants';
import Row from './Row';

export default function PropertyLoader() {
  
    return (
      <View style={styles.main} >
      <SkeletonPlaceholder>
        <View style={{ alignItems: "center", justifyContent: 'flex-start' }}>
          <View style={styles.container}>
            <View style={styles.image} />
            <View style={styles.content}>
              <View style={{ width: wp('40%') }}>
                <View style={styles.text1} />
                <View style={styles.text2} />
                <View style={styles.text2} />
              </View>
              <View style={styles.button} />   
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.image} />
            <View style={styles.content}>
              <View style={{ width: wp('40%') }}>
                <View style={styles.text1} />
                <View style={styles.text2} />
                <View style={styles.text2} />
              </View>
              <View style={styles.button} />   
            </View>
          </View>
          <View style={styles.container}>
            <View style={styles.image} />
            <View style={styles.content}>
              <View style={{ width: wp('40%') }}>
                <View style={styles.text1} />
                <View style={styles.text2} />
                <View style={styles.text2} />
              </View>
              <View style={styles.button} />   
            </View>
          </View>
        </View>
      </SkeletonPlaceholder>
      </View>
    )
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingTop: 10
  },
  container: {
    height: 186,
    width: wp('90%'),
    borderRadius: 6,
    justifyContent:'center',
    alignItems: "center",
    marginVertical: 10,
    flexDirection: "row",
    backgroundColor: '#00000060',
  },
  content: {
    height: 145,
    width: wp('40%'),
    justifyContent:'space-between',
    alignItems: 'flex-start',
  },
  image:{
    height: 145,
    width: wp('40%'),
    borderRadius: 6,
    marginRight: 10
  },
  text1:{
    height: 20,
    width: wp('30%'),
    borderRadius: 10,
    margin: 5
  },
  text2:{
    height: 15,
    width: wp('30%'),
    borderRadius: 10,
    margin: 5,

  },
  button: {
    width: 140,
    height: 35,
    borderRadius: 6,
    margin: 5,
    marginTop: 15
  }
})