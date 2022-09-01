import React, { useState } from 'react';
import { Alert, FlatList, Pressable, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Header } from 'react-native-elements';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import Logo from '../assets/svg/Logo';
import MenuIcon from '../assets/svg/MenuIcon';
import Colors from '../constants/Colors';
import { rf, wp } from '../constants/Constants';
import { CITIES } from '../constants/Data';
import Icon from '../constants/Icon';
import { navigate } from '../navigations/NavigationService';
import { useAuhToken } from '../redux/reducers/AuthReducer';
import { setFilters } from '../redux/reducers/PropertyReducer';
import { signOutAction } from '../redux/sagas/auth/AuthSagas';
import { escapeRegexCharacters } from '../utilities/utils';
import LatoText from './LatoText';
import Row from './Row';
import StyledSearchBar from './StyledSearchBar';

export default function NavigationHeader({  showRightMenu=true, rightComponent }) {
    const dispatch = useDispatch();
    const insets= useSafeAreaInsets()
    const authToken = useAuhToken();

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

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestion, setSuggestion] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);

    function getSuggestions(value) {
      const escapedValue = escapeRegexCharacters(value.trim());
      if (escapedValue === '') {
        setSearchSuggestions([]);
        return;
      }
      setSearchSuggestions(CITIES.filter((city) =>
        city.name.toLowerCase().includes(value.toLowerCase())),
      );
    }
    const onSearch = (value) => { 
      setSuggestion(value);
      getSuggestions(value);
      setShowSuggestions(true)
    }
    const onSelectSuggestion = (value) => { 
      console.log('suggestion: ', value)
      setSuggestion(value)
      setShowSuggestions(false);
      dispatch(setFilters({ city: value }));
      navigate('Search');
    }
    return (
      <>
      <View style={{ position: 'absolute', top: 0, left:0, right: 0, zIndex :100  }}>
        <Header 
            leftComponent={leftComponent} 
            centerComponent={<StyledSearchBar value={suggestion} onChangeText={onSearch} />} 
            rightComponent={_rightComponent}
            leftContainerStyle={{ justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 5, width: 70 }}
            centerContainerStyle={{ justifyContent: 'center', }}
            rightContainerStyle={{ width: 70, paddingRight: 5 }}
            containerStyle={{ height: 60 + insets.top, backgroundColor: Colors.tertiaryColor, alignItems: 'center', borderBottomWidth: 5, borderBottomColor: Colors.primaryColor }}
            statusBarProps={{ backgroundColor: Colors.primaryColor, barStyle: 'dark-content' }}
        />
        <SuggestionList visible={showSuggestions} data={searchSuggestions} onSelect={onSelectSuggestion}/>
      </View>
      <View style={{ height: 60 + insets.top }}/>
      </>
    )
}

const RightMenu = () => {
  const dispatch = useDispatch();
  const authToken = useAuhToken();

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
   
  const menuitems = authToken===null ? [
    { id: 1, label: 'How to book', onPress:() => {setShowPopover(false); }},
    { id: 2, label: 'About Us', onPress:() => {setShowPopover(false); }},
    { id: 4, label: 'Sign Up', onPress:() => {setShowPopover(false); navigate('Signin', { tab: 0 }); }},
    { id: 5, label: 'Sign In', onPress:() => {setShowPopover(false); navigate('Signin', { tab: 1 }); }},
  ] : [
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
          <Row style={{ width: 30 }}>
            <LatoText fontSize={rf(1.6)}>{selectedLanguage}</LatoText>
            <Icon.Material name='arrow-drop-down' size={15} color={Colors.text} />
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
 
const SuggestionList = ({ visible, data, onSelect }) => { 
  if(visible)
    return (
      <FlatList
        data={data}
        renderItem={({item, index}) => <Pressable onPress={() => {onSelect(item.name)}}><LatoText style={styles.suggestion} >{item.name}</LatoText></Pressable>}
        keyExtractor={(item, i) => `${i}`}
        style={{...styles.flatlist }}
        keyboardShouldPersistTaps='handled'
        />  
    )
  else return null;
  }
const styles = StyleSheet.create({
  rightComp: {
    width: 65,
    height: 40,
  },
  menuItem: {
    fontFamily: 'Lato',
    fontSize: 10,
    textAlign: 'center',
    color: Colors.text,

  },
  flatlist: {
    height: 200,
    width: wp('100%')-220,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    marginTop: -16,
    alignSelf: 'center',
    elevation: 6
  },
  suggestion: {
    lineHeight: 20
  }
})
