import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import { rf, wp } from '../constants/Constants';
import Icon from '../constants/Icon';
import { useKeyboard } from '../utilities/hooks';
import LatoText from './LatoText';
import Row from './Row';

export default function Footer() {
  const isKeyboard = useKeyboard()
  if(!isKeyboard)
    return (
        <View style={styles.container}>
          
          <Row style={{ width: wp('90%'), height: 28, }}>
            <Row style={{ width: wp('50%'), justifyContent: 'flex-start' }}>
              <Button
                title={'About Us'}
                type='clear'
                onPress={() => {}}
                titleStyle={{ color: Colors.white, fontSize: rf(1.4), fontFamily: 'Lato-Bold' }}
                buttonStyle={{ padding: 0 }}
                TouchableComponent={TouchableOpacity}
                />   
              <Button
                title={'How to book'}
                type='clear'
                onPress={() => {}}
                titleStyle={{ color: Colors.white, fontSize: rf(1.4), fontFamily: 'Lato-Bold' }}
                buttonStyle={{ padding: 0, marginLeft: 20 }}
                TouchableComponent={TouchableOpacity}
                />
            </Row>
            <Button
              title={'Help'}
              type='clear'
              onPress={() => {}}
              icon={<Icon.Material name='help-outline' size={14} color='white' />}
              titleStyle={{ color: Colors.white, fontSize: rf(1.4), fontFamily: 'Lato-Bold', marginLeft: 5 }}
              buttonStyle={{ padding: 0 }}
              TouchableComponent={TouchableOpacity}
              />
          </Row>

          <View style={styles.separator}  />

          <LatoText fontSize={rf(1.0)} color='#FFF'>{`Student Housing app, 2021`}</LatoText>

        </View>
    )
  else return null
}
const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: 65,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.text,
     position: 'absolute',
     bottom: 0,
     left: 0, right: 0
  },
  separator: {
    width: wp('90%'),
    height: 1,
    backgroundColor: '#828282CC',
  }

})