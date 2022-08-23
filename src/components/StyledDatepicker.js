import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable, TouchableWithoutFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { hp, rf, wp } from '../constants/Constants';
import LatoText from './LatoText';
import moment from 'moment';
import Colors from '../constants/Colors';
import Icon from '../constants/Icon';
import Row from './Row';

export default function StyledDatepicker({ onDateChange, value, label, containerStyle, datepickerStyle }) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {
      value && setDate(value);
    }, [value]);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      onDateChange(currentDate)
    };

    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };

    const showDatepicker = () => {
      showMode('date');
    };

    const showTimepicker = () => {
      showMode('time');
    };

    return (
        <Row style={containerStyle}>
          {label && <LatoText fontSize={rf(1.6)} color={Colors.text} style={styles.text}>{label}</LatoText>}
        <TouchableWithoutFeedback onPress={() => showDatepicker()}>
        <View style={[styles.container, datepickerStyle]}>
          <Icon.Community name='calendar-range-outline' size={13} color={Colors.text}/>
          <LatoText fontSize={rf(1.6)} color={!date ? '#C4C4C4' : Colors.text} style={styles.text}>
            { !date ? 'mm/dd/yyyy' : moment(date).format('MM/DD/YYYY') }
          </LatoText>
          <Icon.FontAwesome name='caret-down' size={14} color={Colors.text}/>

          {show && (
            <DateTimePicker
              value={date || new Date()}
              mode={mode}
              is24Hour={false}
              onChange={onChange}
            />
          )}
        </View>
        </TouchableWithoutFeedback>
        </Row>
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
  