import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Button, Image, ListItem, Rating } from 'react-native-elements';
import images from '../assets/images';
import Colors from '../constants/Colors';
import { rf, wp } from '../constants/Constants';
import { IMAGES } from '../constants/Data';
import Icon from '../constants/Icon';
import { navigate } from '../navigations/NavigationService';
import HeartButton from './HeartButton';
import LatoText from './LatoText';
import Row from './Row';
import { TextButton } from './TextButton';

export default function PropertyItem({ id, name, image, rating,  description, toggleFavourite   }) {
  
    return (
          <ListItem containerStyle={styles.container}>
             <ImageCarousel images={IMAGES}/>
             <ListItem.Content style={styles.content}>
              <ListItem.Title>
                <View style={{ width: wp('40%') }}>
                    <LatoText black fontSize={rf(1.8)}>{name}</LatoText>
                    <Row style={{ width: 180 }}>
                      <Rating 
                        ratingCount={5}
                        readonly
                        startingValue={rating}
                        imageSize={15}
                        style={styles.rating} 
                        />
                      <TextButton 
                        title='View Reviews' 
                        titleStyle={{ color: Colors.primaryColor, fontSize: 15 }} 
                        onPress={() => {}}
                        />
                    </Row>
                    <LatoText fontSize={rf(1.5)}>{description}</LatoText>
                </View>
              </ListItem.Title>
              <ListItem.Subtitle>
                <Button
                    title={'View Property'}
                    type='solid'
                    onPress={() => { navigate('PropertyDetails') }}
                    titleStyle={{ color: Colors.white, fontSize: rf(1.4), fontFamily: 'Lato-Bold', }}
                    buttonStyle={{ backgroundColor: Colors.primaryColor, width: 140,height: 35, borderRadius: 6, padding: 0 }}
                    containerStyle={{ width: 140, height: 35,borderRadius: 6, marginBottom: 20,  }}
                    TouchableComponent={TouchableOpacity}
                    />   
              </ListItem.Subtitle>
             </ListItem.Content>
             <HeartButton 
                onToggle={toggleFavourite}
                containerStyle={{ position: 'absolute', top: 20, right: 14 }}
             />
          </ListItem>
          
    )
}

const ImageCarousel = ({ images }) => { 
  const [index, setIndex] = useState(0);
  const onLeftPress = () => { 
    setIndex(index!==0 ? index-1 : index);
   }
  const onRightPress = () => { 
    setIndex(index!==images.length-1 ? index+1 : index);
   }

  return(
    <View style={styles.image}>
      <Image source={{ uri: images[index] }} style={styles.image}/>
      <Icon.Material name={'keyboard-arrow-left'} color={'#FFF'} size={15} style={styles.arrowLeft} onPress={onLeftPress}/>
      <Icon.Material name={'keyboard-arrow-right'} color={'#FFF'} size={15} style={styles.arrowRight} onPress={onRightPress}/>
    </View>
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
    width: 75,
    height: 30
  },
  arrowLeft: {
    width: 15,
    height: 15,
    position: 'absolute',
    left: 5,
    top: 145/2-6,
    backgroundColor: 'black',
    zIndex: 100
  },
  arrowRight: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 5,
    top: 145/2-6,
    backgroundColor: 'black'
  },

})