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
import StyledInput from '../../components/StyledInput';
import CommonStyles from '../../constants/CommonStyles';
import PrimaryButton from '../../components/PrimaryButton';
import VisaIcon from '../../assets/svg/Visa';
import { TextButton } from '../../components/TextButton';
import StyledDropdown from '../../components/StyledDropdown';
import { useKeyboard } from '../../utilities/hooks';

export default function OwnerPaymentScreen() {
  const isKeyboardVisible = useKeyboard();

    return (
        <View style={styles.container}>

        <NavigationHeader />
  
        <Image  
            source={images.background2}
            style={styles.background}
          />

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

          { !isKeyboardVisible &&
            <PrimaryButton
              title={'Confirm and Pay'}
              onPress={() => {}}
              // loading={isLoading}
              buttonStyle={{ width: wp('90%'), height: hp('5%'),  }}
              containerStyle={{ position: "absolute" , bottom: 0, marginBottom: hp('4%') }}
              />
          }

        </View>
      </View>
    )
}

const CreditCardPayment = () => { 
    const [collapsed, setCollapsed] = useState(true);
    const [isDefaultCard, setIsDefaultCard] = useState(true);

    const toggleCollapsed = () => { 
      setCollapsed(!collapsed)
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
          <Row style={{ width: '100%', }}>
            <CheckBox
              title={
                <LatoText fontSize={rf(1.4)}>{`Use default card`}</LatoText>
              }
              checked={isDefaultCard}
              onPress={() => setIsDefaultCard(!isDefaultCard)}
              checkedColor={Colors.text}
              uncheckedColor='#999'
              containerStyle={{ backgroundColor: '#FFF', borderWidth:0, }}              
              />
            <LatoText fontSize={rf(1.6)}> <Icon.FontAwesome name='cc-visa' size={rf(2)}/> {` •••• •••• •••• 8821  `}</LatoText>
          </Row>
          <Row style={{ width: '100%', height: 40 }}>
          <TextButton 
            title='Add new card' 
            titleStyle={{ color: '#0965E0' }}
            containerStyle={{ }}
            />
          </Row>
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