import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Pressable, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { rf, wp } from '../constants/Constants';
import { CITIES } from '../constants/Data';
import Icon from '../constants/Icon';
import { setFilters, useFilters, useIsLoading } from '../redux/reducers/PropertyReducer';
import { escapeRegexCharacters } from '../utilities/utils';
import LatoText from './LatoText';
import PrimaryButton from './PrimaryButton';
import Row from './Row';

const SEARCHBAR_WIDTH = wp('50%'); 

export default function StyledSearchBar(props) {
  const dispatch = useDispatch();
  const filters = useFilters();
  const isLoading = useIsLoading();

  const updateText = (text) => {
    props.onChangeText && props.onChangeText(text);
    onSearch(text);
}

  const _onEndEditting = (event) => {
    setShowSuggestions(false)
    const value = event.nativeEvent.text; 
    if (!value || value.length === 0) return;
  }


  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestion, setSuggestion] = useState(filters.city);
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
  }
  const handleSearch = () => { 
    setShowSuggestions(false)
    dispatch(setFilters({ 
      ...filters, 
      city: suggestion.trim().length>0 ? suggestion : null 
    }));
  }

    return (
    <>
      <View style={{ position: 'absolute', top: 50, left:0, zIndex :10099 }}>
        <Row style={{ width: wp('90%'), }}>
            <View style={styles.container}>
              <Row style={styles.row} >
                <Icon.FontAwesome name='search' size={22} color={Colors.text}/>
                <Input 
                  containerStyle={{ width: SEARCHBAR_WIDTH-30, height: 50}}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={[styles.inputText, props.inputStyle]}
                  rightIcon={<Icon.Material name='arrow-drop-down' size={25} onPress={() => onSearch(suggestion)}/>}
                  onChangeText={updateText}
                  value={suggestion}
                  onEndEditing={_onEndEditting}
                  placeholder={'Search by city name'}
                  placeholderTextColor={Colors.text}
                  onFocus={() => onSearch(suggestion)}
                  onBlur={() => setShowSuggestions(false)}
                />
              </Row>
            </View>
            <PrimaryButton
              title={'Search'}
              onPress={handleSearch}
              loading={isLoading}
              titleStyle={{ fontSize: rf(1.8) }}
              buttonStyle={{ width: wp('40%')-16, height: 50,  }}
              containerStyle={{  }}
              />
        </Row>
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
          keyboardShouldPersistTaps='always'
          />  
        </View>
        }
        </View>
      <View style={{ height: 100 }}/>
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
    height: 200,
    width: SEARCHBAR_WIDTH,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    elevation: 6,
    borderRadius: 6,
    zIndex: 1000000
  },
  inputContainer: {
    height: 50,
    borderBottomWidth: 0
},
inputText: {
    fontFamily: 'Lato-Regular',
    color: Colors.text,
    fontSize: rf(1.6)
},
suggestion: {
  lineHeight: 25
}


})