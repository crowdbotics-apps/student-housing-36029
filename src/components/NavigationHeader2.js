import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Touchable, TouchableWithoutFeedback, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { Button, Header , Tooltip } from 'react-native-elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../assets/svg/Logo';
import Colors from '../constants/Colors';
import MenuIcon from '../assets/svg/MenuIcon';
import StyledSearchBar from './StyledSearchBar';
import Row from './Row';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import LatoText from './LatoText';
import Icon from '../constants/Icon';
import { navigate } from '../navigations/NavigationService';
import { useDispatch } from 'react-redux';
import { signOutAction } from '../redux/sagas/auth/AuthSagas';

export default function NavigationHeader2({  showRightMenu=true, rightComponent }) {
  
    const insets= useSafeAreaInsets()

    let leftComponent = <Logo />;

    let _rightComponent;
    if(rightComponent)
        _rightComponent = rightComponent;
    else if(showRightMenu)
      _rightComponent =  (
        <Row style={styles.rightComp} >
          <LanguagePicker />
          <RightMenu />
        </Row>
      )

    return (
        <Header 
            leftComponent={leftComponent} 
            centerComponent={<StyledSearchBar />} 
            rightComponent={_rightComponent}
            leftContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 16, width: 70 }}
            centerContainerStyle={{ justifyContent: 'center', }}
            rightContainerStyle={{ width: 70, paddingRight: 16 }}
            containerStyle={{ height: 60 + insets.top, backgroundColor: Colors.tertiaryColor, alignItems: 'center', borderBottomWidth: 5, borderBottomColor: Colors.primaryColor }}
            statusBarProps={{ backgroundColor: Colors.primaryColor, barStyle: 'dark-content' }}
        />
    )
}

const RightMenu = () => {
  const dispatch = useDispatch();

  const [showPopover, setShowPopover] = useState(false);

  const onLogout = () => { 
    Alert.alert(
      'Confirm Logout',
      'Are you sure want to logout?',
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'YES', onPress: () => { dispatch(signOutAction()) }},
      ],
      {cancelable: true},
    );
   }
   
  const menuitems = [
    { id: 1, label: 'Profile', onPress:() => { setShowPopover(false); navigate('Profile') }},
    { id: 2, label: 'Settings', onPress:() => {setShowPopover(false); navigate('Settings') }},
    { id: 3, label: 'Log Out', onPress:() => {setShowPopover(false); onLogout(); }},
  ]; 
  
  return (
    <Popover
      placement={PopoverPlacement.BOTTOM}
      isVisible={showPopover}
      onRequestClose={() => setShowPopover(false)}
      from={(
        <TouchableOpacity onPress={() => setShowPopover(true)}>
          <MenuIcon />
        </TouchableOpacity>
      )}
      arrowShift={0.5}
      verticalOffset={-StatusBar.currentHeight}
      arrowSize={{ width: 0, height: 0}}
      // backgroundStyle={{ backgroundColor: 'transparent'}}
      >
        <View style={{ backgroundColor: Colors.tertiaryColor}}>
        {
          menuitems.map(item => (
            <Button 
            key={item.id}  
            title={item.label}
            onPress={item.onPress}
            titleStyle={styles.menuItem}
            buttonStyle={{ height: 40, backgroundColor: Colors.tertiaryColor, paddingHorizontal: 0 }}
            containerStyle={{ width: 72, height: 40, padding: 0}}
            TouchableComponent={TouchableOpacity}
            />
          ))
        }
        </View>
    </Popover>
  )
  }

const LanguagePicker = () => { 
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [showPopover, setShowPopover] = useState(false);

  const menuitems = [
    { id: 1, label: 'EN', onPress:() => {} },
    { id: 2, label: 'FR', onPress:() => {}  },
    { id: 3, label: 'UR', onPress:() => {}  },
    { id: 4, label: 'GR', onPress:() => {}  },
    { id: 5, label: 'BR', onPress:() => {}  },
  ]; 
  const onSelectedLanguage = (label) => { 
    setSelectedLanguage(label)
    setShowPopover(false)
   }
  return (
    <Popover
      placement={PopoverPlacement.BOTTOM}
      isVisible={showPopover}
      onRequestClose={() => setShowPopover(false)}
      from={(
        <TouchableOpacity onPress={() => setShowPopover(true)}>
          <Row style={{ width: 40 }}>
            <LatoText >{selectedLanguage}</LatoText>
            <Icon.Material name='arrow-drop-down' size={18} color={Colors.text} />
          </Row>
        </TouchableOpacity>
      )}
      arrowShift={0.5}
      verticalOffset={-StatusBar.currentHeight}
      arrowSize={{ width: 0, height: 0}}
      // backgroundStyle={{ backgroundColor: 'transparent'}}
      >
        <View style={{ backgroundColor: Colors.tertiaryColor}}>
        {
          menuitems.map(item => (
            <Button 
            key={item.id}  
            title={item.label}
            onPress={() => onSelectedLanguage(item.label)}
            titleStyle={styles.menuItem}
            buttonStyle={{ height: 40, backgroundColor: Colors.tertiaryColor, paddingHorizontal: 0 }}
            containerStyle={{ width: 72, height: 40, padding: 0}}
            TouchableComponent={TouchableOpacity}
            />
          ))
        }
        </View>
    </Popover>
  )
 }
const styles = StyleSheet.create({
  rightComp: {
    width: 80,
    height: 40,
  },
  menuItem: {
    fontFamily: 'Lato',
    fontSize: 10,
    textAlign: 'center',
    color: Colors.text,

  },
})
