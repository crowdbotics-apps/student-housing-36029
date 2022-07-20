import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Button, Image } from 'react-native-elements';
import images from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { goBack, navigate } from '../../navigations/NavigationService';
import Row from '../../components/Row';
import LatoText from '../../components/LatoText';
import StyledInput from '../../components/StyledInput';
import CommonStyles from '../../constants/CommonStyles';
import PrimaryButton from '../../components/PrimaryButton';
import { useDispatch } from 'react-redux';
import { useUser } from '../../redux/reducers/AuthReducer';
import { useIsLoading } from '../../redux/reducers/ProfileReducer';
import { TextButton } from '../../components/TextButton';

export default function SettingScreen() {
  const dispatch = useDispatch();
  const authUser = useUser();
  const isLoading = useIsLoading();

  const [formValues, setFormValues] = useState({
    email: authUser?.email || '',
    phone: authUser?.phone_number || '',
    password: "",
  });

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value
    })
  }

  console.log('formValues: ', formValues);
  
  const submitForm = (formValues) => {
    // if(validateSignup1(formValues))
    //   dispatch(
    //     signUpAction({
    //       full_name: formValues.name,
    //       phone_number: formValues.phone,
    //       email: formValues.email,
    //       is_property_owner: formValues.userType !== 'Student',
    //       password: formValues.password,
    //       is_student: formValues.userType === 'Student',
    //   }));
  }     

  const onDeactivate = () => { 
    
   }
    return (
        <View style={styles.container}>

        <NavigationHeader />
  
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
              containerStyle={{ marginBottom: 30, alignSelf: 'flex-start' }}
              TouchableComponent={TouchableOpacity}
              />  

          <SettingItem 
            title={'Change account password'} 
            value={'•••••••'}
            onChangeText={(text) => onSubmitValue('password', text)}
          />
          <SettingItem 
            title={'Change account email'} 
            value={formValues.email}
            onChangeText={(text) => onSubmitValue('email', text)}
          />
          <SettingItem 
            title={'Change your phone number'} 
            value={formValues.phone}
            onChangeText={(text) => onSubmitValue('phone', text)}
          />
          <PrimaryButton
            title={'Save Changes'}
            onPress={() => submitForm(formValues)}
            loading={isLoading}
            buttonStyle={{ width: wp('90%'), height: hp('5%'),  }}
            containerStyle={{ marginTop: hp('4%') }}
            />
          <View style={styles.formContainer2}>
            <TextButton title='FAQ' titleStyle={{ color: Colors.primaryColor }} onPress={() => navigate('FAQ')}/>
            <TextButton title='Payment' titleStyle={{ color: Colors.primaryColor }} onPress={() => navigate('Payment')}/>
            <TextButton title='Deactivate your account' titleStyle={{ color: Colors.text }} onPress={onDeactivate}/>
          </View>
        </View>



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
    backgroundColor: 'transparent',
    paddingVertical: hp('4%'),
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