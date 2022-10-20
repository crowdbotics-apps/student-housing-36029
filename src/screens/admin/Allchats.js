import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import ChatSearchbar from "../../components/ChatSearchbar";
import { Check } from "../../components/Check";
import Footer from "../../components/Footer";
import LatoText from "../../components/LatoText";
import ListEmpty from "../../components/ListEmpty";
import NavigationHeader from "../../components/NavigationHeader";
import Row from "../../components/Row";
import { TextButton } from "../../components/TextButton";
import Colors from "../../constants/Colors";
import { hp, rf, wp } from "../../constants/Constants";
import Icon from "../../constants/Icon";
import { goBack, navigate } from "../../navigations/NavigationService";
import { useAllChats, useIsLoading } from "../../redux/reducers/AllChatsReducer";
import { fetchAllChats } from "../../redux/sagas/chat/fetchAllChats";
import { getChannelName } from "../../services/PubNubChat";
import { useDispatchEffect } from "../../utilities/hooks";


export default function AllChats() {
    const dispatch = useDispatch();
    const isLoading = useIsLoading();
    const allChatsData = useAllChats();

    const [conversations, setConversations] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [checkedAll, setCheckedAll] = useState(false);

    useDispatchEffect(fetchAllChats, null, conversations.length === 0);

    useEffect(() => {
      if (allChatsData && allChatsData.results?.length) {
        const allChats = allChatsData.results || [];
        let chats = allChats.map((chat) => {
            const { participants = [] } = chat;
            if (participants.length >= 2)
              return {
                channel: getChannelName(chat),
                participants,
              };
            else return null;
          });
        chats = chats.filter((i) => i!==null);
        console.log('All Chats',chats)
        if(allChatsData.previous===null)
          setConversations(chats);
        else 
          setConversations(conversations.concat(chats));
      }
    }, [allChatsData.results]);
    
    const filterByNames = (text, participants) => { 
        return !!participants.find(p => p.user.name?.toUpperCase().startsWith(text.toUpperCase()));
     }
     const loadMore = () => { 
      const payload = allChatsData.next;
      if(payload) {
        let paramString = payload.split('?')[1];
        dispatch(fetchAllChats(paramString));  
      }
    }
    
    return (
        <View style={styles.container}>
            <NavigationHeader />
            <View style={styles.main__view}>
                <Button
                    title="Conversations"
                    type='clear'
                    onPress={() => goBack()}
                    icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight: 5 }} />}
                    titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold' }}
                    buttonStyle={{ backgroundColor: "transparent", }}
                    containerStyle={{ alignSelf: 'flex-start', marginVertical: 10 }}
                    TouchableComponent={TouchableOpacity}
                />
                <ChatSearchbar onChangeText={(text) => setSearchText(text)} />
                {
                conversations.length === 0 ?
                    isLoading ?
                    <ActivityIndicator color={'blue'} size='large' />
                    :
                    <ListEmpty text='No items to display' height={hp('40%')} />
                :
                  <View style={{ marginTop: hp('3%') }}>
                    <Check text="Select all" checked={checkedAll} onChange={() => { setCheckedAll(!checkedAll) }} />
                    <FlatList
                      data={searchText.length ? conversations.filter(chat => filterByNames(searchText, chat.participants)) : conversations}
                      extraData={checkedAll}
                      renderItem={({item, index}) => (
                        <ChatItem 
                          item={item}
                          selected={checkedAll}
                        />
                      )}
                      keyExtractor={(item, i) => item.channel+'-'+i}
                      style={{ width: wp('90%'), height: hp('100%')-200, backgroundColor: "#FFF", marginTop: 5 }}
                      contentContainerStyle={{ alignItems:'center'}}
                      ListFooterComponent={() => (
                        <Row style={{ width: '100%', height: 180, marginTop: 20, alignItems: 'flex-start', }}>
                          {allChatsData.next && !isLoading && <TextButton title={'Load more'} titleStyle={{ color: 'blue' }} onPress={loadMore}/>}
                          {conversations.length>0 && isLoading && <ActivityIndicator color={'blue'} size='large' />}
                        </Row>
                      )}
                      />  
                  </View>
                }
            </View>
            <Footer />
        </View>
    )
}

const ChatItem = ({ item,  selected }) => { 
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  const onViewMessages = () => { 
    navigate('Messages', { conversation: item })
   }
  return (
    <View style={styles.card}>
        {
          isSelected ?
              <Icon.Community name='checkbox-marked' size={18} onPress={() => setIsSelected(!isSelected)} style={{ marginRight: 10 }}/> :
              <Icon.Community name='checkbox-blank-outline' size={18} onPress={() => setIsSelected(!isSelected)} style={{ marginRight: 10 }} />
        }
        <View style={{ height: 60,}}>
          <Row style={{ width: '100%', justifyContent: 'flex-start',  }}>
              <Row style={{ width: '50%', justifyContent: 'flex-start' }}>
                  <Avatar
                      size={28}
                      rounded
                      source={{ uri: `${item.participants[0]?.profile_image?.split('?')[0] || null}`, }}
                  />
                  <LatoText style={{ fontFamily: 'Lato-Bold', marginLeft: 10 }} fontSize={12}>From: </LatoText>
                  <LatoText fontSize={12}>{item.participants[0]?.user?.full_name}</LatoText>
              </Row>
              <Row style={{ width: '50%', justifyContent: 'flex-start' }}>
                  <Avatar
                      size={28}
                      rounded
                      source={{ uri: `${item.participants[1]?.profile_image?.split('?')[0] || null}`, }}
                  />
                  <LatoText style={{ fontFamily: 'Lato-Bold', marginLeft: 10 }} fontSize={12}>To: </LatoText>
                  <LatoText fontSize={12}>{item.participants[1]?.user?.full_name}</LatoText>
              </Row>
          </Row>
          {/* <Row style={{ justifyContent: 'flex-start', marginTop: 8 }}>
              <LatoText fontSize={12} style={{ fontFamily: 'Lato-Bold' }}>Message: </LatoText>
              <LatoText fontSize={12}>{item.message}</LatoText>
          </Row> */}
          <Button
              title="View Messages"
              type='clear'
              onPress={onViewMessages}
              titleStyle={{ color: Colors.primaryColor, fontSize: rf(2), textDecorationLine: 'underline' }}
              buttonStyle={{ backgroundColor: "transparent", paddingHorizontal: 0  }}
              containerStyle={{  height: 40, paddingHorizontal: 0, marginLeft: -wp('15%'), marginTop: 5 }}
              TouchableComponent={TouchableOpacity}
              iconRight={true}
          />
        </View>

      </View>
  )
 }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: Colors.background,
    },
    main__view: {
        marginHorizontal: '5%'
    },
    row: {
        height: 34,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: Colors.primaryColor,
        padding: 5,
        justifyContent: 'flex-start',
        marginTop: (hp('3%'))
    },
    inputContainer: {
        height: 20,
        borderBottomWidth: 0,

    },
    inputText: {
        fontFamily: 'Lato-Regular',
        color: Colors.text,
        fontSize: 12,
    },
    card: {
        height: 90,
        width: wp('90%'),
        flexDirection: "row",
        backgroundColor: '#F7FAFC',
        borderColor: Colors.primaryColor,
        borderWidth: 1,
        borderRadius: 6,
        padding: 16,
        marginTop: 5,
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
})