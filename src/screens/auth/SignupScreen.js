import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import PasswordInput from '../../components/PasswordInput';
import PrimaryButton from '../../components/PrimaryButton';
import LatoText from '../../components/LatoText';
import StyledInput from '../../components/StyledInput';
import Colors from '../../constants/Colors';
import CommonStyles from '../../constants/CommonStyles';
import { hp, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { goBack, navigate, reset } from '../../navigations/NavigationService';
import {
  useIsLoading,
  useUser
} from "../../redux/reducers/AuthReducer";
import { signUpAction } from '../../redux/sagas/auth/AuthSagas';
import { validateSignup1 } from '../../services/AuthValidation';



const inputRef = {
  firstName: React.createRef(),
  lastName: React.createRef(),
  phone: React.createRef(),
  email: React.createRef(),
  password: React.createRef()
};  

function SignupScreen() {
  const dispatch = useDispatch();
  const authUser = useUser();

  const isLoading = useIsLoading();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",  
    email: "", 
    password: ''
  });

  const [checked, setChecked] = useState(false);

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value
    })
  }
    
  const submitForm = () => {
    if(!checked) {
      alert('Please read and accept our Terms and Conditions of Service and Privacy Policy.');
      return
    }
    if(validateSignup1(formValues)){
      console.log({ formValues });
      dispatch(signUpAction(formValues));
    }
  }   

  useEffect(() => {
    if (authUser) 
      reset('AccountInfo');
  }, [authUser]);

    return (
      <KeyboardAvoidingView
        //keyboardVerticalOffset={keyboardVerticalOffset}
        behavior={Platform.OS == "ios" ? "padding" : null}
        style={styles.container}
      >
         <ScrollView
            contentContainerStyle={{
              width: wp('100%'),
              alignItems: 'center',
              justifyContent: 'center',
              paddingBottom: hp('4%'),
            }}
            showsVerticalScrollIndicator={false}>

              <Icon.FontAwesome name='long-arrow-left' color={Colors.primaryColor} size={30} onPress={() => goBack()} style={styles.backarrow}/>
              
              <View style={styles.formContainer} >

              <LatoText bold color={Colors.secondaryColor} fontSize={35} style={styles.heading} >{`Sign up`}</LatoText>
              
              <StyledInput 
                placeholder={'First Name'}
                keyboardType='default'
                returnKeyType='next'
                onEndEditing={(text) => onSubmitValue('firstName', text)}
                onSubmitEditing={() => inputRef.lastName.current.focus()}
                containerStyle={CommonStyles.input}
              />
              
              <StyledInput 
                ref={inputRef['lastName']}
                placeholder={'Last Name'}
                keyboardType='default'
                returnKeyType='next'
                onEndEditing={(text) => onSubmitValue('lastName', text)}
                onSubmitEditing={() => inputRef.phone.current.focus()}
                containerStyle={CommonStyles.input}
              />
              
              <StyledInput 
                 ref={inputRef['phone']}
                 placeholder={'Phone number'}
                keyboardType='number-pad'
                returnKeyType='next'
                onEndEditing={(text) => onSubmitValue('phone', text)}
                onSubmitEditing={() => inputRef.email.current.focus()}
                containerStyle={CommonStyles.input}
              />
              
              <StyledInput 
                ref={inputRef['email']}
                placeholder={'Email'}
                keyboardType='email-address'
                returnKeyType='next'
                onEndEditing={(text) => onSubmitValue('email', text)}
                onSubmitEditing={() => inputRef.password.current.focus()}
                containerStyle={CommonStyles.input}
              />
              
              <PasswordInput
                ref={inputRef['password']}
                placeholder={'Create password'}
                onEndEditing={(text) => onSubmitValue('password', text)}
                returnKeyType='done'
                />
              
              <CheckBox
                title={
                  <LatoText color='#4A4A48'>{`I have read `}<LatoText semiBold color={Colors.primaryColor}>{`Terms and Conditions of Service and Privacy Policy`}</LatoText></LatoText>
                }
                checked={checked}
                onPress={() => setChecked(!checked)}
                checkedColor={Colors.primaryColor}
                uncheckedColor='#999'
                containerStyle={{ backgroundColor: '#FFF', borderWidth:0, marginVertical: 16}}              
                />

              <PrimaryButton
                title={'Sign Up'}
                buttonStyle={{ width: '100%', height: 79, marginBottom: hp('2%') }}
                onPress={submitForm}
                loading={isLoading}
                />
              
            </View>
            </ScrollView>

          </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background

  },
  backarrow: {
    marginTop: 30, 
    alignSelf:'flex-start',
    marginHorizontal: wp('5%')  
  },

  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: wp('90%'),
    backgroundColor: '#FFF',
  },
  heading:{
    textAlign: 'center',
    marginHorizontal: wp('10%'),
    marginVertical: hp('2%'),
    marginBottom: hp('6%')
  },
  text:{
    color: 'rgba(0,0,0,0.53)',
    fontSize: wp('4%'),
    textAlign: 'center',
    marginHorizontal: wp('12%'),
    marginVertical: hp('3%'),
  },
  input: {
    width: wp('90%'),
    height: 56,
    marginTop: hp('2%')
  },
  google: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  }


})

export default SignupScreen;