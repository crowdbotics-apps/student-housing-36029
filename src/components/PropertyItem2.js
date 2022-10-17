import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Button, ListItem, Rating, Icon as RNEIcon } from 'react-native-elements';
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { rf, wp } from '../constants/Constants';
import Icon from '../constants/Icon';
import { useIsOwner } from '../redux/reducers/AuthReducer';
import { deleteProperty } from '../redux/sagas/property/deleteSaga';
import { isImage } from '../utilities/utils';
import HeartButton from './HeartButton';
import LatoText from './LatoText';
import Row from './Row';
import { TextButton } from './TextButton';


export default function PropertyItem2 ({ id, title, media=[],  rating,  description, onViewProperty  }) {
  const dispatch = useDispatch();

  const mediaFiles = media.map(file => file.property_media?.split('?')[0]); 
    
  const onDelete = () => { 
    dispatch(deleteProperty(id));
   }
  return (
          <ListItem containerStyle={styles.container}>
             <ImageCarousel images={mediaFiles}/>
             <ListItem.Content style={styles.content}>
              <ListItem.Title>
                <View style={{ width: wp('40%') }}>
                    <LatoText black fontSize={rf(2)}>{title}</LatoText>
                    <Row style={{ width: wp('38%') }}>
                      <Rating 
                        ratingCount={5}
                        readonly
                        startingValue={rating}
                        imageSize={wp('3%')}
                        style={styles.rating} 
                        />
                      <TextButton 
                        title='View Reviews' 
                        titleStyle={{ color: Colors.primaryColor, fontSize: rf(1.5), height: 18 }} 
                        onPress={() => {}}
                        />
                    </Row>
                    <LatoText fontSize={rf(1.5)} ellipsizeMode='tail' numberOfLines={3}>
                      {description}
                    </LatoText>
                </View>
              </ListItem.Title>
              <ListItem.Subtitle>
                <Button
                    title={'Edit Property'}
                    type='solid'
                    onPress={() => { onViewProperty(id) }}
                    titleStyle={{ color: Colors.white, fontSize: rf(1.4), fontFamily: 'Lato-Bold', }}
                    buttonStyle={{ backgroundColor: Colors.primaryColor, width: 140,height: 35, borderRadius: 6, padding: 0 }}
                    containerStyle={{ width: 140, height: 35,borderRadius: 6, marginBottom: 20,  }}
                    TouchableComponent={TouchableOpacity}
                    />   
              </ListItem.Subtitle>
             </ListItem.Content>
              
              <Icon 
                name={'delete-outline'} 
                type='material' 
                color={Colors.text} 
                size={16} 
                onPress={onDelete}
                containerStyle={{ position: 'absolute', top: 20, right: 14 }}
                /> 
                  

          </ListItem>
          
    )
}

const ImageCarousel = ({ images=[] }) => { 
  const [index, setIndex] = useState(0);
  const onLeftPress = () => { 
    setIndex(index!==0 ? index-1 : index);
   }
  const onRightPress = () => { 
    setIndex(index!==images.length-1 ? index+1 : index);
   }
  //  console.log('images: ', images);
  if(images.length)
  return(
    <View style={styles.image}>
      {
        isImage(images[index]) ? 
        <Image source={{ uri: images[index] }} style={styles.image}/>
        :
        <VideoFile uri={images[index]} />
      }
      <Icon.Material name={'keyboard-arrow-left'} color={'#FFF'} size={15} style={styles.arrowLeft} onPress={onLeftPress}/>
      <Icon.Material name={'keyboard-arrow-right'} color={'#FFF'} size={15} style={styles.arrowRight} onPress={onRightPress}/>
    </View>
  )
  else return <View style={styles.image}>
          <Icon.FontAwesome name={'photo'} color={'#ddd'} size={145}/>
  </View>
 }

 const VideoFile = ({ uri, }) => (
    <Video
      source={{ uri }}
      style={styles.image}
    >
      <RNEIcon 
        name='play' type='ionicon' 
        size={24} color={Colors.text} 
        containerStyle={{ width: 60, height: 40, backgroundColor: '#FFFFFF70', borderRadius:4 }} 
        />
    </Video>

  )

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
    resizeMode: 'cover',
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating:{
    alignItems: "flex-start",
    justifyContent:"center",
    width: wp('15%'),
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