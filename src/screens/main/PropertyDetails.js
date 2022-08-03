import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Button, Image } from 'react-native-elements';
import images from '../../assets/images';
import Balcony from '../../assets/svg/Balcony';
import ChildCare from '../../assets/svg/ChildCare';
import PrivateBathroom from '../../assets/svg/PrivateBathroom';
import Sofa from '../../assets/svg/Sofa';
import Terrace from '../../assets/svg/Terrace';
import Footer from '../../components/Footer';
import HeartButton from '../../components/HeartButton';
import ImageCarousel from '../../components/ImageCarousel';
import LatoText from '../../components/LatoText';
import NavigationHeader from '../../components/NavigationHeader2';
import PrimaryButton from '../../components/PrimaryButton';
import Row from '../../components/Row';
import StyledDatepicker from '../../components/StyledDatepicker';
import { TextButton } from '../../components/TextButton';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import { CHECKS, IMAGES } from '../../constants/Data';
import Icon from '../../constants/Icon';
import { goBack } from '../../navigations/NavigationService';

export default function PropertyDetails() {
  const [favourite, setFavourite] = useState(false);

  const onFavourite = (val) => { 
    setFavourite(val); 
   }

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
            titleStyle={{ color: Colors.text, fontSize: rf(1.8), fontFamily: 'Lato-Bold', }}
            buttonStyle={{ backgroundColor: "transparent", }}
            containerStyle={{ marginVertical: hp('1%'), alignSelf: 'flex-start', marginHorizontal: wp('5%') }}
            TouchableComponent={Pressable}
            />  

          <Row style={{ justifyContent: 'center', width: '100%', marginBottom: hp('2%') }}>
            <LatoText black fontSize={rf(2.2)}>{`Property Name`}</LatoText>
            <HeartButton 
              onToggle={(val) => onFavourite()}
              isSelected={favourite}
              size={rf(2.2)}
              containerStyle={{ position: 'absolute', right: wp('5%'), width: rf(2.4), }}
              />
          </Row>

          <ImageCarousel images={IMAGES} />

          <View style={styles.details}>
             <LatoText bold style={styles.heading} >{`Booking Details:`}</LatoText>
             <Row style={{ }}>
                <View style={{ width: '50%' }}>
                  <StyledDatepicker 
                  label={'From'}
                  datepickerStyle={{ width: 160 }}  
                  containerStyle={{ width: '100%', justifyContent: 'flex-start', }}
                  />
                  <Detail label={'Price Per Night:'} value={"$54 per night"}/>
                  <Detail label={'Check-In Date:'} value={"09/22/2021 (2 PM)"}/>
                </View>
                <View style={{ width: '50%' }}>
                  <StyledDatepicker 
                    label={'To'}
                    datepickerStyle={{ width: 160 }}  
                    containerStyle={{ width: '100%', justifyContent: 'flex-start', }}
                    />
                  <Detail label={'Total Per Chosen Period:'} value={"$108"}/>
                  <Detail label={'Check-Out Date:'} value={"09/24/2021 (11 AM)"}/>
                </View>
             </Row>
             <PrimaryButton
              title={'Book Property'}
              // onPress={() => submitForm(formValues, imgFile)}
              // loading={isLoading}
              titleStyle={{ fontSize: rf(1.8)}}
              buttonStyle={{ width: 300, height: hp('5%'),  }}
              containerStyle={{ marginTop: 24, alignSelf: 'center', }}
              />
          </View>

          <View style={{ width: wp('90%'), marginTop: 24, }}>
            <LatoText bold style={styles.heading} >{`Location:`}</LatoText>
            <LatoText style={styles.text} >{`624 Snyder Avenue, Charlotte, NC, North Carolina. The location is located at the north of...`}</LatoText>
            <Image source={images.map} style={{ width: '100%', height: 250, resizeMode: 'contain', marginTop: 16}}/>
          </View>

          <View style={{ width: wp('90%'), marginTop: 24, }}>
            <LatoText bold style={styles.heading} >{`Facilities:`}</LatoText>
            <Row style={{ width: wp('90%'), }}>
              <Facility text='Terrace' icon={<Terrace />} />
              <Facility text='Flat-screen TV' icon={<Icon.Material name='tv' size={20} color={Colors.primaryColor} />} />
              <Facility text='Soundproof' icon={<Icon.Community name='music-note-off-outline' size={20} color={Colors.primaryColor} />} />
            </Row>
            <Row style={{ width: wp('90%'), }}>
              <Facility text='Childcare' icon={<ChildCare />} />
              <Facility text='PrivateBathroom' icon={<PrivateBathroom />} />
              <Facility text='Balcony' icon={<Balcony />} />
            </Row>
          </View>

          <View style={{ width: wp('90%'), marginTop: 24, }}>
            <LatoText bold style={styles.heading} >{`Amenities:`}</LatoText>
            <Row style={{ width: wp('90%'), }}>
              <Facility text='Parking' icon={<Icon.Ionicon name='car-outline' size={20} color={Colors.secondaryColor} />} />
              <Facility text='Wi-Fi' icon={<Icon.Material name='wifi' size={20} color={Colors.secondaryColor} />} />
              <Facility text='Dining options' icon={<Icon.Material name='restaurant' size={20} color={Colors.secondaryColor} />} />
            </Row>
            <Row style={{ width: wp('90%'), justifyContent: 'flex-start',}}>
              <Facility text='Bike racks' icon={<Icon.Community name='bike' size={20} color={Colors.secondaryColor} />} />
              <Facility text='Conference room' icon={<Sofa />} />
            </Row>
          </View>

          <View style={{ width: wp('90%'), marginTop: 24, }}>
            <LatoText bold style={styles.heading} >{`House Rules:`}</LatoText>
            {
              CHECKS.map(text => <Check text={text} checked={false} key={text} />)
            }
          </View>

          <Row style={{ width: wp('90%'), marginTop: 24, justifyContent: 'flex-start',}}>
            <LatoText bold fontSize={rf(1.8)}>{`Property Type:`}</LatoText>
            <LatoText style={{ marginLeft: 10 }} >{`Lorem Ipsum Type`}</LatoText>
          </Row>
          
          <Row style={{ width: wp('85%'), height: 50, marginVertical: 30, alignItems: 'center', }}>
            <TextButton 
              title='Property Owner’s Profile' 
              titleStyle={{ color: Colors.primaryColor }} 
              containerStyle={{ height:40 }}
              onPress={() => {}}
              />
            <Button
              title={'Contact Property Owner'}
              type='solid'
              onPress={() => {}}
              titleStyle={{ color: Colors.white, fontSize: rf(1.6), fontFamily: 'Lato-Bold', }}
              buttonStyle={{ backgroundColor: Colors.primaryColor, width: wp('40%'),height: 35, borderRadius: 6, padding: 0 }}
              containerStyle={{ width: wp('40%'), height: 35,borderRadius: 6, marginBottom: 20,  }}
              />   
          </Row>

          <View style={{ height: 50 }} />
             
        </ScrollView>

        <Footer />
      </View>
    )
}

const Detail = ({ label, value }) => { 
  return (
    <View style={{ width: '100%', paddingLeft: 10, marginTop: 14 }}>
      <LatoText bold style={styles.label} >{label}</LatoText>
      <LatoText style={styles.text} >{value}</LatoText>
    </View>
  )
 }
 const Facility = ({ icon, text }) => { 
  return (
    <Row style={{ justifyContent: 'flex-start', width: '34%', height: 30 }}>
      {icon}
      <LatoText style={{ marginLeft: 10 }}>{text}</LatoText>
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
      <LatoText style={{ marginLeft: 10 }}>{text}</LatoText>
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
    marginTop: hp('2%')
  },
  heading: {
    fontSize: rf(1.8),
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
  }
})