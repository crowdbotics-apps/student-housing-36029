import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { Button, CheckBox, Image } from 'react-native-elements';
import images from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { goBack } from '../../navigations/NavigationService';
import Row from '../../components/Row';
import LatoText from '../../components/LatoText';
import PrimaryButton from '../../components/PrimaryButton';
import { TextButton } from '../../components/TextButton';
import StyledDropdown from '../../components/StyledDropdown';
import { useKeyboard } from '../../utilities/hooks';  
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { usePaymentMethod } from '../../redux/reducers/ProfileReducer';
import { useDispatch } from 'react-redux';
import { useUser } from '../../redux/reducers/AuthReducer';
import { TouchableHighlight } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native';
import { Platform } from 'react-native';
import { saveStripeToken } from '../../redux/sagas/profile/paymentMethodSaga';

export default function OwnerPaymentScreen() {
  const isKeyboardVisible = useKeyboard();

    return (
        <View style={styles.container}>

        <NavigationHeader />
  
        <Image  
            source={images.background2}
            style={styles.background}
          />
        <KeyboardAvoidingView
          //keyboardVerticalOffset={keyboardVerticalOffset}
          behavior={Platform.OS == "ios" ? "padding" : null}
          style={styles.container}
        >
        <ScrollView
          contentContainerStyle={{
            width: wp("100%"),
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: hp("8%"),
          }}
          showsVerticalScrollIndicator={false}
        >

        <View style={styles.formContainer} >
            <Button
              title={'Settings'}
              type='clear'
              onPress={() => goBack()}
              icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight:5 }}/>}
              titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold', }}
              buttonStyle={{ backgroundColor: "transparent", }}
              containerStyle={{ marginBottom: 30, alignSelf: 'flex-start' }}
              TouchableComponent={TouchableOpacity}
              />  

          <LatoText fontSize={rf(1.8)} style={{ alignSelf: 'flex-start', marginBottom: 8}}>Choose payment method</LatoText>
          
          <CreditCardPayment />
          <CryptoPayment />

        </View>
        </ScrollView>
        </KeyboardAvoidingView>

        { !isKeyboardVisible &&
          <PrimaryButton
            title={'Confirm and Pay'}
            onPress={() => {}}
            buttonStyle={{ width: wp('90%'), height: hp('5%'),  }}
            containerStyle={{ position: "absolute" , bottom: 0, marginBottom: hp('4%') }}
            />
        }

      </View>
    )
}

const CreditCardPayment = () => { 
  const user = useUser();
  const dispatch = useDispatch();
  const paymentMethods =  usePaymentMethod()
  const stripe = useStripe();

    const [collapsed, setCollapsed] = useState(true);
    const [showCardInput, setShowCardInput] = useState(false);
    const [tokenLoading, setTokenLoading] = useState(false);
    const [editCard, setEditCard] = useState(false);
    const [cardValues, setCardValues] = useState({});
  
    const toggleCollapsed = () => { 
      setCollapsed(!collapsed)
    }
    const saveCard = async (cardValues) => { 
      console.log('cardVales: ', cardValues)
      if(cardValues.complete===false) return;
      if(cardValues.validNumber!=='Valid') { alert('Invalid Card Number'); return }
      if(cardValues.validExpiryDate!=='Valid') { alert('Invalid Card Expiry date'); return }
      if(cardValues.validCVC!=='Valid') { alert('Invalid CVC'); return }
  
      setTokenLoading(true)
      const result = await stripe.createToken({
        type: 'Card',
        ...cardValues,
        name: user.full_name,
      });
      console.log('[Token]: ', result);
      if (result.error) {
        console.log(result.error.message);
      } else if (result.token) {
        setTokenLoading(false);
        dispatch(saveStripeToken({ token: result.token.id }));
      }
    }
  
    return (
      <>
      <Pressable onPress={toggleCollapsed}>
        <Row style={styles.settingItem}>
          <LatoText fontSize={rf(1.6)} >{`Credit card payment method`}</LatoText>
          <Icon.Feather name={collapsed ? 'plus': 'minus'} size={20} color={Colors.primaryColor} />
        </Row>
      </Pressable>
      {
      !collapsed &&
      <View style={styles.content}>
        {
          paymentMethods.map(({card},i) => (
            <Row style={{ width: '100%', height: 40}}>
              <LatoText fontSize={rf(1.6)}>{`Saved Card: `}</LatoText>
              <LatoText fontSize={rf(1.6)}> <Icon.FontAwesome name='cc-visa' size={rf(2)}/> {` •••• •••• •••• ${card.last4}  `}</LatoText>
              <Icon.Community name='pencil-outline' color={Colors.primaryColor} size={20} style={{ marginLeft: 10}} onPress={() => setEditCard(true)}/>
            </Row>
          ))
        }
        {
        !showCardInput && paymentMethods.length === 0 &&
        <Row style={{ width: '100%', height: 40, marginVertical: 12, }}>
          <Button
            title={'Add Payment Method'}
            type='solid'
            onPress={() => { setShowCardInput(true)}}
            titleStyle={{ color: Colors.white, fontSize: rf(1.4), fontFamily: 'Lato-Bold', }}
            buttonStyle={{ backgroundColor: Colors.primaryColor, height: 35, borderRadius: 6, paddingHorizontal: 25 }}
            containerStyle={{ height: 35,borderRadius: 6,  padding:0 }}
            TouchableComponent={TouchableHighlight}
            />   
        </Row>
        }
        {
        showCardInput &&
        <View style={{ width: '100%', marginVertical: 12, }}>
          <CardField
            postalCodeEnabled={true}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: Colors.text,
              fontFamily: 'Lato-Regular',
              fontSize: rf(2),
              placeholderColor: "#aaaaaa"
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 20,
            }}
            onCardChange={(cardDetails) => {
              console.log('cardDetails', cardDetails);
              setCardValues(cardDetails)
            }}
            onFocus={(focusedField) => {
              console.log('focusField', focusedField);
            }}
          />
          <Button
            title={'Save Card'}
            type='solid'
            onPress={() => saveCard(cardValues)}
            loading={tokenLoading}
            titleStyle={{ color: Colors.white, fontSize: rf(1.4), fontFamily: 'Lato-Bold', }}
            buttonStyle={{ width: 100, backgroundColor: Colors.primaryColor, height: 30, borderRadius: 6,  }}
            containerStyle={{ width: 100, height: 30,borderRadius: 6,  padding:0, marginTop: 10 }}
            TouchableComponent={TouchableHighlight}
            />   
        </View>
        }
      </View>
      }
    </>
    )
   }

const CryptoPayment = ({ title, value, onChangeText}) => { 
    const [collapsed, setCollapsed] = useState(true);
    const [currency, setCurrency] = useState();
    const toggleCollapsed = () => { 
      setCollapsed(!collapsed)
     }
    return (
      <>
      <Pressable onPress={toggleCollapsed}>
        <Row style={styles.settingItem}>
          <LatoText fontSize={rf(1.6)}>{`Crypto`}</LatoText>
          <Icon.Feather name={collapsed ? 'plus': 'minus'} size={20} color={Colors.primaryColor} />
        </Row>
      </Pressable>
      {
      !collapsed &&
        <View style={styles.content}>
          <Row style={{ width: '100%', height: 60}}>
            <TextButton title='Connect Wallet' titleStyle={{ color: '#0965E0' }}/>
          </Row>
          <LatoText fontSize={rf(1.6)}>{`Choose currency`}</LatoText>
          <StyledDropdown 
            placeholder={'Choose currency'}
            items={[
              { label: 'USD', value: 'USD', key: 'Subject 1' },
              { label: 'EUR', value: 'EUR', key: 'Subject 2' },
            ]}
            onValueChange={(value) => setCurrency(value)}
          />

        </View>
      }
    </>
    )
   }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  background: {
    width: wp('100%'),
    height: 185 ,
    resizeMode: 'cover',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: wp('100%'),
    backgroundColor: 'transparent',
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('5%')
  },
  settingItem:{
    width: wp('90%'),
    height: 50,
    borderRadius: 2,
    backgroundColor: '#F7FAFC',
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10
  },
  content: {
    width: wp('90%')-6,
    paddingHorizontal: 3
  }

})