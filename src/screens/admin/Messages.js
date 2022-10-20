import { useRoute } from "@react-navigation/native";
import { usePubNub } from "pubnub-react";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import ChatRightSlider from "../../components/ChatRightSlider";
import Footer from "../../components/Footer";
import LatoText from "../../components/LatoText";
import NavigationHeader from "../../components/NavigationHeader";
import Row from "../../components/Row";
import VideoFile from "../../components/VideoFile";
import Colors from "../../constants/Colors";
import { hp, rf, wp } from "../../constants/Constants";
import Icon from "../../constants/Icon";
import { goBack } from "../../navigations/NavigationService";
import { isImage } from "../../utilities/utils";

export default function Messages() {
    const pubnub = usePubNub();
    const route = useRoute();
    const conversation = route.params.conversation;
    const channelName = conversation.channel; 
    const [ user1, user2 ] = conversation.participants; 

    console.log('channelName: ', channelName)

    const [messageList, setMessageList] = useState([]);
    const [showSettingSlider, setShowSettingSlider] = useState(false);
    const [mediaFiles, setMediaFiles] = useState([]);

    useEffect(() => {
        if(channelName){
          pubnub.history(
            {
              channel: channelName,
              count: 100,
            },
            handleMessageHistory,
          );
          pubnub.listFiles({ channel: channelName }, handleFiles);

        }
    }, [channelName]);
    
      const handleMessageHistory = (status, response) => {
        console.log('handleMessageHistory response: ', response)
        if (response) {
          const messagesRetrived = response.messages;
          const newMsgs = []; 
          if (messagesRetrived.length) {
            for (const message of messagesRetrived) {
              const senderId = message.entry?.file ? message.entry?.message?.id : message.entry?.id; 
              const fileUrl = message.entry?.file && getFileUrl(message.entry?.file, channelName);
              let image, video;
              if(message.entry?.file && isImage(message.entry?.file.name)) 
                image = fileUrl;
              else 
                video = fileUrl;
              console.log('fileUrl: ', fileUrl); 
              const newMsg = {
                _id: Math.random()*100000,
                text: message.entry?.file ? '' : message.entry?.message,
                createdAt: new Date(message.timetoken/10000),
                image,
                video,
                user: {
                  _id: senderId === user1.user.id ? user1.user.id : user2.user.id,
                  name: senderId === user1.user.id ?  user1.user.name  : user2.user.name,
                }
              }
              newMsgs.push(newMsg);
            }
            if(messageList.length===0)
              setMessageList(GiftedChat.append(messageList, newMsgs, true).reverse())
            } else {
              setMessageList([]);
            }
        }
      };
      const handleFiles = (status, response) => {
        console.log('listFiles response: ', response)
        let files = response.data; 
        if(files.length)
          files = files.map(file => ({
            ...file,
            uri: getFileUrl(file,channelName)
          }))
        setMediaFiles(files);
      }
    
      const getFileUrl = ({id, name}, channel) => { 
        return pubnub.getFileUrl({ channel, id, name });
       }
    
    return (
        <View style={styles.container}>
            <NavigationHeader />
            <View style={styles.main__view}>
              <Button
                title="Messages"
                type='clear'
                onPress={() => goBack()}
                icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight: 5 }} />}
                titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold' }}
                buttonStyle={{ backgroundColor: "transparent", }}
                containerStyle={{ alignSelf: 'flex-start', marginVertical: 10 }}
                TouchableComponent={TouchableOpacity}
              />
              {/* Chatbox */}
              <View style={styles.chatbox}>
                <ChatHeader user1={user1} user2={user2} onPressSetting={() => setShowSettingSlider(true)} />
                <GiftedChat
                  messages={messageList}
                  showUserAvatar
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
                      renderTime={(props) => null} />
                  )}
                  renderSend={(props) => null}
                  renderInputToolbar={() => null}
                  renderMessageVideo={(props) => (
                    <VideoFile
                      data={{
                        uri: props?.currentMessage?.video,
                        title: ''
                      }}
                      containerStyle={props?.containerStyle} />
                  )}
                  // renderChatEmpty={() => <ListEmpty text={'No messages yet'}/>}
                  user={{
                    _id: user2?.user?.id,
                    name: user2?.user?.name,
                    avatar: user2?.profile_image
                  }} />
                
                {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={120} />}

                <ChatRightSlider
                  isVisible={showSettingSlider}
                  closeModal={() => setShowSettingSlider(false)}
                  media={mediaFiles}
                  />

              </View>
            </View>
            <Footer />
        </View>
    )
}

const ChatHeader = ({ user1, user2, onPressSetting }) => {
  return (
    <View style={styles.searchbarContainer}>
      <Row style={styles.searchBar}>
        <LatoText bold>
          {`${user1.user.name} / ${user2.user.name}`}
        </LatoText>
        <Row style={{ justifyContent: 'flex-end', }}>
          <Icon.Ionicon name='settings-outline' size={rf(2.4)} color={Colors.primaryColor} onPress={onPressSetting} />
        </Row>
      </Row>
    </View>

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
      justifyContent: 'flex-start',
    },
    main__view: {
      marginHorizontal: '5%'
    },

    chatbox: {
      width: wp('90%'),
      height: hp('100%') - 230,
      elevation: 6,
      backgroundColor: Colors.white
    },
    searchbarContainer: {
      height: 40,
      width: '100%',
      borderBottomWidth: 1,
      borderColor: Colors.primaryColor,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: '#F7FAFC'
    },
    searchBar: {
      height: 40,
      width: '90%',
      justifyContent: 'space-between',
      alignItems: 'center',
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
  
});