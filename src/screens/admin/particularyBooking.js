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
    const { city, country, title, street, zip_code,media,property_amenities,room_facilities,housing_rules,latitude,longitude } = item.property
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
                    titleStyle={{ color: Colors.text, fontSize: rf(2.5), fontFamily: 'Lato-Black' }}
                    buttonStyle={{ backgroundColor: "transparent", }}
                    containerStyle={{ alignSelf: 'flex-start' }}
                    TouchableComponent={TouchableOpacity}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={{ margin: 15, marginBottom: (hp('15%')) }}>
                    <View>
                        <LatoText style={styles.heading}>Property Name</LatoText>
                        <ImageCarousel images={mediaFiles} />
                        <View style={styles.subheading__container}>
                            <LatoText style={styles.sub__heading}>Location:</LatoText>
                            <LatoText>{` ${city} , ${country}`}</LatoText>
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
                            mapContainer={{ height: 185, marginTop: 16 }}
                        />
                    </View>
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
                            onPress={() => navigation.navigate('Allchats')}
                            titleStyle={{ color: Colors.white, fontSize: rf(2.1) }}
                            buttonStyle={{ width: (wp('50%')), borderRadius: 10 }}
                            containerStyle={{ alignSelf: 'flex-start' }}
                            TouchableComponent={TouchableOpacity}
                        />
                    </Row>
                    <View style={styles.subheading__container}>
                        <LatoText style={styles.sub__heading}>Amount paid:</LatoText>
                        <LatoText>{` ${item.total_bill} Usd (${item.total_days} Nights, ${item.price_per_night} Usd per Night) `}</LatoText>
                    </View>
                    <Row style={{ alignItems: 'center',marginTop:15 }}>
                        <View style={{ width: wp('42%') }}>
                            <StyledDatepicker
                                label={'From'}
                                value={item.book_from}
                                datepickerStyle={{ width: wp('40%') - 30 }}
                                containerStyle={{ justifyContent: 'flex-start', }}
                            />
                        </View>
                        <View style={{ width: wp('42%') }}>
                            <StyledDatepicker
                                label={'To'}
                                value={item.book_to}
                                datepickerStyle={{ width: wp('40%') - 30 }}
                                containerStyle={{ justifyContent: 'flex-start', }}
                            />
                        </View>
                    </Row>
                    <View style={{marginTop:15}}>
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
                        <LatoText style={styles.sub__heading}>House Rules</LatoText>
                        {
                            housing_rules.map((item,index)=>{
                                return(
                                    <LatoText style={{marginTop:5}}>Rule # {index+1} {item.name}  <Icon.Ionicon name="pencil-outline" size={19} color={Colors.primaryColor}/></LatoText>
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
            <Footer />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"


    },
    head__btn: { flexDirection: 'row', justifyContent: 'space-between', top: 10, bottom: 10, marginHorizontal: 10 },
    heading: { fontFamily: "Lato-Bold", textAlign: 'center', fontSize: 17, marginBottom: 10, marginTop: 10 },
    sub__heading: { fontFamily: 'Lato-Bold' },
    subheading__container: { flexDirection: 'row', marginTop: 15,width:(wp('70%')) }
})