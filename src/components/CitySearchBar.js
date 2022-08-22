import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import CommonStyles from '../constants/CommonStyles';
import { rf, wp } from '../constants/Constants';
import { CITIES } from '../constants/Data';
import Icon from '../constants/Icon';
import { setFilters, useFilters, useIsLoading } from '../redux/reducers/PropertyReducer';
import { escapeRegexCharacters } from '../utilities/utils';
import LatoText from './LatoText';
import PrimaryButton from './PrimaryButton';
import Row from './Row';
import StyledInput from './StyledInput';

const SEARCHBAR_WIDTH = wp('50%'); 

export default function CitySearchBar({ value, onSelect }) {

  const updateText = (text) => {
    // onChangeText && onChangeText(text);
    onSearch(text);
}

const _onEndEditting = (event) => {
  setShowSuggestions(false)
  const value = event.nativeEvent.text; 
  if (!value || value.length === 0) return;
  onSelect(value);
}


  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestion, setSuggestion] = useState(value || '');
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value?.trim());
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
    onSelect(value);
  }

    return (
    <>
      <View style={{width: '100%',  }}>
        <Input
          containerStyle={CommonStyles.input}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}  
          placeholder={'Start typing country'}
          keyboardType="default"
          returnKeyType="done"
          onChangeText={updateText}
          value={suggestion}
          onEndEditing={_onEndEditting}
          onFocus={() => onSearch(suggestion)}
          onBlur={() => setShowSuggestions(false)}
          rightIcon={<Icon.Material name='arrow-drop-down' size={25} onPress={() => onSearch(suggestion)}/>}
          />

        {showSuggestions && 
        <View style={styles.flatlist}>
          <FlatList
          data={searchSuggestions}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => {onSelectSuggestion(item.name)}}>
              <LatoText style={styles.suggestion} >{item.name}</LatoText>
            </TouchableOpacity>
          )}
          keyExtractor={(item, i) => `${i}`}
          style={{ width: "100%", height: '100%' }}
          keyboardShouldPersistTaps='handled'
          />  
        </View>
        }
      </View>
      {/* <View style={{ height: 120 }}/> */}
    </>
    )
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    width: SEARCHBAR_WIDTH,
    borderRadius: 6,
    borderWidth: 2,
    borderColor:  Colors.primaryColor,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  row: {
    height: 50,
    width: '100%',
    borderRadius: 24,
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection: 'row',
  },
  flatlist: {
    height: 150,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    elevation: 6,
    borderRadius: 6,
    zIndex: 1000000
  },
  inputContainer: {
    backgroundColor: Colors.white,
    width: '100%',
    height: 45,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4797AF',
},
  inputText: {
      fontFamily: 'Lato-Regular',
      color: '#828282',
      fontSize: rf(1.5)
  },
  suggestion: {
    lineHeight: 25
  }


})