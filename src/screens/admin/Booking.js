import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Pressable, ScrollView } from 'react-native';
import { goBack } from '../../navigations/NavigationService';
import NavigationHeader from "../../components/NavigationHeader";
import Colors from "../../constants/Colors";
import Footer from "../../components/Footer";
import { Button, Input } from "react-native-elements";
import Icon from "../../constants/Icon";
import { rf, wp, hp } from "../../constants/Constants";
import Row from "../../components/Row";
import LatoText from "../../components/LatoText";
import { useNavigation } from '@react-navigation/native';

export default function Booking() {
    const navigation = useNavigation();
    const BookingData = [
        {
            id: 0,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 1,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 2,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 3,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 4,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 5,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 6,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 7,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 8,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 9,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 10,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 11,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 12,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
    ]
    return (
        <View style={styles.container}>
            <NavigationHeader />
            <View style={styles.main__view}>
                <Row style={{ top: 10 }}>
                    <Button
                        title="Bookings"
                        type='clear'
                        onPress={() => goBack()}
                        icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight: 5 }} />}
                        titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold' }}
                        buttonStyle={{ backgroundColor: "transparent", }}
                        containerStyle={{ alignSelf: 'flex-start' }}
                        TouchableComponent={TouchableOpacity}
                    />
                    <Row style={styles.row} >
                        <Icon.FontAwesome name='search' size={16} color={Colors.text} style={{ left: 5 }} />
                        <Input
                            containerStyle={{ width: 150, height: 20 }}
                            inputContainerStyle={styles.inputContainer}
                            inputStyle={[styles.inputText]}
                            rightIcon={<Icon.Material name='arrow-drop-down' size={16} style={{ right: 5 }} />}
                            placeholder={'Search for booking'}
                            placeholderTextColor={Colors.text}
                        />
                    </Row>

                </Row>

                <ScrollView showsVerticalScrollIndicator={false} style={{ height: (hp('70%')), top: 20 }}>
                    {
                        BookingData.map((item, index) => {
                            return (
                                <View style={styles.bookingdetails} key={index}>
                                    <Image source={{ uri: item.imgurl }} style={{ width: (wp('30%')) }} />
                                    <View style={{ flexDirection: 'column', left: 10, justifyContent: 'space-around' }} >
                                        <LatoText style={{ fontFamily: 'Lato-Bold' }}>Property Name   <Icon.FontAwesome name="star" size={12} color='#F2BF07' /><Icon.FontAwesome name="star" size={12} color='#F2BF07' /><Icon.FontAwesome name="star" size={12} color='#F2BF07' /><Icon.FontAwesome name="star" size={12} color='#F2BF07' /><Icon.FontAwesome name="star" size={12} color='#F2BF07' /></LatoText>
                                        <LatoText>Student: {item.studentname}</LatoText>
                                        <Pressable onPress={()=>{navigation.navigate('Allchats')}}><LatoText style={{ fontFamily: 'Lato-Bold', color: '#0965E0', textDecorationLine: 'underline' }}>View Booking Details</LatoText></Pressable>
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', left: 3 }} >
                                        <Icon.Material name="edit" size={15} color={'#0965E0'} />
                                        <LatoText></LatoText>
                                        <Icon.Material name="delete-outline" size={15} color={'#0965E0'} />
                                    </View>
                                </View>

                            )
                        })
                    }
                </ScrollView>


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
    row: {
        height: 34,
        width: 160,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: Colors.primaryColor,
        padding: 5,
    },
    inputContainer: {
        height: 20,
        borderBottomWidth: 0,

    },
    inputText: {
        fontFamily: 'Lato-Regular',
        color: Colors.text,
        fontSize: 12
    },
    main__view: { marginHorizontal: '5%' },
    bookingdetails: {
        backgroundColor: 'white', height: (hp('10%')), width: '98%', flexDirection: 'row', padding: '2%', justifyContent: 'space-between', marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        elevation: 8,
        
        
    },

})