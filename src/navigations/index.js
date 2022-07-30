import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useAuhToken } from '../redux/reducers/AuthReducer';
import ForgetPassword from '../screens/auth/ForgetPassword';
import SigninScreen from '../screens/auth/SigninScreen';
import StartScreen from '../screens/auth/StartScreen';
import VerifyPhone from '../screens/auth/VerifyPhone';
import FaqScreen from '../screens/main/FaqScreen';
import HomeScreen from '../screens/main/HomeScreen';
import PaymentScreen from '../screens/main/PaymentScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import SettingScreen from '../screens/main/SettingScreen';
import { useTokenCheck } from '../utilities/hooks';
import { isReadyRef, navigationRef } from './NavigationService';

const Stack = createStackNavigator();


const Navigation = () => {
  const Token = useAuhToken(); 
  const checking = useTokenCheck(); 

  if(checking)
    return null

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {
        !Token ?
        <>
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
        </>
        :
        <>
        <Stack.Screen name="Main" component={HomeScreen} />
        <Stack.Screen name="Settings" component={SettingScreen} />
        <Stack.Screen name="FAQ" component={FaqScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </>
      }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation;