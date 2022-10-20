import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Footer from "../../components/Footer";
import NavigationHeader from "../../components/NavigationHeader";
import { Button } from "react-native-elements";
import { goBack } from "../../navigations/NavigationService";
import Icon from "../../constants/Icon";
import Colors from "../../constants/Colors";
import { rf, wp, hp } from "../../constants/Constants";
import ImageCarousel from '../../components/ImageCarousel';
import LatoText from "../../components/LatoText";
import GoogleMaps from "../../components/GoogleMaps";
import Row from "../../components/Row";
import StyledDatepicker from "../../components/StyledDatepicker";
import { Check } from "../../components/Check";
import { useNavigation } from "@react-navigation/native";
import moment from 'moment';


export default function ParticularyBooking({ route }) {    
    const { item } = route.params;    
    const {
        city,
        country,
        title,
        street,
        zip_code,
        media,
        property_amenities,
        room_facilities,
        room_accessibilities,
        housing_rules,
        latitude,
        longitude
    } = item.property;
    
    const [coords, setCoords] = useState({ latitude: latitude || 0, longitude: longitude || 0 });
    const { user } = item.user
    const mediaFiles = media.map(file => file.property_media.split('?')[0]);
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <NavigationHeader />
            <View style={styles.head__btn}>
                <Button
                    title="Back To All Bookings"
                    type='clear'
                    onPress={() => goBack()}
                    icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight: 5 }} />}
                    titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold' }}
                    buttonStyle={{ backgroundColor: "transparent", }}
                    containerStyle={{ alignSelf: 'flex-start' }}
                    TouchableComponent={TouchableOpacity}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ margin: 15, marginBottom: (hp('15%')) }}>
                    <View>
                        <LatoText style={styles.heading}>{title}</LatoText>

                        <ImageCarousel images={mediaFiles} />
                        
                        <View style={styles.details}>
                            <LatoText black >Booking Details</LatoText>
                            <Row style={{ width: '100%', alignItems: 'center' ,marginTop: 12 }}>
                                <View style={{ width: '45%' }}>
                                    <DateView
                                        label={'From'}
                                        value={item.book_from}
                                        datepickerStyle={{ width: wp('40%') - 40 }}
                                        containerStyle={{ justifyContent: 'space-between', }}
                                    />
                                </View>
                                <View style={{ width: '45%' }}>
                                    <DateView
                                        label={'To'}
                                        value={item.book_to}
                                        datepickerStyle={{ width: wp('40%') - 40 }}
                                        containerStyle={{ justifyContent: 'space-between', }}
                                    />
                                </View>
                            </Row>
                            <View style={{ width: "100%", marginTop: 12}}>
                                <LatoText fontSize={rf(1.6)} color={Colors.text}style={{ marginBottom: 8 }}>Amount Paid:</LatoText>
                                <LatoText bold>{`${item.total_bill} USD (${item.total_days} nights, ${item.price_per_night} USD per night) `}</LatoText>
                            </View>
                        </View>

                        <View style={styles.subheading__container}>
                            <LatoText style={styles.sub__heading}>Location:</LatoText>
                            <LatoText>{` ${city}, ${country}`}</LatoText>
                        </View>
                    </View>
                    <View style={{ width: wp('90%') }}>
                        <GoogleMaps
                            center={coords || { latitude: 0, longitude: 0 }}
                            markers={[{
                                key: city,
                                id: city,
                                markerCoords: coords || { latitude: 0, longitude: 0 },
                                title: title,
                                description: `${city}, ${country}`
                            }]}
                            mapContainer={{ height: 185, marginTop: 5 }}
                        />
                    </View>
                    <View style={{marginTop:25}}>
                        <LatoText style={styles.sub__heading}>Amenities</LatoText>
                        {
                            property_amenities.map((item,index)=>{
                                return(
                                    <Check text={item.name} checked={true} key={index}/>
                                )
                            })
                        }
                    </View>
                    <View style={{marginTop:15}}>
                        <LatoText style={styles.sub__heading}>Facilities</LatoText>
                        {
                            room_facilities.map((item,index)=>{
                                return(
                                    <Check text={item.name} checked={true} key={index}/>
                                )
                            })
                        }
                    </View>
                    <View style={{marginTop:15}}>
                        <LatoText style={styles.sub__heading}>Accessibilities</LatoText>
                        {
                            room_accessibilities.map((item,index)=>{
                                return(
                                    <Check text={item.name} checked={true} key={index}/>
                                )
                            })
                        }
                    </View>
                    <View style={{marginTop:15}}>
                        <LatoText style={styles.sub__heading}>House Rules</LatoText>
                        {
                            housing_rules.map((item,index)=>(
                                <LatoText style={{marginTop:5}} key={item.id}>Rule # {index+1}:  {item.name}</LatoText>
                            ))
                        }
                    </View>

                    
                    <View style={{ height: 20 }}/>
                    <View style={styles.subheading__container}>
                        <LatoText style={styles.sub__heading}>Student User:</LatoText>
                        <LatoText> {user.full_name}</LatoText>
                    </View>
                    <Row style={{ padding: 15 }}>
                        <Button
                            title="Student's Profile"
                            type='clear'
                            onPress={() => goBack()}
                            titleStyle={{ color: "#2878E4", fontSize: rf(2.1), textDecorationLine: 'underline' }}
                            buttonStyle={{ backgroundColor: "transparent", }}
                            containerStyle={{ alignSelf: 'flex-start' }}
                            TouchableComponent={TouchableOpacity}
                        />
                        <Button
                            title="Contact Student"
                            type='solid'
                            onPress={() => navigation.navigate('AllChats')}
                            titleStyle={{ color: Colors.white, fontSize: rf(2.1) }}
                            buttonStyle={{ width: (wp('50%')), borderRadius: 10 }}
                            containerStyle={{ alignSelf: 'flex-start' }}
                            TouchableComponent={TouchableOpacity}
                        />
                    </Row>

                </View>
            </ScrollView>
            <Footer />
        </View>

    )
}
const DateView = ({ label, containerStyle, value: date, datepickerStyle }) => (
        <Row style={containerStyle}>
            {label && <LatoText fontSize={rf(1.6)} color={Colors.text} style={styles.text}>{label}</LatoText>}
            <View style={[styles.dateViewContainer, datepickerStyle]}>
                <Icon.Community name='calendar-range-outline' size={13} color={Colors.text}/>
                <LatoText bold fontSize={rf(1.6)} color={!date ? '#C4C4C4' : Colors.text} style={styles.dateText}>
                { !date ? 'mm/dd/yyyy' : moment(date).format('MM/DD/YYYY') }
                </LatoText>
            </View>
        </Row>

    )
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"


    },
    head__btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 10,
        bottom: 10,
        marginHorizontal: 10,
        height: 50
    },
    heading: {
        fontFamily: "Lato-Black",
        textAlign: 'center',
        fontSize: rf(3),
        marginBottom: 16,
    },
    sub__heading: {
        fontFamily: 'Lato-Bold',
        marginBottom: 10
    },
    subheading__container: {
        flexDirection: 'row',
        marginTop: 15,
        width: (wp('70%'))
    },
    dateViewContainer: {
        height: 30,
        borderWidth: 2,
        borderColor: Colors.secondaryColor,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      dateText: {
        marginHorizontal: 8
      },
      details: {
        width: wp('90%'),
        paddingHorizontal: 12,
        paddingBottom: 16,
        paddingTop:10,
        borderWidth: 2,
        borderColor:Colors.primaryColor,
        borderRadius: 6,
        marginTop: hp('4%'),
        marginBottom: hp('2%'),
        backgroundColor: "#F7FAFC"
      },
    
})