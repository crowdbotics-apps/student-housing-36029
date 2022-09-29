import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Pressable, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { goBack, navigate } from '../../navigations/NavigationService';
import NavigationHeader from "../../components/NavigationHeader";
import Colors from "../../constants/Colors";
import Footer from "../../components/Footer";
import { Button, Input } from "react-native-elements";
import Icon from "../../constants/Icon";
import { rf, wp, hp } from "../../constants/Constants";
import Row from "../../components/Row";
import LatoText from "../../components/LatoText";
import { useNavigation } from '@react-navigation/native';
import { fetchAllBookings } from "../../redux/sagas/bookings/fetchSaga";
import { useDispatchEffect } from "../../utilities/hooks";
import { useIsLoading, useBookings } from "../../redux/reducers/BookingsReducer";
import ListEmpty from "../../components/ListEmpty";
import PropertyLoader from "../../components/PropertyLoader";

export default function Booking() {
    const isLoading = useIsLoading();
    const bookingsData = useBookings();
    const [bookingData, setBookingData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigation = useNavigation();
    console.log("Search", searchTerm)

    useDispatchEffect(fetchAllBookings, null, bookingData.length === 0);
    useEffect(() => {
        if (bookingsData && bookingsData.results) {
            const allBookings = bookingsData.results || [];
            setBookingData(bookingData.concat(allBookings));
            // console.log("Property Console",bookingData[0].property.media[1].property_media)
        }
    }, [bookingsData]);
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
                            placeholder={'Search'}
                            placeholderTextColor={Colors.text}
                            onChangeText={(value) => { setSearchTerm(value) }}
                        />
                    </Row>
                </Row>
            </View>

            {
                isLoading ? 
                <ActivityIndicator color={'blue'} size='large' style={{ height: hp('80%')}}/>
                :
                <FlatList
                    data={searchTerm.length ? bookingData.filter(val => val.property.title.toLowerCase().includes(searchTerm.toLowerCase())) : bookingData}
                    renderItem={({item, index}) => (
                    <BookingItem data={item} />
                    )}
                    keyExtractor={(item, i) => item.id}
                    style={{ width: '100%', height: '100%', marginTop: 20 }}
                    contentContainerStyle={{ alignItems: 'center', }}
                    ListEmptyComponent={() => <ListEmpty text='No items to display' height={hp('70%')} />}
                    ListFooterComponent={() => <View style={{ height: 100 }} />}
                    />  
            }

            <Footer />
        </View>

    )
}

function BookingItem({ data }) {
    let image = data?.property.media[0].property_media.split('?');

    return (
        <View style={styles.bookingdetails}>
            <Image source={{ uri: image[0] }} style={{ width: wp('30%'), height: 80  }} />
            <View style={{ width: wp('40%'), justifyContent: 'space-around' }}>
                <LatoText black fontSize={rf(2.2)}>{data?.property.title}</LatoText>
                <LatoText>Student: {data?.user.user.name}</LatoText>
                <Pressable onPress={() => navigate('BookingDetails', { item: data })}>
                    <LatoText bold style={{ color: '#0965E0', textDecorationLine: 'underline' }}>
                        View Booking Details
                    </LatoText>
                </Pressable>
            </View>
            <View style={{ justifyContent: 'space-around', }}>
                <Icon.Material name="edit" size={16} color={'#0965E0'} />
                <LatoText> </LatoText>
                <Icon.Material name="delete-outline" size={18} color={'#0965E0'} />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: Colors.background,
    },
    row: {
        height: 34,
        width: '50%',
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
    main__view: { 
        marginHorizontal: '5%' 
    },
    bookingdetails: {
        backgroundColor: 'white',
        height: 'auto',
        width: wp('90%'),
        flexDirection: 'row',
        padding: wp('2%'),
        justifyContent: 'space-between',
        marginTop: 10,
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

