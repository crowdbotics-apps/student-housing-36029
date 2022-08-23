import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Colors from '../constants/Colors';
import { rf, wp } from '../constants/Constants';
import {Divider, Icon} from 'react-native-elements';
import Row from './Row';
import LatoText from './LatoText';
import { useUser } from '../redux/reducers/AuthReducer';
import { TextButton } from './TextButton';
import IconText from './IconText';
import { useProfile } from '../redux/reducers/ProfileReducer';

export default function BookingSuccessModal({
    isModalVisible,
    closeModal,
    data
}) {

  const user = useUser()
  const {
    city,
    country
  } = data; 
  
    return (
        <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        backdropOpacity={0.9}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        animationInTiming={300}
        animationOutTiming={300}
        useNativeDriver>
          <View style={styles.container}>
            <Icon name='close-outline' type='ionicon' size={24} color={Colors.text} containerStyle={{ position: 'absolute', top: 20, right: 20 }} onPress={closeModal}/>
            <Icon name='checkmark-circle-outline' type='ionicon' size={rf(2.6)} color={Colors.text} containerStyle={{ backgroundColor: "#C3FFDB", borderRadius: 50 }} />
          
            <LatoText black fontSize={rf(2.2)} style={{ marginVertical: 25 }}>
              Congratulations! Booking is Confirmed!
            </LatoText>

            <LatoText style={{ textAlign: "center"}}>The confirmation has been sent to your email. <LatoText bold>{user?.email}</LatoText></LatoText>

            <TextButton title={'Check email'} titleStyle={{ color: '#0965E0', fontSize: rf(1.6), }} containerStyle={{ marginTop: 5}}/>

            <Divider style={{ width: wp('60%'), height: 1, backgroundColor: '#CCDBE0', marginVertical:25 }}/>

            <View style={{ width: '100%'}}>
              <LatoText black fontSize={rf(1.8)} style={{ marginTop: 5, marginLeft: 5 }}>
                Booking Details
              </LatoText>
              <IconText 
                icon={<Icon name='location-sharp' type='ionicon' size={24} color={Colors.text} />}
                text={<LatoText style={{ marginLeft: 5 }}>{`${city}, ${country}`}</LatoText>}
                containerStyle={{ justifyContent: 'flex-start', marginVertical: 20 }}
                />
              <Row style={{ width: '100%', marginTop: -5 }}>
                <View style={{ width: '45%', height: 60, justifyContent: 'space-evenly'}}>
                   <LatoText> <LatoText bold>Check-In:</LatoText> 09/22/2021 </LatoText>
                   <LatoText> <LatoText bold>Check-Out:</LatoText> 09/24/2021 </LatoText>
                </View>
                <Divider style={{ width: 1, height: 60, backgroundColor: '#CCDBE0' }}/>
                <View style={{ width: '45%', height: 60, justifyContent: 'space-evenly'}}>
                   <LatoText> <LatoText bold>Total:</LatoText> $108 ($54 per night) </LatoText>
                   <LatoText> <LatoText bold>Status:</LatoText> Confirmed </LatoText>
                </View>
              </Row>
            </View>

            <LatoText style={{ marginVertical: 20 }}> <LatoText bold>Booking number:</LatoText> 22518 </LatoText>

            <TextButton title={'View property details'} titleStyle={{ color: '#0965E0', fontSize: rf(1.6), }} containerStyle={{ marginTop: 5 }}/>

          </View>


        </ReactNativeModal>
    )
}
const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 0, 
    borderRadius: 4,
    padding: wp('5%')
  },
})