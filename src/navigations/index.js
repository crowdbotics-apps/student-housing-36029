import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useAuhToken, useIsAdmin, useIsOwner } from '../redux/reducers/AuthReducer';
import ForgetPassword from '../screens/auth/ForgetPassword';
import SigninScreen from '../screens/auth/SigninScreen';
import StartScreen from '../screens/auth/StartScreen';
import VerifyPhone from '../screens/auth/VerifyPhone';
import FaqScreen from '../screens/main/FaqScreen';
import HomeScreen from '../screens/main/HomeScreen';
import PaymentScreen from '../screens/main/PaymentScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import PropertyDetails from '../screens/main/PropertyDetails';
import SearchScreen from '../screens/main/SearchScreen';
import SettingScreen from '../screens/SettingScreen';
import OwnerHomeScreen from '../screens/owner/HomeScreen';
import OwnerPaymentScreen from '../screens/owner/PaymentScreen';
import OwnerProfileScreen from '../screens/owner/ProfileScreen';
import OwnerPropertyDetails from '../screens/owner/PropertyDetails';
import NewPropertyScreen from '../screens/owner/NewPropertyScreen';
import { useTokenCheck } from '../utilities/hooks';
import { isReadyRef, navigationRef } from './NavigationService';
import EditPropertyScreen from '../screens/owner/EditPropertyScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import OwnerProfilePreview from '../screens/main/OwnerProfilePreview';
import Inbox from '../screens/main/Inbox';
import ChatScreen from '../screens/main/ChatScreen';
import AdminHomeScreen from '../screens/admin/HomeScreen';
import Users from '../screens/admin/Users';
import Booking from '../screens/admin/Booking';
import AllChats from '../screens/admin/AllChats';
import Messages from '../screens/admin/Messages';
import Properties from '../screens/admin/Properties';

const Stack = createStackNavigator();


const Navigation = () => {
  const Token = useAuhToken(); 
  const checking = useTokenCheck(); 
  const isOwner = useIsOwner(); 
  const isAdmin = useIsAdmin(); 

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
        !isOwner && !isAdmin ?
        <>
          <Stack.Screen name="Main" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="PropertyDetails" component={PropertyDetails} />
          <Stack.Screen name="Settings" component={SettingScreen} />
          <Stack.Screen name="FAQ" component={FaqScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="OwnerProfilePreview" component={OwnerProfilePreview} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
          <Stack.Screen name="Inbox" component={Inbox} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
        : isAdmin ?
        <>
          <Stack.Screen name="Main" component={AdminHomeScreen} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="Properties" component={Properties} />
          <Stack.Screen name="NewProperty" component={NewPropertyScreen} />
          <Stack.Screen name="EditProperty" component={EditPropertyScreen} />
          <Stack.Screen name="PropertyDetails" component={OwnerPropertyDetails} />
          <Stack.Screen name="Bookings" component={Booking} />
          <Stack.Screen name="AllChats" component={AllChats} />
          <Stack.Screen name="Messages" component={Messages} />
        </> 
        : isOwner ?
        <>
          <Stack.Screen name="Main" component={OwnerHomeScreen} />
          <Stack.Screen name="NewProperty" component={NewPropertyScreen} />
          <Stack.Screen name="EditProperty" component={EditPropertyScreen} />
          <Stack.Screen name="PropertyDetails" component={OwnerPropertyDetails} />
          <Stack.Screen name="Settings" component={SettingScreen} />
          <Stack.Screen name="FAQ" component={FaqScreen} />
          <Stack.Screen name="Payment" component={OwnerPaymentScreen} />
          <Stack.Screen name="Profile" component={OwnerProfileScreen} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Inbox" component={Inbox} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
        : null
      }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default Navigation;