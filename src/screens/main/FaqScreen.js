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

const DUMMYTEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`; 
export default function FaqScreen() {
  const isKeyboardVisible = useKeyboard();

  const [questions, setQuestions] = useState(new Array(8).fill(DUMMYTEXT));
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

          {
            questions.map((q,i) => <Question title={`Question ${i+1}`} content={q} key={i}/>)
          }
          

        </View>
      </View>
    )
}

const Question = ({ title, content }) => { 
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => { 
      setCollapsed(!collapsed)
     }
    return (
      <>
      <Pressable onPress={toggleCollapsed}>
        <Row style={styles.settingItem}>
          <LatoText fontSize={rf(1.6)} >{title}</LatoText>
          <Icon.Feather name={collapsed ? 'plus': 'minus'} size={20} color={Colors.primaryColor} />
        </Row>
      </Pressable>
      {
      !collapsed &&
        <View style={styles.content}>
          <LatoText fontSize={rf(1.6)}>{content}</LatoText>
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
    paddingHorizontal: 3,
    marginTop: 8
  }

})