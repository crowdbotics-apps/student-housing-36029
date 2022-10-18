import React, { useState } from 'react';
import { View,StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import Row from './Row';
import Colors from '../constants/Colors';
import { rf, wp } from '../constants/Constants';
import Icon from '../constants/Icon';

const SEARCHBAR_WIDTH = wp('90%');

const ChatSearchbar = ({ onChangeText }) => {
  const [text, setText] = useState('');

  const updateText = (text) => {
    setText(text);
    onChangeText && onChangeText(text);
  };

  const _onEndEditting = (event) => {
    const value = event.nativeEvent.text;
    if (!value || value.length === 0)
      return;
  };

  return (
    <View style={styles.searchbarContainer}>
      <Row style={styles.searchBar}>
        <Icon.FontAwesome name='search' size={rf(2.8)} color={Colors.text} />
        <Input
          containerStyle={{ width: SEARCHBAR_WIDTH - 30, height: 50 }}
          inputContainerStyle={styles.inputContainer}
          inputStyle={[styles.inputText]}
          onChangeText={updateText}
          value={text}
          onEndEditing={_onEndEditting}
          placeholder={'Search by name'}
          placeholderTextColor={Colors.text} />
      </Row>
    </View>

  );
};

const styles = StyleSheet.create({
  searchbarContainer: {
    height: 50,
    width: SEARCHBAR_WIDTH,
    borderRadius: 6,
    borderWidth: 2,
    borderColor:  Colors.primaryColor,
    justifyContent: 'center',
    alignItems:'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  searchBar: {
    height: 50,
    width: '100%',
    borderRadius: 24,
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection: 'row',
  },
  inputContainer: {
    height: 50,
    borderBottomWidth: 0
},
  inputText: {
      fontFamily: 'Lato-Regular',
      color: Colors.text,
      fontSize: rf(1.8)
  },

})

export default ChatSearchbar