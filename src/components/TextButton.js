import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import { rf } from '../constants/Constants';

export const TextButton = ({ title, titleStyle, containerStyle, onPress }) => {
  return (
    <Button
      title={title}
      type='clear'
      onPress={onPress}
      titleStyle={{ color: Colors.text, fontSize: rf(1.8), fontFamily: 'Lato-Bold', height: 22, ...titleStyle }}
      buttonStyle={{ width: 'auto', backgroundColor: "transparent", borderBottomWidth: 1, borderBottomColor: titleStyle.color, padding: 0 }}
      containerStyle={{ ...containerStyle }}
      TouchableComponent={TouchableOpacity} />
  );
};
