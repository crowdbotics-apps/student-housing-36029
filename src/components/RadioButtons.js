import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import Colors from '../constants/Colors';
import { rf } from '../constants/Constants';

export default function RadioButtons({ data, onSelect, layout='row',containerStyle }) {
    const [radioButtons, setRadioButtons] = useState(null)

    function onPressRadioButton(radioButtonsArray) {
        const newData = radioButtonsArray.map(({ label, value, selected }) => ({
            id: value,
            label,
            value,
            selected: Boolean(selected),
            borderColor: Colors.primaryColor, 
            color: Colors.primaryColor,
            labelStyle: { ...styles.label, fontFamily: selected ? 'Lato-Bold': 'Lato-Regular' }
        }))
        setRadioButtons(newData);
        console.log('radioButtonsArray: ',radioButtonsArray )
        onSelect(radioButtonsArray.find(item => item.selected===true))
    }

    useEffect(() => {
        const newData = data.map(({ label, value, selected }) => ({
            id: value,
            label,
            value,
            selected: Boolean(selected),
            borderColor: Colors.primaryColor, 
            color: Colors.primaryColor,
            labelStyle: { ...styles.label, fontFamily: selected ? 'Lato-Bold': 'Lato-Regular' }
        }))
        setRadioButtons(newData);
    }, []);

    if(!radioButtons) return null;

    return (
        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={onPressRadioButton} 
            layout={layout}
            containerStyle={{ marginVertical: 6, ...containerStyle }}
        />

    )
}
const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Regular',
        fontSize: rf(1.8),
        color: '#232F39'
    }
})