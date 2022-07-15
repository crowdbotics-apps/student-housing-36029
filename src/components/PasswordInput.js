import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import Colors from '../constants/Colors';
import CommonStyles from '../constants/CommonStyles';
import { rf } from '../constants/Constants';
import Icon from '../constants/Icon';
import LatoText from './LatoText';
import StyledInput from './StyledInput';

const  PasswordInput = React.forwardRef((props, ref) => {
    const [showPassowrd, setShowPassowrd] = useState(true);

    const [Focused, setFocus] = useState(false);
    const [text, setText] = useState(props.value);
    // console.log('MyInput ',props.placeholder, ' re-rendered');
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if(props.reset) setText('')
    }, [props.reset]);

    if(props.value !== text && !touched) {
        setText(props.value); setTouched(true);
    }
    if(props.clearTextOnFocus && Focused && text.length)
        setText('')
        // const handleInput = (e) => { 
    //    console.log(e.nativeEvent.key);
    // }

    const updateText = (text) => {
            setText(text); 
            showPassowrd && setShowPassowrd(false);
            props.onChangeText && props.onChangeText(text);
        }
        
    const _onEndEditting = (event) => {
        props.onEndEditing && props.onEndEditing(event.nativeEvent.text);
    }

    return (
    <View>
        {props.label && <LatoText fontSize={rf(1.6)}>{props.label}</LatoText>}
        <Input
            ref={ref}
            containerStyle={{ ...CommonStyles.input, ...props.containerStyle}}
            inputContainerStyle={[styles.inputContainer, Focused ? { ...props.inputContainerStyle, ...props.focusedStyle } : props.inputContainerStyle]}
            inputStyle={[styles.inputText, props.inputStyle]}
            placeholder={props.placeholder}
            keyboardType='default'
            returnKeyType='next'
            onChangeText={updateText}
            value={text}
            //onKeyPress={handleInput}
            errorMessage={!Focused ? props.errorMessage : ''} 
            errorStyle={props.errorStyle}
            placeholderTextColor={props.placeholderTextColor || '#828282'}
            onSubmitEditing={props.onSubmitEditing}     
            autoCompleteType='off'
            secureTextEntry={!showPassowrd}
            rightIcon={<ToggleEye onToggle={() => {setShowPassowrd(!showPassowrd)}} />}
            onEndEditing={_onEndEditting}
            />
    </View>
)
});

const ToggleEye = ({ onToggle }) => { 
    const [open, setOpen] = useState(false);
    if(!open) return <Icon.Ionicon name='eye-outline' onPress={() => { setOpen(false); onToggle() }} size={20} style={{ marginRight: 18}} color={Colors.primaryColor} />
    else return <Icon.Ionicon name='eye-off-outline' onPress={() => { setOpen(true);  onToggle() }} size={20} style={{ marginRight: 18}} color={Colors.primaryColor} />
  }
  
const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: Colors.white,
        width: '100%',
        height: 45,
        paddingHorizontal: 16,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#4797AF',
    },
    inputText: {
        fontFamily: 'Lato-Regular',
        color: '#828282',
        fontSize: rf(1.5)
    }
});
  
export default PasswordInput