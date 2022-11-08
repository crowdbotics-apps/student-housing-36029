import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ReactNativeModal from 'react-native-modal';
import Colors from '../constants/Colors';
import { WIDTH } from '../constants/Constants';
import {
  checkCameraPermission
} from '../services/AppPermissions';
import LatoText from './LatoText';

const PICTURE_OPTIONS = ['Take Picture', 'Open Image Gallery'];

export default function ImagePicker({
  showPicker,
  closePicker,
  onPickImage,
  multipleSelection=false
}) {

  const [cameraPermission, setCameraPermission] = useState(true);

  useEffect(() => {
    if (Platform.OS == 'android') {
      (async () => {
        const granted = await checkCameraPermission();
        setCameraPermission(granted);
      })();
    }
  }, []);

  const openCamera = () => {
    if (Platform.OS == 'ios') {
      launchCamera(
        {
          noData: true,
          cameraType: 'front',
          mediaType: 'photo',
          tintColor: Colors.primaryColor,
          maxWidth     : 500,
          maxHeight    : 500,
          includeBase64: true,
          storageOptions: {
            skipBackup: true,
            cameraRoll: true,
          },
        },
        (response) => {
          console.log('Image Response = ', response);
          if (response.didCancel) {
            console.log('User cancelled CAMERA');
          } else if (response.errorMessage) {
            console.log('LAUNCH CAMERA Error: ', response.errorMessage);
            alert(response.errorMessage);
          } else if(response.assets){
            const images = response.assets.map(asset => getImageObj(asset)); 
            onPickImage(multipleSelection ? images : images[0]);
            }
        },
      );
    } else {
      if (cameraPermission) {
        launchCamera(
          {
            noData: true,
            cameraType: 'front',
            mediaType: 'photo',
            tintColor: Colors.primaryColor,
            maxWidth     : 500,
            maxHeight    : 500,
            includeBase64: true,
            storageOptions: {
              skipBackup: true,
              cameraRoll: true,
            },
          },
          (response) => {
            console.log('Image Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled CAMERA');
            } else if (response.errorMessage) {
              console.log('LAUNCH CAMERA Error: ', response.errorMessage);
              alert(response.errorMessage);
            } else if(response.assets){
              const images = response.assets.map(asset => getImageObj(asset)); 
              onPickImage(multipleSelection ? images : images[0]);
            }
          },
        );
      } else alert('Permission not granted!');
    }
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        noData: true,
        cameraType: 'front',
        mediaType: 'photo',
        tintColor: Colors.primaryColor,
        maxWidth     : 500,
        maxHeight    : 500,
        includeBase64: true,
        storageOptions: {
          skipBackup: true,
          cameraRoll: true,
        },
      },
      (response) => {
        console.log('Image Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled GALLERY');
        } else if (response.errorMessage) {
          console.log('OPEN GALLERY Error: ', response.errorMessage);
          alert(response.errorMessage);
        } else if(response.assets){
          const images = response.assets.map(asset => getImageObj(asset)); 
          onPickImage(multipleSelection ? images : images[0]);
        }
      },
    );
  };

  const getImageObj = (image) => { 
    const uriParts = image.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    return {
      uri: Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
      name: image.fileName,
      type: `image/${fileType}` // or your mime type what you want
    }; 
  }
  return (
      <ReactNativeModal
        isVisible={showPicker}
        backdropOpacity={0.5}
        onBackButtonPress={closePicker}
        onBackdropPress={closePicker}>
        <View style={styles.modal2}>
          <Text style={styles.headingText2}>{`Select Image`} </Text>
          <ListItem style={{ width: WIDTH - 60, height: 40 }}
            onPress={() => {
              closePicker();
              setTimeout(() => {
                openCamera();
              }, 500);
            }}
            Component={TouchableOpacity}
            >
                <Icon name={'camera'} type='font-awesome' color={'#bbb'} size={18} containerStyle={{width: 22, height: 20}}/>
                <ListItem.Content>
                <ListItem.Title><LatoText semiBold fontSize={15} color='#333'>{PICTURE_OPTIONS[0]}</LatoText></ListItem.Title>
                </ListItem.Content>
          </ListItem>
          <ListItem style={{ width: WIDTH - 60, height: 40 }}
            onPress={() => {
              closePicker();
              setTimeout(() => {
                openGallery();
              }, 600);
            }}
            Component={TouchableOpacity}
            >
                <Icon name={'image'} type='font-awesome' color={'#bbb'} size={20} containerStyle={{width: 22, height: 20}}/>
                <ListItem.Content>
                <ListItem.Title><LatoText semiBold fontSize={15} color='#333'>{PICTURE_OPTIONS[1]}</LatoText></ListItem.Title>
                </ListItem.Content>
          </ListItem>
        </View>
      </ReactNativeModal>
  );
}
const styles = StyleSheet.create({
  modal2: {
    width: WIDTH - 30,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 14,
    padding: 10,
    elevation: 8,
  },
  headingText2: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: 'bold',
    width: WIDTH - 80,
    height: 30,
  },
});
