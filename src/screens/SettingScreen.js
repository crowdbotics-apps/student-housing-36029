import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { Button, Image } from 'react-native-elements';
import images from '../assets/images';
import NavigationHeader from '../components/NavigationHeader';
import Colors from '../constants/Colors';
import { hp, rf, wp } from '../constants/Constants';
import Icon from '../constants/Icon';
import { goBack, navigate } from '../navigations/NavigationService';
import Row from '../components/Row';
import LatoText from '../components/LatoText';
import StyledInput from '../components/StyledInput';
import CommonStyles from '../constants/CommonStyles';
import PrimaryButton from '../components/PrimaryButton';
import { useDispatch } from 'react-redux';
import { useUser } from '../redux/reducers/AuthReducer';
import { useIsLoading } from '../redux/reducers/AuthReducer';
import { TextButton } from '../components/TextButton';
import { isEmailValid, isEmpty, isPasswordValid, isPhoneNumberValid } from '../services/AuthValidation';
import { changePassAction } from '../redux/sagas/auth/changePassSaga';
import { changeEmailAction } from '../redux/sagas/auth/changeEmailSaga';
import { changePhoneAction } from '../redux/sagas/auth/changePhoneSaga';
import { deactivateAccount } from '../redux/sagas/auth/AuthSagas';

export default function SettingScreen() {
  const dispatch = useDispatch();
  const authUser = useUser();
  const isLoading = useIsLoading();

  const [password, setPassword] = useState('•••••••');
  const [email, setEmail] = useState(authUser?.email || '');
  const [phone, setPhone] = useState(authUser?.phone_number || '');
  
  const submitForm = () => {
    if(isEmpty(password)) { alert('Password field is required'); return }
    else if(password !== '•••••••'){
      dispatch(changePassAction({ password }))
    }
    if(isEmpty(email)) { alert('Email field is required'); return }
    else if(!isEmailValid(email)) { alert('Please enter a valid email address'); return false; }
    else if(email !== authUser?.email) {
      dispatch(changeEmailAction({ email }))
    }
    if(isEmpty(phone)) { alert('Phone number is required'); return }
    else if(phone !== authUser?.phone_number) {
      dispatch(changePhoneAction({ phone_number: phone }))
    }
  }     

  const onDeactivate = () => { 
    Alert.alert(
      'Confirm Deactivate',
      'Are you sure to deactivate your account?',
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'YES', onPress: () => { dispatch(deactivateAccount());  }},
      ],
      {cancelable: true},
    );
   }
    return (
        <View style={styles.container}>

        <NavigationHeader />
  
        <KeyboardAvoidingView
          //keyboardVerticalOffset={keyboardVerticalOffset}
          behavior={Platform.OS == "ios" ? "padding" : null}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={{
              width: wp("100%"),
              alignItems: "center",
              justifyContent: "center",
            }}
            showsVerticalScrollIndicator={false}
          >
            <Image  
                source={images.background2}
                style={styles.background}
              />

            <View style={styles.formContainer} >
              <Button
                title={'Student Housing App'}
                type='clear'
                onPress={() => goBack()}
                icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight:5 }}/>}
                titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold', }}
                buttonStyle={{ backgroundColor: "transparent", }}
                containerStyle={{ marginBottom: hp('2%'), alignSelf: 'flex-start' }}
                TouchableComponent={TouchableOpacity}
                />  

              <SettingItem 
                title={'Change account password'} 
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
              <SettingItem 
                title={'Change account email'} 
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              <SettingItem 
                title={'Change your phone number'} 
                value={phone}
                onChangeText={(text) => setPhone(text)}
              />
              <PrimaryButton
                title={'Save Changes'}
                onPress={submitForm}
                loading={isLoading}
                buttonStyle={{ width: wp('90%'), height: hp('5%'),  }}
                containerStyle={{ marginTop: hp('4%') }}
                />
              <View style={styles.formContainer2}>
                <TextButton title='FAQ' titleStyle={{ color: Colors.primaryColor, height:16 }} onPress={() => navigate('FAQ')}/>
                <TextButton title='Payment' titleStyle={{ color: Colors.primaryColor, height:16 }} onPress={() => navigate('Payment')}/>
                <TextButton title='Deactivate your account' titleStyle={{ color: Colors.text, height:16 }} onPress={onDeactivate}/>
              </View>
            </View>

        </ScrollView>
        </KeyboardAvoidingView>
      </View>
      )
}

const SettingItem = ({ title, value, onChangeText}) => { 
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => { 
    setCollapsed(!collapsed)
   }
  return (
    <>
    <Pressable onPress={toggleCollapsed}>
      <Row style={styles.settingItem}>
        <LatoText fontSize={rf(1.6)}>{title}</LatoText>
        <Icon.Feather name={collapsed ? 'plus': 'minus'} size={20} color={Colors.primaryColor} />
      </Row>
    </Pressable>
    {
    !collapsed &&
      <View style={styles.content}>
        <StyledInput
            required
            containerStyle={[CommonStyles.input, { marginTop: 5}]}
            placeholder={''}
            keyboardType="default"
            returnKeyType="done"
            value={value}
            onChangeText={onChangeText}
          />
      </View>
    }
  </>
  )
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  background: {
    width: wp('100%'),
    height: 185 ,
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: wp('100%'),
    height: hp('100%')-60,
    backgroundColor: 'transparent',
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('5%')

  },
  formContainer2: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: wp('100%'),
    backgroundColor: 'transparent',
    paddingTop: hp('5%'),
    paddingHorizontal: wp('5%'),
    
  },

  settingItem:{
    width: wp('90%'),
    height: 50,
    borderRadius: 2,
    backgroundColor: '#F7FAFC',
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginTop: 5
  },
  content: {
    width: wp('90%')-6,
    paddingHorizontal: 3
  }

})