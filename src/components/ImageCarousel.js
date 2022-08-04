import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageStore } from 'react-native';
import { Image, Icon } from 'react-native-elements';
import { wp } from '../constants/Constants';

export default function ImageCarousel({ images=[] }) {
  
  const [index, setIndex] = useState(0);
  const onLeftPress = () => { 
    setIndex(index!==0 ? index-1 : index);
   }
  const onRightPress = () => { 
    setIndex(index!==images.length-1 ? index+1 : index);
   }
    return (
          <View style={styles.container}>
            <View style={styles.container2}>
              <Image source={{ uri: images[index] }} style={styles.bigimg}/>
              <Icon name={'keyboard-arrow-left'} type='material' color={'#FFF'} size={15} containerStyle={styles.arrowLeft} onPress={onLeftPress}/>
              <Icon name={'keyboard-arrow-right'} type='material' color={'#FFF'} size={15} containerStyle={styles.arrowRight} onPress={onRightPress}/>
            </View>
            <View style={styles.container3}>
            {
              images.map((image,i) => <Image source={{ uri: image }} key={image+i} style={styles.smallimg} onPress={() => setIndex(i)}/>)
            }
            </View>
          </View>
    )
}
const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  container2: {
    width: wp('70%'),
    height: wp('70%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    width: wp('20%'),
    height: wp('70%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bigimg: {
    width: wp('70%')-1,
    height: wp('70%')-1,
    resizeMode: 'cover',
    margin: 1
  },
  smallimg: {
    width: wp('20%')-1,
    height: wp('70%')/4-1,
    resizeMode: 'cover',
    margin: 1
  },
  arrowLeft: {
    width: 15,
    height: 15,
    position: 'absolute',
    left: 10,
    top: wp('70%')/2-6,
    backgroundColor: 'black'
  },
  arrowRight: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 10,
    top: wp('70%')/2-6,
    backgroundColor: 'black'
  },
})