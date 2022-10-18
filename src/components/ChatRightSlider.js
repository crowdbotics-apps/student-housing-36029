/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import ReactNativeModal from 'react-native-modal';
import Video from 'react-native-video';
import { useDispatch } from 'react-redux';
import images from '../assets/images';
import Colors from '../constants/Colors';
import { rf, wp } from '../constants/Constants';
import Icon from '../constants/Icon';
import { isImage } from '../utilities/utils';
import LatoText from './LatoText';
import ListEmpty from './ListEmpty';
import Row from './Row';
import VideoFile from './VideoFile';

const SLIDER_WIDTH = wp('50%'); 
const AVATAR_WIDTH = wp('25%'); 

const ChatRightSlider = ({ isVisible, closeModal, media, user, isOnline }) => {
  const dispatch = useDispatch();
    return (
        <ReactNativeModal
        isVisible={isVisible}
        onSwipeComplete={closeModal}
        swipeDirection={['right']}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        animationIn={'slideInRight'}
        animationInTiming={600}
        animationOut={'slideOutRight'}
        animationOutTiming={300}
        style={styles.modal}
        useNativeDriver>
        <View style={{ width: SLIDER_WIDTH, height: '100%', padding: 16, backgroundColor:'#FFF' }}>
          <Row style={{ width: '100%', height: 25, marginBottom: 10, justifyContent: 'flex-end', }}>
            <Icon.Ionicon name='close' size={20} color={Colors.text} onPress={closeModal} />
          </Row>
          {
            user && 
            <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', height: AVATAR_WIDTH + 40 }}>
              <Avatar
                rounded
                source={user?.avatar?.length ? { uri: user?.avatar } : images.dummyProfileImage}
                title={user?.name[0]?.toUpperCase()}
                size={AVATAR_WIDTH}
                containerStyle={{ width: AVATAR_WIDTH, height: AVATAR_WIDTH, marginBottom: 15 }}
              />                  
              <LatoText style={{ textAlign: 'center', width: '100%', }}>
                <LatoText black style={styles.label}>{user?.name}</LatoText>{"   "}
                <LatoText color='#828282' fontSize={rf(1.6)}>{isOnline && '(Active)'}</LatoText>
              </LatoText>
            </View>
          }

          <SharedMedia data={media}/>

        </View>
      </ReactNativeModal>

    )
}
const SharedMedia = ({ data=[] }) => { 
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => { 
    setCollapsed(!collapsed)
   }
  return (
    <>
    <Pressable onPress={toggleCollapsed}>
      <Row style={styles.header}>
        <LatoText fontSize={rf(1.9)}>{'Shared media'}</LatoText>
        <Icon.Feather name={collapsed ? 'plus': 'minus'} size={16} color={Colors.primaryColor} />
      </Row>
    </Pressable>
    {
    !collapsed ? 
      data.length === 0 ? 
      <ListEmpty text={'No media'} height={50}/> 
      :
      <Row style={{ width: SLIDER_WIDTH-32, flexWrap: 'wrap', marginTop: 0  }}>
        {
          data.map((item,i) => {
            const fileUri = item.uri?.split('?')[0]; 
            if(isImage(fileUri))
              return <Image 
                key={item?.id+''+i}
                source={{ uri: fileUri }} 
                style={styles.thumbnail}
                />
            else 
              return <VideoFile
                key={item?.id+''+i}
                data={{ uri: fileUri }} 
                containerStyle={styles.thumbnail}
                />
          }
          )
        }
      </Row>
    : null
    }
  </>
  )
 }


const styles = StyleSheet.create({
    modal: {
      alignItems: 'flex-end',
      margin: 0,
    },
    label: {
      fontSize: rf(1.9)
    },
    header:{
      width: '100%',
      height: 30,
      marginTop: 25
    },
    thumbnail: {
      width: (SLIDER_WIDTH-32)/3-4,
      height: (SLIDER_WIDTH-32)/3,
      borderRadius: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 8
    }
  
  });
  

export default ChatRightSlider;