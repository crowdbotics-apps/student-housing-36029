import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';
import Colors from '../constants/Colors';
import { rf } from '../constants/Constants';
import LatoText from './LatoText';

    

const StyledInput = React.forwardRef((props, ref) => {
    const [Focused, setFocus] = useState(false);
    const [text, setText] = useState(props.value || "");
    // console.log('MyInput ',props.placeholder, ' re-rendered');
    const [touched, setTouched] = useState(false);
    const [error, setError] = useState('');

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
            props.onChangeText && props.onChangeText(text);
        }
        
    const _onEndEditting = (text) => {
        let error = null;
        if(text.length===0 && props.required) error = 'This field is required';
        setError(error);
        props.onEndEditing && props.onEndEditing(text, error);
    }
       
    return (
    <View style={{ marginTop: 10 }}>
      {props.label && <LatoText fontSize={rf(1.6)}>{props.label}</LatoText>}
      <Input
        ref={ref}
        containerStyle={props.containerStyle}
        inputContainerStyle={[styles.inputContainer, Focused ? { ...props.inputContainerStyle, ...props.focusedStyle } : props.inputContainerStyle]}
        inputStyle={[styles.inputText, props.inputStyle]}
        leftIcon={props.leftIcon}
        rightIcon={props.rightIcon}
        onChangeText={updateText}
        value={text}
        //onKeyPress={handleInput}
        errorMessage={!Focused ? props.errorMessage : ''} 
        errorStyle={props.errorStyle}
        placeholder={props.placeholder}
        placeholderTextColor={props.placeholderTextColor || '#828282'}
        onFocus={() => {(!touched && props.preffix) ? updateText(props.preffix) : updateText(text); setFocus(true); setTouched(true); props.onFocus && props.onFocus(); setError('')}}
        onBlur={() => {setFocus(false); props.onBlur && props.onBlur()}}
        blurOnSubmit={props.blurOnSubmit}
        keyboardType={props.keyboardType}
        returnKeyType={props.returnKeyType}
        onSubmitEditing={props.onSubmitEditing}
        autoFocus={false}
        caretHidden={props.caretHidden}
        secureTextEntry={props.secureTextEntry}
        clearTextOnFocus={props.clearTextOnFocus || false}
        onEndEditing={(e) => _onEndEditting(e.nativeEvent.text)}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        maxLength={props.maxLength}
        disabled={props.disabled}
        disabledInputStyle={props.disabledInputStyle}
        autoComplete='off'
    />
    <Error error={error || props.error} />
</View>

    )
});

const Error = ({ error='' }) => { 
    if(!error || error.length===0) return null;
    else 
      return <LatoText color={'#FF3B30'} fontSize={rf(1.4)} style={{ marginTop: 5, marginBottom: 10}}>
        {error}
      </LatoText>
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
        color: Colors.text,
        fontSize: rf(1.8)
    }
})

export default StyledInput