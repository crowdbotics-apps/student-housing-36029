import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable, KeyboardAvoidingView, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { Avatar, Button, Divider, Image, ListItem } from 'react-native-elements';
import images from '../../assets/images';
import NavigationHeader from '../../components/NavigationHeader';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { goBack, navigate } from '../../navigations/NavigationService';
import Row from '../../components/Row';
import LatoText from '../../components/LatoText';
import StyledInput from '../../components/StyledInput';
import CommonStyles from '../../constants/CommonStyles';
import PrimaryButton from '../../components/PrimaryButton';
import { useDispatch } from 'react-redux';
import { useUser } from '../../redux/reducers/AuthReducer';
import { useIsLoading, useProfile } from '../../redux/reducers/ProfileReducer';
import { TextButton } from '../../components/TextButton';
import { useKeyboard } from '../../utilities/hooks';
import { BOOKINGS, REVIEWS_DUMMY } from '../../constants/Data';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const profile = useProfile();
  const isLoading = useIsLoading();
  const isKeyboardVisible = useKeyboard();

  const [formValues, setFormValues] = useState({
    city: '',
    country: '',
    college: "",
  });

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value
    })
  }

  console.log('formValues: ', formValues);
  
  const submitForm = (formValues) => {
    // if(validateSignup1(formValues))
    //   dispatch(
    //     signUpAction({
    //       full_name: formValues.name,
    //       phone_number: formValues.phone,
    //       email: formValues.email,
    //       is_property_owner: formValues.userType !== 'Student',
    //       password: formValues.password,
    //       is_student: formValues.userType === 'Student',
    //   }));
  }     

  const onDeactivate = () => { 
    
   }

    return (
        <View style={styles.container}>
        <NavigationHeader />

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
              <LatoText bold color={Colors.text} fontSize={rf(2.2)} style={{ alignSelf: 'flex-start', marginBottom: 20 }}>Profile</LatoText>

              {
                profile.image ?
                <Avatar source={{ uri: profile.image.split('?')[0] }} containerStyle={styles.avatar} avatarStyle={{ borderRadius: 2 }} />
                :
                <TouchableOpacity style={styles.imageBtn}>
                  <Icon.Feather name='camera' color={'#CCDBE0'} size={36} style={{ marginBottom: 10}} />
                  <LatoText color={Colors.primaryColor} fontSize={rf(1.7)}>Upload picture</LatoText>
                </TouchableOpacity>
              }
              <Row style={{ marginTop: 16 }}>
                <LatoText black color={Colors.text} fontSize={rf(2)}>Daniel Thompson</LatoText>
                <Icon.Community name='pencil-outline' color={Colors.text} size={20} style={{ marginLeft: 10}} />
              </Row>

              <View style={[styles.formContainer2, { height: 270 }]} >
                <StyledInput
                  containerStyle={CommonStyles.input}
                  label='City'
                  placeholder={"Start typing city name"}
                  keyboardType="default"
                  returnKeyType="done"
                  onChangeText={(text) => onSubmitValue("city", text)}
                />
                <StyledInput
                  containerStyle={CommonStyles.input}
                  label='Country'
                  placeholder={"Start typing country name"}
                  keyboardType="default"
                  returnKeyType="done"
                  onChangeText={(text) => onSubmitValue("country", text)}
                />
                <StyledInput
                  containerStyle={CommonStyles.input}
                  label='College'
                  placeholder={"Start typing college name"}
                  keyboardType="default"
                  returnKeyType="done"
                  onChangeText={(text) => onSubmitValue("college", text)}
                />
              </View>

              <Reviews 
                title={'Reviews given'} 
                data={REVIEWS_DUMMY}
              />
              <Reviews 
                title={'Reviews received'} 
                data={REVIEWS_DUMMY}
              />
              <CreditCardPayment />
              <BookingHistory data={BOOKINGS}/>
            </View>

            </ScrollView>

            { !isKeyboardVisible &&
            <PrimaryButton
              title={'Save Profile Updates'}
              onPress={() => submitForm(formValues)}
              loading={isLoading}
              buttonStyle={{ width: wp('90%'), height: hp('5%'),  }}
              containerStyle={{ position: "absolute" , bottom: 20, marginTop: hp('4%') }}
              />
          }

          </KeyboardAvoidingView>
        </View>
      )
}

const Reviews = ({ title, data }) => { 
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => { 
    setCollapsed(!collapsed)
   }
  return (
    <>
    <Pressable onPress={toggleCollapsed}>
      <Row style={{ ...styles.settingItem, backgroundColor: collapsed?'#F7FAFC':'#CCDBE0' }}>
        <LatoText fontSize={rf(1.6)}>{title}</LatoText>
        <Icon.Feather name={collapsed ? 'plus': 'minus'} size={20} color={Colors.primaryColor} />
      </Row>
    </Pressable>
    {
    !collapsed &&
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <ListItem containerStyle={{ paddingVertical: 16 }}>
               <ListItem.Content>
                <ListItem.Title>
                  <LatoText fontSize={rf(1.5)}>{item.text} <LatoText bold>{`-`} {item.name}</LatoText></LatoText>  
                </ListItem.Title>
               </ListItem.Content>
               <Icon.Ionicon name='close' color={Colors.primaryColor} size={20} /> 
            </ListItem>
          )}
          keyExtractor={(item, i) => item.id}
          style={{ width: '100%', height: 'auto' }}
          ItemSeparatorComponent={() => <Divider style={{ width: '100%', height: 1, backgroundColor: Colors.primaryColor }} />}
          // ListEmptyComponent={() => <ListEmpty text='No reviews' />}
          />  
      </View>
    }
  </>
  )
 }

 const CreditCardPayment = () => { 
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => { 
    setCollapsed(!collapsed)
   }
  return (
    <>
    <Pressable onPress={toggleCollapsed}>
    <Row style={{ ...styles.settingItem, backgroundColor: collapsed?'#F7FAFC':'#CCDBE0' }}>
        <LatoText fontSize={rf(1.6)} >{`Payment method`}</LatoText>
        <Icon.Feather name={collapsed ? 'plus': 'minus'} size={20} color={Colors.primaryColor} />
      </Row>
    </Pressable>
    {
    !collapsed &&
      <View style={styles.content}>
        <Row style={{ width: '100%', height: 40}}>
          <LatoText fontSize={rf(1.6)}>{`Curent payment method`}</LatoText>
          <LatoText fontSize={rf(1.6)}> <Icon.FontAwesome name='cc-visa' size={rf(2)}/> {` •••• •••• •••• 8821  `}</LatoText>
          <Icon.Community name='pencil-outline' color={Colors.primaryColor} size={20} style={{ marginLeft: 10}} />
        </Row>
        <Row style={{ width: '100%', height: 40, marginVertical: 12, }}>
          <Button
            title={'Add Payment Method'}
            type='solid'
            onPress={() => {}}
            titleStyle={{ color: Colors.white, fontSize: rf(1.4), fontFamily: 'Lato-Bold', }}
            buttonStyle={{ backgroundColor: Colors.primaryColor, height: 35, borderRadius: 6, paddingHorizontal: 25 }}
            containerStyle={{ height: 35,borderRadius: 6,  padding:0 }}
            TouchableComponent={TouchableHighlight}
            />   
        </Row>
      </View>
    }
  </>
  )
 }

 const BookingHistory = ({ title, data }) => { 
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => { 
    setCollapsed(!collapsed)
   }
  return (
    <>
    <Pressable onPress={toggleCollapsed}>
      <Row style={{ ...styles.settingItem, backgroundColor: collapsed?'#F7FAFC':'#CCDBE0' }}>
        <LatoText fontSize={rf(1.6)}>{'Booking history'}</LatoText>
        <Icon.Feather name={collapsed ? 'plus': 'minus'} size={20} color={Colors.primaryColor} />
      </Row>
    </Pressable>
    {
    !collapsed &&
      <View style={styles.content}>
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View style={styles.propertyItem} >
              <LatoText bold fontSize={rf(1.8)} style={{ lineHeight: 25}}>{item.name} </LatoText>  
              <Row style={{ width: "100%", flexWrap: "wrap" }}>
                <LatoText style={{ width: '50%', lineHeight: 25 }}>Rate property: <Stars ratings={item.rating.property} /></LatoText>
                <LatoText style={{ width: '50%', lineHeight: 22}}>Rate owner: <Stars ratings={item.rating.owner} /></LatoText>
                <LatoText style={{ width: '50%', lineHeight: 22}}>Date: {item.date}</LatoText>
                <LatoText style={{ width: '50%', lineHeight: 22}}>Location: </LatoText>
                <LatoText style={{ width: '100%', lineHeight: 22}}>Amopunt paid: {item.amount}</LatoText>
              </Row>
            </View>
          )}
          keyExtractor={(item, i) => item.id}
          style={{ width: '100%', height: 'auto' }}
          contentContainerStyle={{ alignItems: "center"}}
          // ItemSeparatorComponent={() => <Divider style={{ width: '100%', height: 1, backgroundColor: Colors.primaryColor }} />}
          // ListEmptyComponent={() => <ListEmpty text='No reviews' />}
          ListFooterComponent={() => <View style={{ height: 20 }}/>}
          />  
      </View>
    }
  </>
  )
 }

 const Stars = ({ ratings=0, total=5, size }) => { 
  const stars = new Array(Math.round(ratings)).fill('★'); 
  const remianing = new Array(total - Math.round(ratings)).fill('☆'); ; 
  return <LatoText color={'#F2BF07'} fontSize={rf(1.7)}>
    {stars.map(star => star)}{remianing.map(star => star)}
  </LatoText>
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
  avatar:{
    height: wp('30%')*0.7,
    width: wp('30%'),
    borderRadius: 2,
    resizeMode: 'cover'
  },
  imageBtn:{
    height: wp('30%')*0.7,
    width: wp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 2,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#4797AF',
    backgroundColor: '#F7FAFC'
  
  },
  formContainer2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: wp('100%'),
    backgroundColor: 'transparent',
    marginTop: 16,
    paddingHorizontal: wp('5%'),
    
  },

  settingItem:{
    width: wp('90%'),
    height: 50,
    borderRadius: 2,
    borderBottomColor: Colors.primaryColor,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    marginTop: 12
  },
  content: {
    width: wp('90%')-6,
    paddingHorizontal: 3
  },
  propertyItem:{
    width: wp('90%')-20,
    height: 'auto',
    flexWrap: "wrap",
    borderRadius: 6,
    marginTop: 12,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 14,
    elevation: 8,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,        

  }

})