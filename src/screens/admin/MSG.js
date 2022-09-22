import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image } from "react-native"
import Footer from "../../components/Footer";
import LatoText from "../../components/LatoText";
import NavigationHeader from "../../components/NavigationHeader";
import Colors from "../../constants/Colors";
import { Avatar, Button, Divider } from "react-native-elements";
import Icon from "../../constants/Icon";
import { hp, rf, wp } from "../../constants/Constants";
import Row from "../../components/Row";
import { goBack } from "../../navigations/NavigationService";
// import ChatRightSlider from "../../components/ChatRightSlider";
import { useMessages } from "../../services/PubNubChat";
import ReactNativeModal from 'react-native-modal';


const SLIDER_WIDTH = wp('50%');
const AVATAR_WIDTH = wp('25%');

export default function MSG() {
    const dummyMsg = [
        {
            day: 'today',
            message:
                `Hello. i'am available from chat`,
            currentUserMsg:
                `is property availabe for a long period of time (28 days in October?)`,
        },
        {
            message: 'Yes, Sure',
            currentUserMsg: null
        },
        {
            message: 'Call me to get more details.',
            currentUserMsg:
                'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
        },
        {
            message: 'Yes , Sure',
            currentUserMsg: null
        },
        {
            message: 'Call me to get more details',
            currentUserMsg: null
        },
        {
            message: 'Yes , Sure',
            currentUserMsg: 'Velit esse cillum dolore eu fugiat nulla pariatur.'
        },
    ];

    const dummyimg = [
        { imgurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpe6whx0r3s65SfyBn9l-2HrN93b8aijxTh5xVFbZg&s' },
        { imgurl: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?cs=srgb&dl=pexels-pixabay-280222.jpg&fm=jpg' },
        { imgurl: 'https://cdn.pixabay.com/photo/2017/07/08/02/16/house-2483336__340.jpg' },
        { imgurl: 'https://static3.depositphotos.com/1000647/119/i/600/depositphotos_1191873-stock-photo-house.jpg' },
        { imgurl: 'https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972__340.jpg' },
    ]

    const [showSettingSlider, setShowSettingSlider] = useState(false);


    const ChatHeader = ({ isOnline, name, onPressSetting, closeChatbox }) => {
        return (
            <View style={styles.searchbarContainer}>
                <Row style={styles.searchBar}>
                    <LatoText bold>
                        {isOnline && <Icon.FontAwesome name='circle' size={rf(1.2)} color={'#03B048'} style={{ textAlignVertical: 'center' }} />}
                        {`  ${name}`}
                    </LatoText>
                    <Row style={{ justifyContent: 'flex-end', }}>
                        <Icon.Ionicon name='settings-outline' size={rf(2.4)} color={Colors.primaryColor} onPress={onPressSetting} />
                    </Row>
                </Row>
            </View>

        );
    };

    const {
        messageList,
        mediaFiles,
        channelName,
        lastMsgTimeToken,
        isOnline,
        sendMessage,
        sendFile
    } = useMessages();


    const closeModal = () => {
        setShowSettingSlider(false)
    }
    return (
        <View style={styles.container}>
            <NavigationHeader />
            <View style={styles.main__view}>
                <Button
                    title="All Chats"
                    type='clear'
                    onPress={() => goBack()}
                    icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight: 5 }} />}
                    titleStyle={{ color: Colors.text, fontSize: rf(2.5), fontFamily: 'Lato-Bold' }}
                    buttonStyle={{ backgroundColor: "transparent", }}
                    containerStyle={{ alignSelf: 'flex-start' }}
                    TouchableComponent={TouchableOpacity}
                />
                <View style={styles.chat__box}>
                    <ChatHeader name={'Edward Evins/ John Doe'} onPressSetting={() => setShowSettingSlider(true)} />
                    {/* slider */}

                    <ReactNativeModal
                        isVisible={showSettingSlider}
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
                        <View style={{ width: SLIDER_WIDTH, height: hp('70%'), padding: 16, backgroundColor: '#FFF', marginTop: (hp('3%')) }}>
                            <Row style={{ width: '100%', height: 25, marginBottom: 10, justifyContent: 'flex-end', }}>
                                <Icon.Ionicon name='close' size={20} color={Colors.text} onPress={closeModal} />
                            </Row>
                            <Row>
                                <LatoText>Chat settings</LatoText>
                                <Icon.Ionicon name="add" size={17} color={Colors.primaryColor} />
                            </Row>
                            <Row style={{ marginTop: 10 }}>
                                <LatoText>Shared media</LatoText>
                                <Icon.Ionicon name="remove" size={17} color={Colors.primaryColor} />
                            </Row>
                            <Row style={{flexWrap:'wrap',justifyContent:'flex-start'}}>
                                {
                                    dummyimg.map((item, index) => {
                                        return (
                                            <Image source={{ uri: item.imgurl }} style={{ width: wp('12.5%'), height: wp('10%'),margin:2 }} key={index} />
                                        )
                                    })
                                }
                            </Row>


                        </View>
                    </ReactNativeModal>
                    {/* slider */}

                    <FlatList
                        keyExtractor={(item, index) => 'key' + index}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        data={dummyMsg}
                        renderItem={({ item, index }) => {
                            return (
                                <>
                                    <View style={{ justifyContent: 'space-between' }}>
                                        {item.day ? (
                                            <View
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    top: 20,
                                                    marginBottom: 20,
                                                }}>
                                                <Divider
                                                    style={{
                                                        width: '40%',
                                                        borderColor: Colors.background,
                                                        shadowColor: Colors.background,
                                                        borderWidth: 1,
                                                    }}
                                                />
                                                <LatoText style={{ padding: 7 }}>Today</LatoText>

                                                <Divider
                                                    style={{
                                                        width: '40%',
                                                        borderColor: Colors.background,
                                                        shadowColor: Colors.background,
                                                        borderWidth: 1,
                                                    }}
                                                />
                                            </View>
                                        ) : null}
                                        <View
                                            style={{
                                                marginTop: 20,
                                                marginBottom: 20,
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                            }}
                                            key={index}>
                                            <Avatar
                                                size="small"
                                                rounded
                                                source={{ uri: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80`, }}
                                            />
                                            <View
                                                style={{
                                                    backgroundColor: '#F2F2F2',
                                                    padding: 7,
                                                    borderRadius: 10,
                                                    marginLeft: 10
                                                }}>

                                                <LatoText style={{ lineHeight: 15 }}>{item.message}</LatoText>
                                            </View>
                                        </View>
                                        {item.currentUserMsg ? (
                                            <View
                                                style={{
                                                    alignItems: 'flex-end',
                                                    marginLeft: 50,
                                                    flexDirection: 'row',
                                                    marginRight: 35
                                                }}>

                                                <View
                                                    style={{
                                                        backgroundColor: '#C3FFDB',
                                                        padding: 7,
                                                        borderRadius: 10,
                                                        marginRight: 10

                                                    }}>
                                                    <LatoText style={{ lineHeight: 15 }}>{item.currentUserMsg}</LatoText>
                                                </View>
                                                <Avatar
                                                    size="small"
                                                    rounded
                                                    source={{ uri: `data:image/jpeg;base64,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`, }}
                                                />
                                            </View>
                                        ) : null}
                                    </View>
                                </>
                            );
                        }}
                    />

                </View>


            </View>
            <Footer />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        justifyContent: 'flex-start',



    },
    main__view: { marginHorizontal: '5%' },
    chat__box: {
        height: hp('70%'), marginTop: (hp('3%')), borderRadius: 6,
        backgroundColor: '#FCFCFC'
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
    modal: {
        alignItems: 'flex-end',
        margin: 0,
    },
    label: {
        fontSize: rf(1.9)
    },

})