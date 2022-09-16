import React from "react";
import { View, StyleSheet } from 'react-native';
import NavigationHeader from "../../components/NavigationHeader";
import Colors from "../../constants/Colors";
import Footer from "../../components/Footer";
import LatoText from "../../components/LatoText";
import Row from "../../components/Row";
import { Avatar, Input, Button } from "react-native-elements";
import Icon from "../../constants/Icon";
import { hp, wp, rf } from "../../constants/Constants";
import { Check } from "../../components/Check";
import { ScrollView } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";


export default function Allchats() {
    const navigation = useNavigation();
    const [checked, setchecked] = useState(true);
    const Apidata = [
        {
            From: "Jhon Doe",
            To: "Jhon Doe",
            message: "Velit esse cillum dolore fugiat nulla pariatur",
            Fromimgurl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            Toimgurl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            From: "Jhon Doe",
            To: "Jhon Doe",
            message: "Velit esse cillum dolore fugiat nulla pariatur",
            Fromimgurl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            Toimgurl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            From: "Jhon Doe",
            To: "Jhon Doe",
            message: "Velit esse cillum dolore fugiat nulla pariatur",
            Fromimgurl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            Toimgurl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            From: "Jhon Doe",
            To: "Jhon Doe",
            message: "Velit esse cillum dolore fugiat nulla pariatur",
            Fromimgurl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            Toimgurl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            From: "Jhon Doe",
            To: "Jhon Doe",
            message: "Velit esse cillum dolore fugiat nulla pariatur",
            Fromimgurl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            Toimgurl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            From: "Jhon Doe",
            To: "Jhon Doe",
            message: "Velit esse cillum dolore fugiat nulla pariatur",
            Fromimgurl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            Toimgurl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            From: "Jhon Doe",
            To: "Jhon Doe",
            message: "Velit esse cillum dolore fugiat nulla pariatur",
            Fromimgurl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            Toimgurl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            From: "Jhon Doe",
            To: "Jhon Doe",
            message: "Velit esse cillum dolore fugiat nulla pariatur",
            Fromimgurl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            Toimgurl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            From: "Jhon Doe",
            To: "Jhon Doe",
            message: "Velit esse cillum dolore fugiat nulla pariatur",
            Fromimgurl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            Toimgurl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
            From: "Jhon Doe",
            To: "Jhon Doe",
            message: "Velit esse cillum dolore fugiat nulla pariatur",
            Fromimgurl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
            Toimgurl: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
    ]
    return (
        <View style={styles.container}>
            <NavigationHeader />
            <View style={styles.main__view}>
                <LatoText fontSize={16} style={{ fontFamily: 'Lato-Bold', marginTop: 10 }}>All Chats</LatoText>
                <Row style={styles.row} >
                    <Icon.FontAwesome name='search' size={16} color={Colors.text} style={{ left: 5 }} />
                    <Input
                        containerStyle={{ height: 20 }}
                        inputContainerStyle={styles.inputContainer}
                        inputStyle={[styles.inputText]}
                        rightIcon={<Icon.Material name='arrow-drop-down' size={16} />}
                        placeholder={'Search for booking'}
                        placeholderTextColor={Colors.text}
                    />
                </Row>
                <View style={{ marginTop: hp('5%') }}>
                    <Check text="Select all" checked={checked} onChange={() => { setchecked(!checked) }} />
                    <ScrollView showsVerticalScrollIndicator={false} style={{ height: (hp('54%'))}}>
                        {
                            Apidata.map((item,index) => {
                                return (
                                    <View style={styles.card} key={index}>
                                        <Row>
                                            <Row style={{ width: '50%', justifyContent: 'center' }}>
                                                <Avatar
                                                    size={23}
                                                    rounded
                                                    source={{ uri: `${item.Fromimgurl}`, }}
                                                />
                                                <LatoText style={{ fontFamily: 'Lato-Bold', marginLeft: 10 }} fontSize={12}>From:</LatoText>
                                                <LatoText fontSize={12}>{item.From}</LatoText>
                                            </Row>
                                            <Row style={{ width: '50%', justifyContent: 'center' }}>
                                                <Avatar
                                                    size={23}
                                                    rounded
                                                    source={{ uri: `${item.Toimgurl}`, }}
                                                />
                                                <LatoText style={{ fontFamily: 'Lato-Bold', marginLeft: 10 }} fontSize={12}>To:</LatoText>
                                                <LatoText fontSize={12}>{item.To}</LatoText>
                                            </Row>
                                        </Row>
                                        <Row>
                                            {
                                                checked ?
                                                    <Icon.Community name='checkbox-marked' size={14} /> :
                                                    <Icon.Community name='checkbox-blank-outline' size={14} />
                                            }
                                            <LatoText fontSize={12} style={{ fontFamily: 'Lato-Bold' }}>Message Body: </LatoText>
                                            <LatoText fontSize={12}>{item.message}</LatoText>
                                        </Row>
                                        <Button
                                            title="View Messages"
                                            type='clear'
                                            onPress={() => navigation.navigate('MSG')}
                                            icon={<Icon.Community name='arrow-top-right' size={16} color={Colors.primaryColor} />}
                                            titleStyle={{ color: Colors.primaryColor, fontSize: rf(2), textDecorationLine: 'underline' }}
                                            buttonStyle={{ backgroundColor: "transparent", }}
                                            containerStyle={{ alignSelf: 'flex-start', left: 20, bottom: 5 }}
                                            TouchableComponent={TouchableOpacity}
                                            iconRight={true}
                                        />

                                    </View>

                                )
                            })
                        }


                    </ScrollView>

                </View>

            </View>
            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: Colors.background,
    },
    main__view: { marginHorizontal: '5%' },
    row: {
        height: 34,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: Colors.primaryColor,
        padding: 5,
        justifyContent: 'flex-start',
        marginTop: (hp('5%'))
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
    card: { height: (hp('10%')), width: (wp('90%')), backgroundColor: '#F7FAFC', borderColor: Colors.primaryColor, borderWidth: 1, borderRadius: 6, padding: '3%', marginTop: 5 },
})