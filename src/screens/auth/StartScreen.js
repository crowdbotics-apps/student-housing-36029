import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Image } from 'react-native-elements';
import images from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import { navigate } from '../../navigations/NavigationService';

export default function StartScreen() {
  
    return (
          <View style={styles.container}>
            <NavigationHeader />
            <ImageBackground
              source={images.background}
              style={styles.container}
              resizeMode='cover'>

              <View style={styles.content}>
                <Image  
                  source={images.logo}
                  style={styles.logo}
                />
                <Button
                  title={'Sign Up'}
                  type='solid'
                  onPress={() => navigate('Signin', { tab: 0 })}
                  titleStyle={{ color: Colors.white, fontSize: rf(1.8), fontFamily: 'Lato-Bold', }}
                  buttonStyle={{ backgroundColor: Colors.primaryColor, width: wp('80%'),height: 50, borderRadius: 25,borderWidth: 2  }}
                  containerStyle={{ width: wp('80%'), height: 50,borderRadius: 25, marginBottom: 20 }}
                  />  
                <Button
                  title={'Sign In'}
                  type='outline'
                  onPress={() => navigate('Signin', { tab: 1 })}
                  titleStyle={{ color: Colors.text, fontSize: rf(1.8), fontFamily: 'Lato-Bold', }}
                  buttonStyle={{ borderColor: Colors.primaryColor, backgroundColor: "transparent", width: wp('80%'), height: 50,borderRadius: 25,borderWidth: 2 }}
                  containerStyle={{ width: wp('80%'), height: 50,borderRadius: 25 }}
                  />  

              </View>

            </ImageBackground>
          </View>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: wp('80%'),
    height: 300,
    resizeMode: 'contain',
    marginVertical: 80,
  }
})