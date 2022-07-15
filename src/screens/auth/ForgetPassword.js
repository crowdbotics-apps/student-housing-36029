import React, { useState } from 'react';
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
import { useIsLoading } from '../../redux/reducers/AuthReducer';
import NavigationHeader from '../../components/NavigationHeader';




function ForgetPassword() {
  const dispatch = useDispatch();
  const isLoading = useIsLoading();
  const [formValues, setFormValues] = useState({
    email: "", 
  });

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value
    })
  }
  
    const submitForm = () => {
      // dispatch(forgetPassAction(formValues));
    }   

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
            title={'Recover Password'}
            type='clear'
            onPress={() => goBack()}
            icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight:5 }}/>}
            titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold', }}
            buttonStyle={{ backgroundColor: "transparent", }}
            containerStyle={{ marginBottom: 30, alignSelf: 'flex-start' }}
            TouchableComponent={TouchableOpacity}
            />  

          <StyledInput
            containerStyle={CommonStyles.input}
            label='Please enter your email to recover the password'
            placeholder={"Your Email"}
            keyboardType="default"
            returnKeyType="done"
            onEndEditing={(text) => onSubmitValue("email", text)}
          />
        </View>

        <PrimaryButton
          title={'Recover'}
          buttonStyle={{ width: '100%', height: hp('5%'),  }}
          // onPress={submitForm}
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

export default ForgetPassword