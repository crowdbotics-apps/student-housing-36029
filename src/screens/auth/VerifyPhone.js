import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, CheckBox, Image } from 'react-native-elements';
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import images from '../../assets/images';
import LatoText from '../../components/LatoText';
import PasswordInput from '../../components/PasswordInput';
import PrimaryButton from '../../components/PrimaryButton';
import StyledInput from '../../components/StyledInput';
import Colors from '../../constants/Colors';
import CommonStyles from '../../constants/CommonStyles';
import { hp, rf, wp } from '../../constants/Constants';
import { goBack, navigate } from '../../navigations/NavigationService';
import Icon from '../../constants/Icon';
import { forgetPassAction } from '../../redux/sagas/auth/forgetPassSaga';
import { setAuthToken, setCounter, useCounter, useError, useIsLoading, useSuccess, useUser } from '../../redux/reducers/AuthReducer';
import NavigationHeader from '../../components/NavigationHeader';
import { resendOtpAction, verifyOtpAction } from '../../redux/sagas/auth/AuthSagas';
import Row from '../../components/Row';




function VerifyPhone() {
  const dispatch = useDispatch();
  const isLoading = useIsLoading();
  const verifySuccess = useSuccess();
  const user = useUser();
  const counter = useCounter();
  const apiError = useError();
  const [formValues, setFormValues] = useState({
    otp: "", 
  });

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value
    })
  }
  
    const submitForm = (formValues) => {
      const payload = {
        email: user?.email || 'e3saim@gmail.com',
        otp: formValues.otp,
      };
      dispatch(verifyOtpAction(payload));
    }   

    useEffect(() => {
      if(verifySuccess) 
        navigate('Signin', { tab: 1 });
    }, [verifySuccess]);

    const resendOtp = (counter, isLoading) => { 
      if(counter || isLoading) 
        return;
      const payload = {
        email: user?.email,
      };
      dispatch(resendOtpAction(payload));
     }

     useEffect(() => {
      counter > 0 &&
        setTimeout(() => dispatch(setCounter(counter - 1)), 1000);
    }, [counter]);


    return (
      <View style={styles.container} >

      <NavigationHeader />

      <Image  
        source={images.background2}
        style={styles.background}
      />

      <View style={styles.formContainer} >
        <View style={styles.formContainer2}>

          <Button
            title={'Confirm OTP'}
            type='clear'
            onPress={() => { goBack() }}
            icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight:5 }}/>}
            titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold', }}
            buttonStyle={{ backgroundColor: "transparent", }}
            containerStyle={{ marginBottom: 30, alignSelf: 'flex-start' }}
            TouchableComponent={TouchableOpacity}
            />  

          <StyledInput
            containerStyle={CommonStyles.input}
            label={`A one time passcode has been send to ${user?.phone_number || ''}`}
            placeholder={"Enter OTP"}
            keyboardType="default"
            returnKeyType="done"
            onChangeText={(text) => onSubmitValue("otp", text)}
            error={apiError}
            required
          />

          <Row>
            <LatoText fontSize={rf(1.4)}>Dont receive the OTP ? {!!counter && `  Wait for ${counter}s to `}</LatoText>
             <Button
                title='RESEND OTP'
                type='clear'
                onPress={() => resendOtp(counter, isLoading)}
                disabled={counter>0}
                titleStyle={{ fontSize: rf(1.4)}}
                buttonStyle={{ }}
                containerStyle={{ marginRight: 2 }}
                />
          </Row>
        </View>

        <PrimaryButton
          title={'Verify'}
          buttonStyle={{ width: '100%', height: hp('5%'),  }}
          onPress={() => submitForm(formValues)}
          loading={isLoading}
          />

      </View>
    </View>
)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background

  },
  background: {
    width: wp('100%'),
    height: 185 ,
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('100%'),
    backgroundColor: '#FFF',
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('5%')

  },
  formContainer2: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('100%'),
    height: 150,
    backgroundColor: '#FFF',
    paddingVertical: 0,
    paddingHorizontal: wp('5%')

  },

})

export default VerifyPhone