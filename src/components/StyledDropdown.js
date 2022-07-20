import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '../constants/Colors';
import { hp, wp } from '../constants/Constants';
import Icon from '../constants/Icon';

export default function StyledDropdown({ placeholder, items, onValueChange, containerStyle, pickerStyles }) {
  
    return (
        <View style={[styles.container, containerStyle]}>

          <RNPickerSelect
            onValueChange={onValueChange}
            items={items}
            placeholder={{ value: 0, label: placeholder, key: 0 }}
            style={{ ...pickerSelectStyles, ...pickerStyles }}
            useNativeAndroidPickerStyle={true}
            textInputProps={{ underlineColor: 'white', placeholderTextColor: '#828282' }}
            itemKey='key'
        />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 45,
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        backgroundColor: '#FFF',
        elevation: 6,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,        
        paddingHorizontal:0,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 5
      }
})
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 14,
      paddingHorizontal: 20,
      color: Colors.text,
      paddingRight: 50, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 14,
      paddingHorizontal: 20,
      color: Colors.text,
      paddingRight: 50, // to ensure the text is never behind the icon
    },
    placeholder: {
        color: '#828282'
    }
  });
  