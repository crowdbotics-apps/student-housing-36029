import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Colors from '../constants/Colors';
import { wp } from '../constants/Constants';
import Icon from '../constants/Icon';

const SEARCHBAR_WIDTH = wp('100%')-250; 

export default function StyledSearchBar(props) {
  const [text, setText] = useState(props.value || "");

  const updateText = (text) => {
    setText(text); 
    props.onChangeText && props.onChangeText(text);
}

const _onEndEditting = (event) => {
props.onEndEditing && props.onEndEditing(event.nativeEvent.text);
}

    return (
      <View style={styles.container}>
        <Icon.FontAwesome name='search' size={16} color={Colors.text}/>
        <Input 
          containerStyle={{ width: SEARCHBAR_WIDTH-70, height: 20, borderRightWidth: 1, borderRightColor: '#828282CC' }}
          inputContainerStyle={styles.inputContainer}
          inputStyle={[styles.inputText, props.inputStyle]}
          rightIcon={<Icon.Material name='arrow-drop-down' size={18} />}
          
          onChangeText={updateText}
          value={text}
          placeholder={'Search by city name'}
          placeholderTextColor={Colors.text}
  
        />
        <Icon.Community name='calendar-range-outline' size={14} color={Colors.text}/>
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
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection: 'row',
    paddingHorizontal: 10
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