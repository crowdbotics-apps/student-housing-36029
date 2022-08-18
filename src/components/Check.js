import React from 'react';
import LatoText from './LatoText';
import Row from './Row';
import Colors from '../constants/Colors';
import Icon from '../constants/Icon';
import { onChange } from 'react-native-reanimated';

export const Check = ({ text, checked, onChange }) => (
  <Row style={{ justifyContent: 'flex-start', width: text.length * 8 + 35, height: 30 }}>
    {checked ?
      <Icon.Community name='checkbox-marked' size={20} color={Colors.text} onPress={() => {onChange && onChange(!checked)}} />
      :
      <Icon.Community name='checkbox-blank-outline' size={20} color={Colors.text} onPress={() => {onChange && onChange(!checked)}} />}
    <LatoText style={{ marginLeft: 8 }}>{text}</LatoText>
  </Row>
);
