/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import ChatRightSlider from '../../components/ChatRightSlider';
import Footer from '../../components/Footer';
import ImagePicker from '../../components/ImagePicker';
import LatoText from '../../components/LatoText';
import NavigationHeader from '../../components/NavigationHeader';
import Row from '../../components/Row';
import UploadingModal from '../../components/UploadingModal';
import VideoFile from '../../components/VideoFile';
import VideoPicker from '../../components/VideoPicker';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { goBack, navigate } from '../../navigations/NavigationService';
import { useUser } from '../../redux/reducers/AuthReducer';
import { useChatDetails } from '../../redux/reducers/ChatReducer';
import { useMessages } from '../../services/PubNubChat';

export default function ChatScreen() {
  
    return (
        <View style={styles.container}>
            <NavigationHeader />
            
            <Button
              title={'All Messages'}
              type='clear'
              onPress={() => navigate('Inbox')}
              icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight:5, marginLeft:-5 }}/>}
              titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Black', }}
              buttonStyle={{ backgroundColor: "transparent", }}
              containerStyle={{ marginVertical: 16, alignSelf: 'flex-start', marginHorizontal: wp('5%') }}
              TouchableComponent={Pressable}
              />  

            <Chat />
            <Footer />
        </View>
      )
}

const Chat = () => { 
  const authUser = useUser();
  const chatDetails = useChatDetails()

  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showVideoPicker, setShowVideoPicker] = useState(false);
  const [showSettingSlider, setShowSettingSlider] = useState(false);
  const [uploading, setUploading] = useState(false);

  const {
    messageList,
    mediaFiles,
    channelName,
    lastMsgTimeToken,
    isOnline,
    sendMessage,
    sendFile
  } = useMessages()

  const onSend = (messages = []) => {
      console.log(messages)
      sendMessage(messages[0]);
  };
  const onPickImage = async (imageObj) => {
    if(imageObj){
      setUploading(true)
      const { uri, name, type } = imageObj; 
      await sendFile({ uri, name, mimeType: type });
      setUploading(false);
    }
   }
  const onPickVideo = async (videoObj) => {
    if(videoObj){
      setUploading(true)
      const { uri, name, type } = videoObj; 
      await sendFile({ uri, name, mimeType: type });
      setUploading(false);
    }
   }

  
  return (
    <View style={styles.chatbox}>
      <ChatHeader isOnline={isOnline} name={chatDetails.user?.name} onPressSetting={() => setShowSettingSlider(true)}/>
      <GiftedChat
        messages={messageList}
        placeholder={'Type a message here...'}
        onSend={(messages) => onSend(messages)}
        textInputProps={{ color: Colors.text, fontFamily: 'Lato-Regular', fontSize: rf(1.8) }}
        renderAvatarOnTop
        scrollToBottom
        inverted={true}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#C3FFDB',
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 10,
                marginRight: 10,
                marginVertical: 2
              },
              left: {
                backgroundColor: '#F2F2F2',
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 10,
                marginLeft: 0,
                marginVertical: 2
              }
            }}
            textStyle={{
              left: { color: Colors.text, fontSize: rf(1.7), fontFamily: 'Lato-Regular', },
              right: { color: Colors.text, fontSize: rf(1.7), fontFamily: 'Lato-Regular', } 
            }}
            renderTime={(props) => null}
          />
        )}
        renderSend={(props) => (
          <Send {...props}>
            <View
              style={{
                justifyContent: "center",
                height: "100%",
                marginRight: 10,
              }}
            >
              <Icon.Ionicon
                name="send"
                size={20}
                color={Colors.primaryColor}
              />
            </View>
          </Send>
        )}
        renderAccessory={(props) => (
            <View
              style={{
                height: 20,
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: -4
              }}
            >
                <Icon.Material
                  name="attach-file"
                  size={18}
                  color={'#828282'}
                  onPress={() => setShowVideoPicker(true)}
                />
                <Icon.Community
                  name="image-outline"
                  size={18}
                  color={'#828282'}
                  onPress={() => setShowImagePicker(true)}
                />
            </View>
        )}
        renderMessageVideo={(props) => (
        <VideoFile
          data={{ 
            uri: props?.currentMessage?.video,
            title: ''
          }} 
          containerStyle={props?.containerStyle}
          /> 
        )}
        // renderChatEmpty={() => <ListEmpty text={'No messages yet'}/>}
        user={{
          _id: authUser?.id,
          name: authUser?.full_name,
        }}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={120} />}

      <ImagePicker
        showPicker={showImagePicker}
        closePicker={() => setShowImagePicker(false)}
        onPickImage={onPickImage}
      />
      <VideoPicker
        showPicker={showVideoPicker}
        closePicker={() => setShowVideoPicker(false)}
        onPickVideo={onPickVideo}
      />

      <UploadingModal uploading={uploading} />

      <ChatRightSlider 
        isVisible={showSettingSlider}
        closeModal={()=> setShowSettingSlider(false)} 
        media={mediaFiles} 
        isOnline={isOnline}
        user={{ name: chatDetails.user?.name, avatar: chatDetails.user?.profile_image }}
        />

    </View>

  )
 }

  const ChatHeader = ({ isOnline, name, onPressSetting  }) => { 
    return(
      <View style={styles.searchbarContainer}>
        <Row style={styles.searchBar} >
          <LatoText bold>
            {isOnline && <Icon.FontAwesome name='circle' size={rf(1.2)} color={'#03B048'} style={{ textAlignVertical: 'center'}}/> }
            {`  ${name}`}
          </LatoText>
          <Icon.Ionicon name='settings-outline' size={rf(2.4)} color={Colors.primaryColor} onPress={onPressSetting}/> 
        </Row>
      </View>

    )
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  chatbox: {
    width: wp('90%'),
    height: hp('100%')-230, 
    elevation: 6,
    backgroundColor: Colors.white
  },
  searchbarContainer: {
    height: 40,
    width: '100%',
    borderBottomWidth: 1,
    borderColor:  Colors.primaryColor,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
    backgroundColor:'#F7FAFC'
  },
  searchBar: {
    height: 40,
    width: '90%',
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection: 'row',
  },
  inputContainer: {
    height: 50,
    borderBottomWidth: 0
},
  inputText: {
      fontFamily: 'Lato-Regular',
      color: Colors.text,
      fontSize: rf(1.8)
  },

})