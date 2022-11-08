import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { hp, rf, wp } from '../constants/Constants';
import LatoText from './LatoText';
import moment from 'moment';
import Colors from '../constants/Colors';
import Icon from '../constants/Icon';
import Row from './Row';

export default function StyledDatepicker({ onDateChange, value, label, containerStyle, datepickerStyle }) {
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
      value && setDate(value);
    }, [value]);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = (date) => {
      setDate(date);
      onDateChange(date);
      console.warn("A date has been picked: ", date);
      hideDatePicker();
    };
  
    return (
      <>
        <Row style={containerStyle}>
          {label && <LatoText fontSize={rf(1.6)} color={Colors.text} style={styles.text}>{label}</LatoText>}
          <TouchableWithoutFeedback onPress={showDatePicker}>
            <View style={[styles.container, datepickerStyle]}>
              <Icon.Community name='calendar-range-outline' size={13} color={Colors.text}/>
              <LatoText fontSize={rf(1.6)} color={!date ? '#C4C4C4' : Colors.text} style={styles.text}>
                { !date ? 'mm/dd/yyyy' : moment(date).format('MM/DD/YYYY') }
              </LatoText>
              <Icon.FontAwesome name='caret-down' size={14} color={Colors.text}/>              
            </View>
          </TouchableWithoutFeedback>
        </Row>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        borderWidth: 2,
        borderColor: Colors.secondaryColor,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
      },
      text: {
        marginHorizontal: 8
      }
})
  