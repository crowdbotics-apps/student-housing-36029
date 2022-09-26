import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Footer from "../../components/Footer";
import NavigationHeader from "../../components/NavigationHeader";
import { Button } from "react-native-elements";
import { goBack } from "../../navigations/NavigationService";
import Icon from "../../constants/Icon";
import Colors from "../../constants/Colors";
import { rf } from "../../constants/Constants";
import ImageCarousel from '../../components/ImageCarousel';
import { usePropertyDetails } from "../../redux/reducers/PropertyReducer";

export default function ParticularyBooking(){

    const media=[
        {property_media:"https://www.investopedia.com/thmb/yykxeXgS1D1U8NHWKTbWo0jaMRA=/680x440/filters:fill(auto,1)/houses_and_land-5bfc3326c9e77c0051812eb3.jpg"},
        {property_media:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"},        
        {property_media:"https://www.investopedia.com/thmb/yykxeXgS1D1U8NHWKTbWo0jaMRA=/680x440/filters:fill(auto,1)/houses_and_land-5bfc3326c9e77c0051812eb3.jpg"},
        {property_media:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvcGVydHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"},        
    ]
    const mediaFiles = media.map(file => file.property_media); 
    return(
        <View style={styles.container}>
            <NavigationHeader/>
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
                <ImageCarousel images={mediaFiles}/>
            <Footer/>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
    },
    head__btn:{ flexDirection: 'row', justifyContent: 'space-between', top: 10, bottom: 10, marginHorizontal: 10 }
})