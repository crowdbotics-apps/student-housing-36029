import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Footer from '../../components/Footer';
import GoogleMaps from '../../components/GoogleMaps';
import ImageCarousel from '../../components/ImageCarousel';
import LatoText from '../../components/LatoText';
import NavigationHeader from '../../components/NavigationHeader';
import Row from '../../components/Row';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import { FACILITY_ICONS } from '../../constants/Data';
import Icon from '../../constants/Icon';
import { goBack } from '../../navigations/NavigationService';
import { usePropertyDetails } from '../../redux/reducers/OwnerReducer';
import { GeocodeAddress } from '../../services/Geocoding';


export default function OwnerPropertyDetails() {
  const details = usePropertyDetails();
  const {
    id,
    title,
    media = [],
    city,
    country,
    latitude, longitude,
    room_facilities,
    property_amenities,
    room_accessibilities,
    housing_rules,
    type,
  } = details;

  const mediaFiles = media.map(file => file.property_media.split('?')[0]); 
  const [coords, setCoords] = useState({ latitude: latitude || 0.0, longitude: longitude || 0.0 });
   
   useEffect(() => {
    if(coords.latitude === 0.0) {
      GeocodeAddress(city, ({lat,lng}) => setCoords({ latitude: lat, longitude: lng }))
    }
   }, [coords]);

    return (
      <View style={styles.container}>
        <NavigationHeader />

        <ScrollView
          contentContainerStyle={{
            width: wp("100%"),
            alignItems: "center",
            justifyContent: 'flex-start',
            paddingBottom: 0,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Button
            title={'Property Details'}
            type='clear'
            onPress={() => goBack()}
            icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight:5, marginLeft:-5 }}/>}
            titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold', }}
            buttonStyle={{ backgroundColor: "transparent", }}
            containerStyle={{ marginVertical: hp('1%'), alignSelf: 'flex-start', marginHorizontal: wp('5%') }}
            TouchableComponent={Pressable}
            />  

          <Row style={{ justifyContent: 'center', width: '100%', marginBottom: 15 }}>
            <LatoText black fontSize={rf(2.5)}>{title}</LatoText>
          </Row>

          <ImageCarousel images={mediaFiles} />

          <View style={{ width: wp('90%'), marginTop: 24, }}>
            <LatoText style={styles.text}> <LatoText bold style={styles.heading} >{`Location:`}</LatoText> {`${city}, ${country}`} </LatoText>
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

          <View style={{ width: wp('90%'), marginTop: 24, }}>
            <LatoText bold style={styles.heading} >{`Facilities:`}</LatoText>
            {
              room_facilities?.length !== 0 && 
              <Row style={{ width: wp('90%'), flexWrap: 'wrap', justifyContent: 'flex-start', }}>
                {
                  room_facilities?.map(({ name }) => <Facility name={name} key={name} />)
                }
              </Row>
            }
          </View>

          <View style={{ width: wp('90%'), marginTop: 24, }}>
            <LatoText bold style={styles.heading} >{`Amenities:`}</LatoText>
            {
              property_amenities?.length !== 0 && 
              <Row style={{ width: wp('90%'), flexWrap: 'wrap', justifyContent: 'flex-start', }}>
                {
                  property_amenities?.map(({ name }) => <Facility name={name} key={name} />)
                }
              </Row>
            }
          </View>

          <View style={{ width: wp('90%'), marginTop: 24, }}>
            <LatoText bold style={styles.heading} >{`Accessibilities:`}</LatoText>
            {
              room_accessibilities?.length !== 0 && 
              <View style={{ width: wp('90%'), justifyContent: 'flex-start', }}>
                {
                  room_accessibilities?.map(({ name }) => <Accessibility name={name} key={name} />)
                }
              </View>
            }
          </View>

          <View style={{ width: wp('90%'), marginTop: 24, }}>
            <LatoText bold style={styles.heading} >{`House Rules:`}</LatoText>
            {
              housing_rules?.map(({ id, name }, i) => <LatoText fontSize={rf(1.8)}>Rule # {i+1}:  {name}</LatoText>)
            }
          </View>

          <View style={{ width: wp('90%'), marginTop: 24, }}>
          <LatoText style={styles.text}> <LatoText bold style={styles.heading} >{`Property Type:`}</LatoText> {`${type}`} </LatoText>
          </View>
          
          {/* <Row style={{ width: wp('85%'), height: 50, marginVertical: 30, alignItems: 'center', }}>
            <TextButton 
              title='Student’s  Profile' 
              titleStyle={{ color: Colors.primaryColor }} 
              containerStyle={{ height:40 }}
              onPress={() => {}}
              />
            <Button
              title={'Contact Student'}
              type='solid'
              onPress={() => {}}
              titleStyle={{ color: Colors.white, fontSize: rf(1.6), fontFamily: 'Lato-Bold', }}
              buttonStyle={{ backgroundColor: Colors.primaryColor, width: wp('40%'),height: 35, borderRadius: 6, padding: 0 }}
              containerStyle={{ width: wp('40%'), height: 35,borderRadius: 6, marginBottom: 20,  }}
              />   
          </Row> */}

          <View style={{ height: 100 }} />
             
        </ScrollView>

        <Footer />

      </View>
    )
}

const Facility = ({ name }) => { 
  return (
    <Row style={{ justifyContent: 'flex-start', width: '33%', height: 30 }}>
      {FACILITY_ICONS[name]}
      <LatoText fontSize={rf(1.8)} style={{ marginLeft: 10 }}>{name}</LatoText>
    </Row>
  )
}
 const Accessibility = ({ name }) => { 
  return (
    <Row style={{ justifyContent: 'flex-start', width: '100%', height: 30 }}>
      {FACILITY_ICONS[name]}
      <LatoText fontSize={rf(1.8)} style={{ marginLeft: 10 }}>{name}</LatoText>
    </Row>
  )
}
const Check = ({ text, checked }) => { 
  return (
    <Row style={{ justifyContent: 'flex-start', width: '100%', height: 30 }}>
      {
        checked ? 
        <Icon.Community name='checkbox-marked' size={20} color={Colors.text} /> 
        :
        <Icon.Community name='checkbox-blank-outline' size={20} color={Colors.text} />
      }
      
    </Row>
  )
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  details: {
    width: wp('90%'),
    padding: 12,
    borderWidth: 2,
    borderColor:Colors.primaryColor,
    borderRadius: 12,
    marginTop: hp('2%'),
    backgroundColor: "#F7FAFC"
  },
  heading: {
    fontSize: rf(1.9),
    marginBottom: 15
  },
  label: {
    fontSize: rf(1.6),
    textAlign: "left",
    lineHeight: 26
  },
  value: {
    fontSize: rf(1.6),
    textAlign: "left"
  },
  text: {
    fontSize: rf(1.8)
  }
})