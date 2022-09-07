import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import { wp } from '../constants/Constants';
import { BottomSheet } from 'react-native-elements';
import StyledInput from './StyledInput';
import CommonStyles from '../constants/CommonStyles';
import PrimaryButton from './PrimaryButton';

export default function TextInputBottomSheet({ isVisible, value, onSubmitValue, closeSheet }) {

    const [text, setText] = useState();
    return (
        <BottomSheet
        isVisible={isVisible}
        containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
        >
            <View style={styles.container} >
                <Text style={styles.headingText}>{`Edit Full Name`} </Text>
                <StyledInput
                  containerStyle={CommonStyles.input}
                  placeholder={"Start typing full name"}
                  value={value}
                  keyboardType="default"
                  returnKeyType="done"
                  onChangeText={text => setText(text)}
                />
                <PrimaryButton
                    title={'Save'}
                    onPress={() => onSubmitValue(text || value)}
                    buttonStyle={{ width: wp('90%'), height: 40,  }}
                    containerStyle={{ marginTop: 24 }}
                    />
            </View>
        </BottomSheet>

    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp('100%'),
    height: 200,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: wp('5%')
  },
  headingText: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    width: wp('90%'),
    height: 30,

  }
})