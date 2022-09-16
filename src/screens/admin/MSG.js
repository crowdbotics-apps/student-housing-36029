import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native"
import Footer from "../../components/Footer";
import LatoText from "../../components/LatoText";
import NavigationHeader from "../../components/NavigationHeader";
import Colors from "../../constants/Colors";
import { Avatar, Button } from "react-native-elements";
import Icon from "../../constants/Icon";
import { hp, rf } from "../../constants/Constants";
import Row from "../../components/Row";
import ChatBox from "../../components/ChatBox";

export default function MSG() {
    const Chat = [
        {
            id: 1,
            sender: true,
            reciver: false,
            message: `Hello. i'am available fro chat`,
            timestamp: new Date()
        },
        {
            id: 2,
            sender: false,
            reciver: true,
            message: `is property availabe for a long period of time (28 days in October?)`,
            timestamp: new Date()
        },
        {
            id: 3,
            sender: true,
            reciver: false,
            message: `Yes, Sure`,
            timestamp: new Date()
        },
        {
            id: 4,
            sender: true,
            reciver: false,
            message: `Call me to get more details.`,
            timestamp: new Date()
        },
        {
            id: 5,
            sender: false,
            reciver: true,
            message: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat`,
            timestamp: new Date()
        },
        {
            id: 6,
            sender: true,
            reciver: false,
            message: `Yes, Sure`,
            timestamp: new Date()
        },
        {
            id: 7,
            sender: true,
            reciver: false,
            message: `Call me to get more details.`,
            timestamp: new Date()
        },
        {
            id: 8,
            sender: true,
            reciver: false,
            message: `Velit esse cillum dolore eu fugiat nulla pariatur. `,
            timestamp: new Date()
        },


    ]
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
                    <Row style={styles.chat__header}>
                        <LatoText style={{ fontFamily: 'Lato-Bold', left: 20 }}>Edward Evins/ John Doe</LatoText>
                        <Icon.Ionicon name="settings" size={16} color={Colors.primaryColor} style={{ right: 10 }} />
                    </Row>
                    <Row style={{justifyContent:'flex-start',margin:'5%'}}>
                        <Avatar
                            size="small"
                            rounded
                            source={{ uri: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80`, }}
                        />
                        <View style={{width:Chat[0].message.length * 3,height:Chat[0].message.length * 1.5,backgroundColor:'#F2F2F2',borderRadius:6,padding:'2%',left:10}}>
                        <LatoText fontSize={12}>{Chat[0].message} </LatoText>
                        </View>
                    </Row>
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
        shadowColor: '#F7FAFC',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 1,
    },
    chat__header: {
        backgroundColor: "#F7FAFC",
        height: 40,
        padding: '2%',
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomWidth: 1,
        borderBottomColor: Colors.primaryColor
    }

})