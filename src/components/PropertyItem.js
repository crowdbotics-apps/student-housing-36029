import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Image, ListItem, Rating } from 'react-native-elements';
import images from '../assets/images';
import Colors from '../constants/Colors';
import { rf, wp } from '../constants/Constants';
import LatoText from './LatoText';

export default function PropertyItem({ id, name, image, rating,  description   }) {
  
    return (
          <ListItem containerStyle={styles.container}>
             <Image source={image} style={styles.image}/>
             <ListItem.Content style={styles.content}>
              <ListItem.Title>
                <View style={{ width: wp('40%') }}>
                    <LatoText black fontSize={rf(1.8)}>{name}</LatoText>
                    <Rating 
                      ratingCount={5}
                      readonly
                      startingValue={rating}
                      imageSize={16}
                      style={styles.rating} 
                    />
                    <LatoText fontSize={rf(1.5)}>{description}</LatoText>
                </View>
              </ListItem.Title>
              <ListItem.Subtitle>
                <Button
                    title={'View Property'}
                    type='solid'
                    onPress={() => {}}
                    titleStyle={{ color: Colors.white, fontSize: rf(1.4), fontFamily: 'Lato-Bold', }}
                    buttonStyle={{ backgroundColor: Colors.primaryColor, width: 140,height: 35, borderRadius: 6, padding: 0 }}
                    containerStyle={{ width: 140, height: 35,borderRadius: 6, marginBottom: 20,  }}
                    TouchableComponent={TouchableOpacity}
                    />   
              </ListItem.Subtitle>
             </ListItem.Content>
          </ListItem>
          
    )
}
const styles = StyleSheet.create({
  container: {
    height: 186,
    width: wp('90%'),
    borderRadius: 6,
    elevation: 8,
    justifyContent:'center',
    alignItems: "center",
    marginVertical: 10
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
    resizeMode: 'cover'

  },
  rating:{
    alignItems: "flex-start",
    justifyContent:"center",
    width: '100%',
    height: 30
  }
})