import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Icon from '../constants/Icon';

export default function HeartButton({ containerStyle, onToggle, isSelected, size }) {
    const [selected, setSelected] = useState(isSelected);

    const onSelect = (selected) => { 
        setSelected(selected);
        onToggle(selected);
     }

    return (
          <View style={[styles.container, containerStyle]}>
            {
                selected ?
                <Icon.FontAwesome name='heart' size={size || 18} color={Colors.text} onPress={() => onSelect(false)} />
                :
                <Icon.FontAwesome name='heart-o' size={size || 18} color={Colors.text} onPress={() => onSelect(true)} />
            }
          </View>
    )
}
const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})