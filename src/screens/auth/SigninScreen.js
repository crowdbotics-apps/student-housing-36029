import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import LatoText from '../../components/LatoText';
import PasswordInput from '../../components/PasswordInput';
import PrimaryButton from '../../components/PrimaryButton';
import StyledInput from '../../components/StyledInput';
import Colors from '../../constants/Colors';
import CommonStyles from '../../constants/CommonStyles';
import { hp, rf, wp } from '../../constants/Constants';
import { goBack, navigate, reset } from '../../navigations/NavigationService';
import SocialButton from '../../components/SocialButton';
import Icon from '../../constants/Icon';
import {
  setAuthToken,
  setSuccess,
  useAuhToken,
  useIsLoading,
  useUser,
} from "../../redux/reducers/AuthReducer";
import { signInAction } from "../../redux/sagas/auth/AuthSagas";
import { validateLoginForm } from '../../services/AuthValidation';
import NavigationHeader from '../../components/NavigationHeader';
import images from '../../assets/images';
import { Button, Image } from 'react-native-elements';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import RadioButtons from '../../components/RadioButtons';

const Tab = createMaterialTopTabNavigator();


const inputRef = {
  email: React.createRef(),
  password: React.createRef()
};  

function SigninScreen() {
  const dispatch = useDispatch();
  const authUser = useUser();
  const isLoading = useIsLoading();
  const authToken = useAuhToken();
  const { params } = useRoute();
  const tab = params?.tab; 

  const [label, setLabel] = useState(tab===0 ? 'Sign Up' : 'Sign In');
  // const [formValues, setFormValues] = useState({
  //   email: "", password: ''
  // });

    
  const submitForm = () => {
    if(label==='Sign Up') {
      navigate('VerifyPhone')
    } else if(label==='Sign In'){
      dispatch(setAuthToken('oifgoifdgoidug'))
    }
    // if(validateLoginForm(formValues)){
    //   console.log({ formValues });
    //   const payload = {
    //     email: formValues.email.trim(),
    //     password: formValues.password.trim(),
    //   };
    //   dispatch(signInAction(payload));
    // }
  }   

  // // useEffect(() => {
  // //   if (authToken) 
  // //     reset("Main");
  // // }, [authToken]);

  // const onSignup = () => {
  //   dispatch(setSuccess(false));
  //   navigate(`Signup`);
  // };

  return (

        <View style={styles.container} >

          <NavigationHeader />

          <Image  
            source={images.background2}
            style={styles.background}
          />

          <View style={styles.formContainer} >
            <Button
              title={label}
              type='clear'
              onPress={() => goBack()}
              icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight:5 }}/>}
              titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold', }}
              buttonStyle={{ backgroundColor: "transparent", }}
              containerStyle={{ marginBottom: 30, alignSelf: 'flex-start' }}
              TouchableComponent={TouchableOpacity}
              />  

            <Tab.Navigator
              initialRouteName={tab===0 ? 'SignupForm' : 'SigninForm'}
              tabBar={props => <MyTabBar {...props} onChangeTab={label => setLabel(label)}/>}
              initialLayout={{ width: wp('100%'), height: 400 }}
              style={{ width: wp('100%'), backgroundColor: '#FFF', }}
              backBehavior='none'
              screenOptions={{
                swipeEnabled: false
              }}
            >
              <Tab.Screen name="SignupForm" component={SignupForm} options={{ tabBarLabel: 'Sign Up' }}/>
              <Tab.Screen name="SigninForm" component={SigninForm} options={{ tabBarLabel: 'Sign In' }}/>
            </Tab.Navigator>

            <PrimaryButton
              title={label}
              buttonStyle={{ width: '100%', height: hp('5%'),  }}
              onPress={submitForm}
              loading={isLoading}
              />

          </View>
        </View>
    )
}

const SignupForm = () => { 
  const inputRef = {
    name: React.createRef(),
    email: React.createRef(),
    password: React.createRef(),
    phone: React.createRef(),
  };  
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: '',
    password: "",
  });

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value
    })
  }

  return (
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
          paddingBottom: hp("4%"),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer2} >
          <StyledInput
            ref={inputRef["name"]}
            containerStyle={CommonStyles.input}
            label='Enter full name'
            placeholder={"Full Name"}
            keyboardType="default"
            returnKeyType="next"
            onEndEditing={(text) => onSubmitValue("name", text)}
            onSubmitEditing={() => inputRef.email.current.focus()}
          />
          <StyledInput
            ref={inputRef["email"]}
            containerStyle={CommonStyles.input}
            label='Enter your email'
            placeholder={"Your email"}
            keyboardType="email-address"
            returnKeyType="next"
            onEndEditing={(text) => onSubmitValue("email", text)}
            onSubmitEditing={() => inputRef.phone.current.focus()}
          />
          <StyledInput
            ref={inputRef["phone"]}
            containerStyle={CommonStyles.input}
            label='Enter your phone number'
            placeholder={"Phone number"}
            keyboardType="phone-pad"
            returnKeyType="next"
            maxLength={11}
            onEndEditing={(text) => onSubmitValue("phone", text)}
            onSubmitEditing={() => inputRef.password.current.focus()}
          />
          <StyledInput
            ref={inputRef["password"]}
            containerStyle={CommonStyles.input}
            label='Enter your password'
            placeholder={"Your password"}
            keyboardType="default"
            returnKeyType="done"
            onEndEditing={(text) => onSubmitValue("password", text)}
          />
          <View style={{ width: '100%'}}>
          <LatoText fontSize={rf(1.6)} >I’m signing up as:</LatoText>
          <RadioButtons 
            data={[
              { label: 'Student' , value: 'Student', selected: true },
              { label: 'Property Owner' , value: 'Owner' },
            ]}
            onSelect={(item) => onSubmitValue("userType", item.value)}
          />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
 }
const SigninForm = () => { 
  const inputRef = {
    password: React.createRef(),
  };  
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value
    })
  }

  return (
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
          paddingBottom: hp("4%"),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.formContainer2, { height: 300 }]} >
          <StyledInput
            containerStyle={CommonStyles.input}
            label='Enter your email'
            placeholder={"Your email"}
            keyboardType="default"
            returnKeyType="next"
            onEndEditing={(text) => onSubmitValue("email", text)}
            onSubmitEditing={() => inputRef.password.current.focus()}
          />
          <PasswordInput
            ref={inputRef['password']}
            label={'Enter your password'}
            placeholder={'Your password'}
            onEndEditing={(text) => onSubmitValue('password', text)}
            returnKeyType='done'
            />
          <Button
            title={'Forgot Password'}
            type='clear'
            onPress={() => navigate('ForgetPassword')}
            titleStyle={{ color: Colors.primaryColor, fontSize: rf(1.8), fontFamily: 'Lato-Bold', textDecorationLine: 'underline' }}
            containerStyle={{  alignSelf: 'flex-start' }}
            TouchableComponent={TouchableOpacity}
            />  

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )

 }

const MyTabBar = ({ state, descriptors, navigation, position, onChangeTab }) => (
    <View style={tabBarStyles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
            onChangeTab(label)
          }
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{ ...tabBarStyles.button }}
          >
            <Animated.Text style={{ fontFamily: isFocused ? "Lato-Bold" : "Lato-Regular", ...tabBarStyles.label }}>
              {label}
            </Animated.Text>
            <Animated.View style={{ opacity, ...tabBarStyles.indicator }}/>
          </TouchableOpacity>
        );
      })}
    </View>
  )

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
    height: 500,
    backgroundColor: '#FFF',
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('5%')

  },
  heading:{
    color: '#3D374F',
    fontSize: wp('6%'),
    textAlign: 'center',
    marginHorizontal: wp('10%'),
    marginTop: -hp('3%')
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


})

const tabBarStyles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5
  },
  label: {
    textAlign: "center",
    color: Colors.text,
    fontSize: rf(1.8)
  },
  button:{ 
    width: 90,
    height: 40,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems:"center"
  },
  indicator:{
    width: 90,
    height:6,
    borderRadius:3,
    backgroundColor: Colors.primaryColor
  }
})

export default SigninScreen