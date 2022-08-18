import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import Colors from '../constants/Colors';
import { wp } from '../constants/Constants';
import { CITIES } from '../constants/Data';
import Icon from '../constants/Icon';
import { navigate } from '../navigations/NavigationService';
import LatoText from './LatoText';
import Row from './Row';

const SEARCHBAR_WIDTH = wp('100%')-250; 

export default function StyledSearchBar(props) {
  
  const updateText = (text) => {
    props.onChangeText && props.onChangeText(text);
}

  const _onEndEditting = (event) => {
    const value = event.nativeEvent.text; 
    if (!value || value.length === 0) return;
    navigate('Search', { city: value })
  }


    return (
      <View style={styles.container}>
        <Row style={styles.row} >
          <Icon.FontAwesome name='search' size={16} color={Colors.text}/>
          <Input 
            containerStyle={{ width: SEARCHBAR_WIDTH-70, height: 20, borderRightWidth: 1, borderRightColor: '#828282CC' }}
            inputContainerStyle={styles.inputContainer}
            inputStyle={[styles.inputText, props.inputStyle]}
            rightIcon={<Icon.Material name='arrow-drop-down' size={18} />}
            onChangeText={updateText}
            value={props.value}
            onEndEditing={_onEndEditting}
            placeholder={'Search by city name'}
            placeholderTextColor={Colors.text}
          />
          <Icon.Community name='calendar-range-outline' size={14} color={Colors.text}/>
        </Row>
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    height: 34,
    width: SEARCHBAR_WIDTH,
    borderRadius: 24,
    borderWidth: 1,
    borderColor:  '#232F39',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  row: {
    height: 34,
    width: '100%',
    borderRadius: 24,
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection: 'row',
  },
  flatlist: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    top: 34,
    backgroundColor: '#FFF'
  },
  inputContainer: {
    height: 20,
    borderBottomWidth: 0
},
inputText: {
    fontFamily: 'Lato-Regular',
    color: Colors.text,
    fontSize: 12
}

})