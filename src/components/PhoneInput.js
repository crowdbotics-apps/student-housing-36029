import React, { useState,  } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { rf, wp } from '../constants/Constants';
import PhoneCodesModal from './PhoneCodesModal';
import { Input } from 'react-native-elements';
import Flag from './Flag';
import Colors from '../constants/Colors';
import { COUNTRY_CODES } from '../constants/Data';
import LatoText from './LatoText';
import Icon from '../constants/Icon';

const PhoneInput = React.forwardRef((props, ref) => {
  
    const defaultCountry = COUNTRY_CODES.filter((obj) => obj.code === props.defaultCountry)[0] || COUNTRY_CODES.filter((obj) => obj.code === 'PK')[0];
    const [country, setCountry] = useState({
      flag: defaultCountry.flag,
      dialCode: defaultCountry.dialCode,
      mask: defaultCountry.mask,
      countryCode: defaultCountry.code,
    });
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [modal, setModal] = useState(false);

    const onChangePropText=(unmaskedPhoneNumber, phoneNumber) => {
        const { dialCode, mask } = country;
        const countOfNumber = mask.match(/9/g).length;
        if (props.onChangeText) {
          const isVerified = countOfNumber === unmaskedPhoneNumber?.length && phoneNumber?.length > 0;
          if(!isVerified) 
            setError('Invalid phone number')
          else {
            setError('');
            props.onChangeText({
              dialCode, unmaskedPhoneNumber, phoneNumber, isVerified
            });
          }
           
        }
      }
      const _onChangeText = (value) => {
        let unmaskedPhoneNumber = (value.match(/\d+/g) || []).join('');
    
        if (unmaskedPhoneNumber.length === 0) {
          setPhone('');
          onChangePropText('', '');
          setError('This field is required')
          return;
        }
    
        let phoneNumber = country.mask.replace(/9/g, 'x');
        for (let index = 0; index < unmaskedPhoneNumber.length; index += 1) {
          phoneNumber = phoneNumber.replace('x', unmaskedPhoneNumber[index]);
        }
        let numberPointer = 0;
        for (let index = phoneNumber.length; index > 0; index -= 1) {
          if (phoneNumber[index] !== ' ' && !isNaN(phoneNumber[index])) {
            numberPointer = index;
            break;
          }
        }
        phoneNumber = phoneNumber.slice(0, numberPointer + 1);
        unmaskedPhoneNumber = (phoneNumber.match(/\d+/g) || []).join('');
        console.log('unmaskedPhoneNumber: ', unmaskedPhoneNumber);
        onChangePropText(unmaskedPhoneNumber, phoneNumber);
        setPhone(unmaskedPhoneNumber);
    }
    const showModal = () => (props.disableCountryChange ? null : setModal(true));

    const hideModal = () => setModal(false);

    const onSelectCountry = (country) => { 
        setCountry({ 
          flag: country.flag,
          dialCode: country.dialCode,
          mask: country.mask,
          countryCode: country.code,
        })
    }
            
    const _onEndEditting = (event) => {
      const text = event.nativeEvent.text || '';
      text.length===0 && props.required && setError('This field is required')
      props.onEndEditing && props.onEndEditing(text);

  }

    return (
        <View style={styles.container}>
          {props.label && <LatoText fontSize={rf(1.6)}>{props.label}</LatoText>}
          <Input
            ref={ref}
            containerStyle={props.containerStyle}
            inputContainerStyle={[styles.inputContainer, props.inputContainerStyle]}
            inputStyle={[styles.inputText, props.inputStyle]}
            leftIcon={
              <TouchableOpacity onPress={showModal} style={{ width: 60, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }} >
              <LatoText bold fontSize={12} style={{ width: 50, textAlign: 'center' }}>{country.dialCode}</LatoText>
              <Icon.Entypo name='chevron-thin-down' color={Colors.text} size={10} style={{}}/>
              </TouchableOpacity>
            }
            placeholder={country.mask.replace(/9/g, 'x')}
            value={phone}
            onChangeText={_onChangeText}
            // errorMessage={error} 
            // errorStyle={{ fontSize: 12, textAlign: 'right' }}
            onFocus={() => { setError('') }}
            onEndEditing={(text) => { }}
            keyboardType='phone-pad'
            returnKeyType='next'
            onSubmitEditing={_onEndEditting}     
            autoCompleteType='off'      
            />
            
          <Error error={error}/>
         
        <PhoneCodesModal
            isModalVisible={modal}
            title={'Select Country'}
            items={COUNTRY_CODES}
            onSelect={onSelectCountry}
            closeModal={hideModal}
        />
        </View>
)
});

const Error = ({ error='' }) => { 
  if(error.length===0) return null;
  else 
    return <LatoText color={'#FF3B30'} fontSize={rf(1.4)} style={{ marginTop: 5, marginBottom: 10}}>
      {error}
    </LatoText>
 }
const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  modalFlagStyle: {
    fontSize: 22,
    marginRight: 10,
    marginBottom: 5
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
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
})

export default PhoneInput;