import moment from 'moment';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import images from '../../assets/images';
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
import { FACILITY_ICONS } from '../../constants/Data';
import Icon from '../../constants/Icon';
import { goBack } from '../../navigations/NavigationService';
import { usePropertyDetails } from '../../redux/reducers/PropertyReducer';
import { updateWishlist } from '../../redux/sagas/property/updateSaga';
import { totalPrice } from '../../utilities/utils';

export default function PropertyDetails() {
  const dispatch = useDispatch();
  const details = usePropertyDetails();
  const {
    id,
    title,
    media = [],
    rating,
    description,
    city,
    country,
    per_night_price,
    time_type,
    minimum_renting_duration,
    room_facilities,
    property_amenities,
    room_accessibilities,
    housing_rules,
    type,
    is_wish_listed
  } = details;

  const mediaFiles = media.map(file => file.property_media.split('?')[0]); 
  
  const [selectedDays, setSelectedDays] = useState({
    from: new Date(),
    to: new Date(new Date().getTime() + 24 * (minimum_renting_duration || 3) * 60 * 60 * 1000),
  });
  const startDate = moment(selectedDays.from);
  const endDate = moment(selectedDays.to);
  const totalDays = Math.ceil(endDate.diff(startDate, 'days', true));

  const handleFromChange = (from=new Date()) => {
    const startDate = moment(from);
    const endDate = moment(selectedDays.to);
    const totalDays = Math.ceil(endDate.diff(startDate, 'days', true));
    if (totalDays <= 0) {
      setSelectedDays((prev) => ({
        ...prev,
        from,
        to: new Date(
          from.getTime() +
            24 * (minimum_renting_duration || 3) * 60 * 60 * 1000,
        ),
      }));
    } else {
      setSelectedDays((prev) => ({ ...prev, from }));
    }
  };

  const handleToChange = (to) => {
    setSelectedDays((prev) => ({ ...prev, to }));
  };

  const onFavourite = (id, val) => { 
    console.log(id, val);
    dispatch(
      updateWishlist({
        property_id: id,
        is_wish_listed: val,
      }),
    );
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
            <LatoText black fontSize={rf(2.2)}>{title}</LatoText>
            <HeartButton 
              onToggle={(val) => onFavourite(id, val)}
              isSelected={is_wish_listed}
              size={rf(2.2)}
              containerStyle={{ position: 'absolute', right: wp('5%'), width: rf(2.4), }}
              />
          </Row>

          <ImageCarousel images={mediaFiles} />

          <View style={styles.details}>
             <LatoText bold style={styles.heading} >{`Booking Details:`}</LatoText>
             <Row style={{ }}>
                <View style={{ width: '50%' }}>
                  <StyledDatepicker 
                  label={'From'}
                  value={selectedDays.from}
                  onDateChange={handleFromChange}
                  datepickerStyle={{ width: 160 }}  
                  containerStyle={{ width: '100%', justifyContent: 'flex-start', }}
                  />
                  <Detail label={'Price Per Night:'} value={`$${totalPrice(time_type, per_night_price, 1)} per night`}/>
                  <Detail label={'Check-In Date:'} value={`${moment(new Date(selectedDays.from)).format('DD/MM/YYYY')} (2 PM)`}/>
                </View>
                <View style={{ width: '50%' }}>
                  <StyledDatepicker 
                    label={'To'}
                    value={selectedDays.to}
                    onDateChange={handleToChange}
                    datepickerStyle={{ width: 160 }}  
                    containerStyle={{ width: '100%', justifyContent: 'flex-start', }}
                    />
                  <Detail label={'Total Per Chosen Period:'} value={`$${totalPrice(time_type, per_night_price, totalDays)}`}/>
                  <Detail label={'Check-Out Date:'} value={`${moment(new Date(selectedDays.to)).format('DD/MM/YYYY')} (Until 11 AM)`}/>
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
            <LatoText style={styles.text} >{`${city}, ${country}`}</LatoText>
            <Image source={images.map} style={{ width: '100%', height: 250, resizeMode: 'contain', marginTop: 16}}/>
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
              housing_rules.map(({ id, name }) => <Check text={name} checked={false} key={id} />)
            }
          </View>

          <Row style={{ width: wp('90%'), marginTop: 24, justifyContent: 'flex-start',}}>
            <LatoText bold fontSize={rf(1.8)}>{`Property Type:`}</LatoText>
            <LatoText style={{ marginLeft: 10 }} >{type}</LatoText>
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
 const Facility = ({ name }) => { 
  return (
    <Row style={{ justifyContent: 'flex-start', width: '33%', height: 30 }}>
      {FACILITY_ICONS[name]}
      <LatoText style={{ marginLeft: 10 }}>{name}</LatoText>
    </Row>
  )
}
 const Accessibility = ({ name }) => { 
  return (
    <Row style={{ justifyContent: 'flex-start', width: '100%', height: 30 }}>
      {FACILITY_ICONS[name]}
      <LatoText style={{ marginLeft: 10 }}>{name}</LatoText>
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