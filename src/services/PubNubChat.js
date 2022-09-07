import { usePubNub } from "pubnub-react";
import { useAuhToken, useUser } from "../redux/reducers/AuthReducer";
import React, { useEffect, useState } from 'react';
import { useChannelList, useChatDetails } from "../redux/reducers/ChatReducer";
import { getChatChannel, isImage } from "../utilities/utils";
import uuid from 'react-native-uuid';
import { GiftedChat } from "react-native-gifted-chat";

const currentTimeStamp = Math.floor(Date.now()) * 10000;

export const useUnreadMessageCounts = () => { 
  const pubnub = usePubNub();
  const authUser = useUser();
  const authToken = useAuhToken(); 
  const channelListData = useChannelList();
  const channelStore = channelListData.results; 

  const [unreadCounts, setUnreadCounts] = useState([]);

  useEffect(() => {
    pubnub.setUUID(authToken);
    if(channelStore?.length)
      getUnreadCounts(channelStore);
  }, [channelStore]);

  const getUnreadCounts = async (channelStore) => {      
    const channelNames = [];
    for (const channel of channelStore) {
      channelNames.push(getChannelName(channel));
    }  
    const metaData = []; 
    if(channelNames.length)
      for (const channelName of channelNames) {
        const tmpData = await getMetaData(pubnub, channelName);
        !!tmpData && metaData.push(tmpData);  
      }  
      console.log('metaData: ', metaData);
    let timetokens = [];
    if(metaData.length && channelNames.length === metaData.length){
      timetokens = channelNames.map((name) => {
        if(authUser.is_student)
          return metaData.find((channelData) => channelData.id === name)?.custom.studentTimeToken;
        else if(authUser.is_property_owner)
          return metaData.find((channelData) => channelData.id === name)?.custom.ownerTimeToken;
      });
    }
    if(timetokens.length){
      const tmpTime = timetokens.map((time) => {
        const unixTime = time / 10000 + 1;
        return unixTime * 10000;
      });
      pubnub.objects.getMemberships({
        include: {
          customFields: true,
        }
      });
      pubnub.messageCounts(
        {
          channels: channelNames,
          channelTimetokens: tmpTime,
        },
        (status, result) => {
          if (result && result.channels) {
            // console.log('messageCounts: ', result.channels);
            var counts = Object.values(result?.channels);
            setUnreadCounts(counts);
          }
        },
      );
    }
  }

  return {unreadCounts, setUnreadCounts};
}

export const useMessages = () => { 
  const pubnub = usePubNub();
  const authUser = useUser();
  const authToken = useAuhToken(); 
  const chatDetails = useChatDetails()
  const channelListData = useChannelList();
  const channelStore = channelListData.results; 

  const [channelName, setChannelName] = useState();
  const [messageList, setMessageList] = useState([]);
  const [lastMsgTimeToken, setLastMsgTimeToken] = useState();
  const [isOnline, setIsOnline] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(() => {
    if(chatDetails.user?.id){
      setChannelName(chatDetails.channel);
    }
  }, [chatDetails]);

  useEffect(() => {
    if (channelName) {
      const listner = { 
        message: handleMessage, 
        file: handleImage,
        presence: handleOnlineStatus 
      }; 
      pubnub.addListener(listner);
      pubnub.listFiles({ channel: channelName }, handleFiles);
      changeChannel(channelName);
      pubnub.subscribe({ channels: [channelName], withPresence: true });
      return () => {
        pubnub.removeListener(listner)
        pubnub.unsubscribe({
          channels: [channelName],
        });
      };
    }
  }, [channelName]);

  useEffect(() => {
      const setLastMsgTokenToPubnub = async () => {
        const metaData = await getMetaData(pubnub, channelName); 
        if (authUser && authUser.is_student && metaData) {
          const studentToken = metaData?.custom?.studentTimeToken;
          if (+studentToken === +lastMsgTimeToken) {
            setLastMsgTimeToken(null);
            return;
          }
          const ownerToken = metaData?.custom.ownerTimeToken;
          pubnub.objects.setChannelMetadata({
            channel: channelName,
            data: {
              custom: {
                ownerTimeToken: ownerToken,
                studentTimeToken: lastMsgTimeToken,
              },
            },
          });
          setLastMsgTimeToken(null);
        }
        if (authUser && authUser.is_property_owner && metaData) {
          const ownerToken = metaData?.custom.ownerTimeToken;
          if (+ownerToken === +lastMsgTimeToken) {
            setLastMsgTimeToken(null);
            return;
          }
          const studentToken = metaData?.custom.studentTimeToken;
          pubnub.objects.setChannelMetadata({
            channel: channelName,
            data: {
              custom: {
                ownerTimeToken: lastMsgTimeToken,
                studentTimeToken: studentToken,
              },
            },
          });
          setLastMsgTimeToken(null);
        }
      };

      if (messageList.length && lastMsgTimeToken)
          setLastMsgTokenToPubnub()

  }, [lastMsgTimeToken]);

  const handleMessage = (event) => {
    console.log('handleMessage event: ', event)

    if (channelName === event.subscribedChannel) {
      let message = event.message;
      if (message && message.id !== authUser?.id) {
        const newMsg = { 
          _id: Math.round(Math.random()*100000),  
          text: message.message, 
          createdAt: new Date(event.timetoken/10000),
          user: {
            _id: message.id,
          }
        };
        setMessageList((prevMessages) => GiftedChat.append(prevMessages, [newMsg], true))
      }
    }
  };
  const handleImage = (event) => {
    console.log('handleImage event: ', event)
    if (channelName === event.channel) {
      const newFile = event.file;
      const message = event.message;
      // const checkImgData = messageList.find((i) => i.id === event.id);
      if (newFile  && message.id !== authUser?.id) {
        const newMsg = { 
          _id: Math.round(Math.random()*100000),  
          text: '', 
          image: newFile.url?.split('?')[0],
          createdAt: new Date(event.timetoken/10000),
          user: {
            _id: message?.id
          }
        };
        setMessageList(GiftedChat.append(messageList, [newMsg], true))
      }
    }
  };
  const handleOnlineStatus = (event) => {
    console.log('presence event: ', event)
    if (channelName === event.channel && event.uuid !== authToken) {
      const action = event.action;
      if (action === 'join') {
        setIsOnline(true)
      } else {
        setIsOnline(false)
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
  const changeChannel = (newChannel) => {
    setChannelName(newChannel);
    pubnub.history(
      {
        channel: newChannel,
        count: 100,
      },
      handleMessageHistory,
    );
  };
  const handleMessageHistory = (status, response) => {
    console.log('handleMessageHistory response: ', response)
    if (response) {
      if (response.endTimeToken) {
        setLastMsgTimeToken(response.endTimeToken);
      } else {
        setLastMsgTimeToken(null);
      }
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
              _id: senderId === authUser.id ? authUser.id : chatDetails.user?.id,
              name: senderId === authUser.id ?  authUser.full_name  : chatDetails.user?.name,
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
  const sendMessage = (message) => {
    if (message) {
      setMessageList(GiftedChat.append(messageList, [message], true))
      pubnub
        .publish({
          channel: [channelName],
          message: { id: authUser.id, message: message.text, image: '' },
        })
        .then((res) => {
          setLastMsgTimeToken(res.timetoken);
        })
        .catch((error) => console.log(error.message));
    }
  };
  const sendFile = async (file) => {
    console.log('file: ', file)
    let image, video;
    if(file && isImage(file.name)) 
      image = file.uri;
    else 
      video = file.uri;
    const newMsg = {
      _id: Math.random()*100000,
      createdAt: new Date(),
      image,
      video,
      user: {
        _id: authUser?.id,
        name: authUser?.full_name,
      },    
    }
    setMessageList(GiftedChat.append(messageList, [newMsg], true))

    try {
      const response = await pubnub.sendFile({
        channel: [channelName],
        message: {
          id: authUser.id,
        },
        file: file,
      });
      console.log(`pubnub send file response`, response);
      setLastMsgTimeToken(response.timetoken);
    } catch (error) {
      console.log(`pubnub send file error`, error)
    }
  };

  const getFileUrl = ({id, name}, channel) => { 
    return pubnub.getFileUrl({ channel, id, name });
   }

  console.log({ messageList, mediaFiles, channelName, lastMsgTimeToken, isOnline });
  return { messageList, mediaFiles, channelName, lastMsgTimeToken, isOnline, sendMessage, sendFile };
}


async function getMetaData(pubnub, channelName) {
  try {
    const res = await pubnub.objects.getChannelMetadata({ channel: channelName });
    console.log('getMetaData res: ', res)
    const { custom } = res.data;
    if(custom)
      return {
        custom: {
          ownerTimeToken: custom.ownerTimeToken || currentTimeStamp,
          studentTimeToken: custom.studentTimeToken || currentTimeStamp,
        },
        id: channelName,
      };
  } catch (error) {
    console.log('getChannelMetadata Error: ', error);
  }
  return null;
}

export const setMetaData = (pubnub, channelName, ownerTimeToken, studentTimeToken) => { 
  pubnub.objects.setChannelMetadata({
    channel: channelName,
    data: {
      custom: {
        ownerTimeToken: ownerTimeToken || currentTimeStamp,
        studentTimeToken: studentTimeToken || currentTimeStamp,
      },
    },
  });

 }
export function getChannelName(channel) {
  const user1 = channel.participants[0];
  const user2 = channel.participants[1];
  let owner, student;
  if (user1 && user1.user.is_property_owner && user2.user.is_student) {
    owner = user1; student = user2;
  }
  else if (user2 && user2.user.is_property_owner && user1.user.is_student) {
    owner = user2; student = user1;
  }
  if (student && owner) {
    return `student_housing_${owner.user.id}_${student.user.id}`;
  } 
  else return null;
}
