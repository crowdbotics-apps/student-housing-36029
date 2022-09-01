import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Colors from '../constants/Colors';
import {
  checkCameraPermission
} from '../services/AppPermissions';


export default function VideoPicker({
  showPicker,
  closePicker,
  onPickVideo,
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

  useEffect(() => {
    if(showPicker)
      openGallery()
  }, [showPicker]);

  const openGallery = () => {
    launchImageLibrary(
      {
        noData: true,
        cameraType: 'front',
        mediaType: 'video',
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
        console.log('Video Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled GALLERY');
        } else if (response.errorMessage) {
          console.log('OPEN GALLERY Error: ', response.errorMessage);
          alert(response.errorMessage);
        } else if(response.assets){
          const images = response.assets.map(asset => getVideoObj(asset)); 
          onPickVideo(multipleSelection ? images : images[0]);
        }
        closePicker();
      },
    );
  };

  const getVideoObj = (video) => { 
    const uriParts = video.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    return {
      uri: Platform.OS === 'android' ? video.uri : video.uri.replace('file://', ''),
      name: video.fileName,
      type: `video/${fileType}` // or your mime type what you want
    }; 
  }

 return null
}
