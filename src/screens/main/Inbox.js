/* eslint-disable arrow-body-style */
import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar, Badge, Input, ListItem } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import images from '../../assets/images';
import Footer from '../../components/Footer';
import LatoText from '../../components/LatoText';
import ListEmpty from '../../components/ListEmpty';
import NavigationHeader from '../../components/NavigationHeader';
import Row from '../../components/Row';
import { TextButton } from '../../components/TextButton';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { navigate } from '../../navigations/NavigationService';
import { useUser } from '../../redux/reducers/AuthReducer';
import { setChatDetails, setChats, useChannelList } from '../../redux/reducers/ChatReducer';
import { getChannelName, useUnreadMessageCounts } from '../../services/PubNubChat';
import { timeInWords } from '../../utilities/utils';

export default function Inbox() {
  
    return (
        <View style={styles.container}>
            <NavigationHeader />
            <Chats />
            <Footer />
        </View>
      )
}

const Chats = () => { 
  const dispatch = useDispatch();
  const channelListData = useChannelList();
  const channelStore = channelListData.results; 
  const authUser = useUser();

  const [filteredChats, setFilteredChats] = useState([]);
  const [allChats, setAllChats] = useState([]);

  useEffect(() => {
    if (authUser && channelStore) {
      const { id: activeUserId } = authUser;
      let chats = channelStore.map((channel) => {
        const { participants = [] } = channel;
        if (participants.length)
          return {
            channel: getChannelName(channel),
            ...participants.find((p) => p.user.id !== activeUserId),
          };
        else return null
      });
      chats = chats.filter((i) => i!==null);
      setAllChats(chats);
      dispatch(setChats(chats));
    }
  }, [authUser, channelStore]);

  const {
    lastMessageTimeTokens,
    unreadCounts,
    setUnreadCounts
  } = useUnreadMessageCounts();

  console.log('unreadCounts: ', unreadCounts)
  
  const onSearch = (text) => { 
    if(text.length===0) {
      setFilteredChats([])
    } else {
      setFilteredChats(allChats.filter(chat => chat.user.name?.toUpperCase().startsWith(text.toUpperCase())))
    }
   }
   const onPressChat = useCallback(
    (id,index) => { 
      dispatch(setChatDetails(allChats.find(item => item.id === id)));
      const counts = { ...unreadCounts }; 
      counts[index] = 0;
      setUnreadCounts(counts);
      navigate('Chat')
    },
    [allChats, unreadCounts, setUnreadCounts]
   )
   
  return (
    <View style={[styles.container, { marginTop: 20 }]}>
      <ChatSearchbar onChangeText={onSearch} />
      <FlatList
        data={filteredChats.length ? filteredChats : allChats}
        extraData={unreadCounts}
        renderItem={({item, index}) => (
          <ChatItem 
            {...item} 
            onPress={(id) => onPressChat(id,index)}
            unreadCount={unreadCounts[index] || 0}
            timeToken={lastMessageTimeTokens[index] || ''}
            />
        )}
        keyExtractor={(item, i) => item.id}
        style={{ width: wp('100%'), height: '100%', padding: wp('2.5%'), backgroundColor: "#FFF", marginTop: 20 }}
        contentContainerStyle={{ alignItems:'center'}}
        ListEmptyComponent={() => <ListEmpty text='No chats yet' height={hp('80%')}/>}
        ListFooterComponent={() => (
          <View style={{height: 150}}>
            {channelListData?.next && <TextButton title={'Load more'} />}
          </View>)}
        />  
    </View>

  )
 }

  const SEARCHBAR_WIDTH = wp('90%'); 

  const ChatSearchbar = ({ onChangeText }) => { 
    const [text, setText] = useState('');

    const updateText = (text) => {
      setText(text)
      onChangeText && onChangeText(text);
    }
  
    const _onEndEditting = (event) => {
      const value = event.nativeEvent.text; 
      if (!value || value.length === 0) return;
    }
  
    return(
      <View style={styles.searchbarContainer}>
        <Row style={styles.searchBar} >
          <Icon.FontAwesome name='search' size={rf(2.8)} color={Colors.text}/>
          <Input 
            containerStyle={{ width: SEARCHBAR_WIDTH-30, height: 50}}
            inputContainerStyle={styles.inputContainer}
            inputStyle={[styles.inputText]}
            onChangeText={updateText}
            value={text}
            onEndEditing={_onEndEditting}
            placeholder={'Search by name'}
            placeholderTextColor={Colors.text}
            />
        </Row>
      </View>

    )
  }
 const ChatItem = ({ id, profile_image, user, onPress, unreadCount, timeToken }) => { 
  const isUnread = unreadCount>0; 
  const backgroundColor = isUnread ? '#4797AF' : '#F7FAFC'; 
  const unreadColor = isUnread ? Colors.white : null; 
  return (
      <ListItem containerStyle={[styles2.container, { backgroundColor }]} onPress={() => onPress(id)} Component={TouchableWithoutFeedback}>
        <Avatar
          rounded
          source={profile_image?.length ? { uri: profile_image } : images.dummyProfileImage}
          title={user?.name[0]?.toUpperCase()}
          size={50}
          containerStyle={{ width: 50, height: 50 }}
        />                  
        <ListItem.Content style={styles2.content}>
          <ListItem.Title>
            <LatoText bold fontSize={rf(2)} color={unreadColor || Colors.text}>{user?.name}</LatoText>
          </ListItem.Title>
          <ListItem.Subtitle>
            <LatoText fontSize={rf(1.6)} color={unreadColor || '#5E5E5E'}>
              {/* {truncateText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',40)} */}
            </LatoText>
          </ListItem.Subtitle>
        </ListItem.Content>
        <View style={{ alignItems: 'flex-end', justifyContent: 'space-between', height: 40, }}>
          <LatoText bold fontSize={rf(1.5)} color={unreadColor || '#828282'}>{timeInWords(new Date(timeToken/10000))}</LatoText>
          {
            unreadCount === 0 ?
            <Icon.Community name='check-circle-outline' size={20} color={Colors.text} />
            :
            <Badge value={unreadCount} badgeStyle={{ backgroundColor: '#FF3B30' }}/>
          } 
        </View>
    </ListItem>

  )
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  searchbarContainer: {
    height: 50,
    width: SEARCHBAR_WIDTH,
    borderRadius: 6,
    borderWidth: 2,
    borderColor:  Colors.primaryColor,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  searchBar: {
    height: 50,
    width: '100%',
    borderRadius: 24,
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
const styles2 = StyleSheet.create({
  container: {
    height: 70,
    width: wp('90%'),
    borderRadius: 6,
    justifyContent:'center',
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: '#F7FAFC'
  },
  content: {
    height: 35,
    width: wp('40%'),
    justifyContent:'space-between',
    alignItems: 'flex-start',
  },
});