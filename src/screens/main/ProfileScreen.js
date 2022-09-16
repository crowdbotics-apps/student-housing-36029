import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Pressable, KeyboardAvoidingView, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { Avatar, Button, Divider, Image, ListItem } from 'react-native-elements';
import NavigationHeader from '../../components/NavigationHeader';
import Colors from '../../constants/Colors';
import { AUTH_TOKEN, hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import Row from '../../components/Row';
import LatoText from '../../components/LatoText';
import StyledInput from '../../components/StyledInput';
import CommonStyles from '../../constants/CommonStyles';
import PrimaryButton from '../../components/PrimaryButton';
import { useDispatch } from 'react-redux';
import { useUser } from '../../redux/reducers/AuthReducer';
import { setProfileImage, useBookingHistory, useIsLoading, usePaymentMethod, useProfile, useReviews } from '../../redux/reducers/ProfileReducer';
import { useDispatchEffect, useKeyboard } from '../../utilities/hooks';
import { BOOKINGS, REVIEWS_DUMMY } from '../../constants/Data';
import { isEmpty } from '../../services/AuthValidation';
import ImagePicker from '../../components/ImagePicker';
import { updateProfile } from '../../redux/sagas/profile/updateSaga';
import TextInputBottomSheet from '../../components/TextInputBottomSheet';
import LocalStorage from '../../services/LocalStorage';
import { getSimplifiedError } from '../../services/ApiErrorhandler';
import UploadingModal from '../../components/UploadingModal';
import { fetchReviews } from '../../redux/sagas/profile/fetchReviewsSaga';
import ListEmpty from '../../components/ListEmpty';
import { fetchPaymentMethod, saveStripeToken } from '../../redux/sagas/profile/paymentMethodSaga';
import { fetchBookingHistory } from '../../redux/sagas/profile/fetchBookingSaga';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useRef } from 'react';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useUser();
  const profile = useProfile();
  const reviews = useReviews();
  const isLoading = useIsLoading();
  const isKeyboardVisible = useKeyboard();

  const [showImagePicker, setShowImagePicker] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [formValues, setFormValues] = useState({
    city: profile.city || '',
    country: profile.country || '',
    college: profile.college || '',
    full_name: user?.full_name || '',
  });

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value
    })
  }

  console.log('formValues: ', formValues);
  
  const submitForm = (formValues, imgFile) => {
    if(isEmpty(formValues['city'])) { alert('City field is required'); return }
    if(isEmpty(formValues['country'])) { alert('Country field is required'); return }
    if(isEmpty(formValues['college'])) { alert('College field is required'); return }
    const updateProfileData = {
      id: user.id,
      profile: formValues,
    };
    dispatch(updateProfile(updateProfileData));
    if(imgFile) 
      uploadImage(imgFile)
  }
  
  const onPickImage = (imageObj) => {
    setImgFile(imageObj);
    dispatch(setProfileImage(imageObj.uri))
  }
  const uploadImage = async (image) => { 
      const formData = new FormData();
      formData.append('profile_image',image);
      const token = await LocalStorage.getData(AUTH_TOKEN); 
      try {
        setUploading(true)
        let response = await fetch(
          `https://student-housing-app-23717.botics.co/api/v1/profile/${user.id}/`,
          {
              method: 'PATCH',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `token ${token}`
              },
              body: formData
          }
        );
          const result = await response.json();
          console.log('data: ', result);
          if(result && result.user_profile){
            dispatch(setProfileImage(result.user_profile.profile_image_url))
          }
          else if(result.error){
            alert(getSimplifiedError(result.error))    
            dispatch(setProfileImage(''));
          }
      } catch (error) {
        console.error({error});
        alert(getSimplifiedError(error))
        dispatch(setProfileImage(''));
      } finally {
        setUploading(false)
      }
    }
  
    useDispatchEffect(fetchReviews, null, true);
    useDispatchEffect(fetchPaymentMethod, null, true);
    useDispatchEffect(fetchBookingHistory, null, true);
    useDispatchEffect(fetchPaymentMethod, null, true);

    const scrollRef = useRef(); 

    return (
        <View style={styles.container}>
        <NavigationHeader />

        <KeyboardAvoidingView
          //keyboardVerticalOffset={keyboardVerticalOffset}
          behavior={Platform.OS == "ios" ? "padding" : null}
          style={styles.container}
        >
          <ScrollView
          ref={scrollRef}
            contentContainerStyle={{
              width: wp("100%"),
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: hp("8%"),
            }}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={(contentWidth, contentHeight) => {
              scrollRef.current && scrollRef.current.scrollToEnd({ 
                animating: true
              })
            }}    
          >
            <View style={styles.formContainer} >
              <LatoText bold color={Colors.text} fontSize={rf(2.2)} style={{ alignSelf: 'flex-start', marginBottom: 20 }}>Profile</LatoText>

              {
                profile.profile_image_url && !isEmpty(profile.profile_image_url) ?
                <Avatar source={{ uri: profile.profile_image_url }} containerStyle={styles.avatar} avatarStyle={{ borderRadius: 2 }} />
                :
                <>
                <TouchableOpacity style={styles.imageBtn} onPress={() => setShowImagePicker(true)}>
                  <Icon.Feather name='camera' color={'#CCDBE0'} size={36} style={{ marginBottom: 10}} />
                  <LatoText color={Colors.primaryColor} fontSize={rf(1.7)}>Upload picture</LatoText>
                </TouchableOpacity>
                <ImagePicker
                  showPicker={showImagePicker}
                  closePicker={() => setShowImagePicker(false)}
                  onPickImage={onPickImage}
                />
                <UploadingModal uploading={uploading} />
                </>
              }

              <UserName 
                value={formValues.full_name} 
                onEdit={value => onSubmitValue('full_name', value)}
                />

              <View style={[styles.formContainer2, { height: 270 }]} >
                <StyledInput
                  containerStyle={CommonStyles.input}
                  label='City'
                  placeholder={"Start typing city name"}
                  keyboardType="default"
                  returnKeyType="done"
                  value={formValues.city}
                  onChangeText={(text) => onSubmitValue("city", text)}
                />
                <StyledInput
                  containerStyle={CommonStyles.input}
                  label='Country'
                  placeholder={"Start typing country name"}
                  keyboardType="default"
                  returnKeyType="done"
                  value={formValues.country}
                  onChangeText={(text) => onSubmitValue("country", text)}
                />
                <StyledInput
                  containerStyle={CommonStyles.input}
                  label='College'
                  placeholder={"Start typing college name"}
                  keyboardType="default"
                  returnKeyType="done"
                  value={formValues.college}
                  onChangeText={(text) => onSubmitValue("college", text)}
                />
              </View>

              <Reviews 
                title={'Reviews given'} 
                data={reviews}
              />
              {/* <Reviews 
                title={'Reviews received'} 
                data={REVIEWS_DUMMY}
              /> */}
              <CreditCardPayment />
              <BookingHistory />
            </View>

            </ScrollView>

            { !isKeyboardVisible &&
            <PrimaryButton
              title={'Save Profile Updates'}
              onPress={() => submitForm(formValues, imgFile)}
              loading={isLoading}
              buttonStyle={{ width: wp('90%'), height: hp('5%'),  }}
              containerStyle={{ position: "absolute" , bottom: 20, marginTop: hp('4%') }}
              />
          }
          </KeyboardAvoidingView>
        </View>
      )
}
const UserName = ({ value, onEdit }) => { 
  const [name, setName] = useState(value);
  const [editName, setEditName] = useState(false);
  return (
    <>
    <Row style={{ marginTop: 16 }}>
      <LatoText black color={Colors.text} fontSize={rf(2)}>{name}</LatoText>
      <Icon.Community name='pencil-outline' color={Colors.text} size={20} style={{ marginLeft: 10}} onPress={() => {setEditName(true)}}/>
    </Row>
    <TextInputBottomSheet 
      isVisible={editName}
      value={name}
      onSubmitValue={(text) => {setName(text); setEditName(false); onEdit(text)}}
    />
    </>
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
                  <LatoText fontSize={rf(1.5)}>{item.comment} <LatoText bold>{`-`} {item.from_user.name}</LatoText></LatoText>  
                </ListItem.Title>
               </ListItem.Content>
               <Icon.Ionicon name='close' color={Colors.primaryColor} size={20} /> 
            </ListItem>
          )}
          keyExtractor={(item, i) => item.id}
          style={{ width: '100%', height: 'auto' }}
          ItemSeparatorComponent={() => <Divider style={{ width: '100%', height: 1, backgroundColor: Colors.primaryColor }} />}
          ListEmptyComponent={() => <ListEmpty text='No reviews' />}
          />  
      </View>
    }
  </>
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
  const [cardValues, setCardValues] = useState({

  });
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
    <Row style={{ ...styles.settingItem, backgroundColor: collapsed?'#F7FAFC':'#CCDBE0' }}>
        <LatoText fontSize={rf(1.6)} >{`Payment method`}</LatoText>
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
        paymentMethods.length === 0 &&
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
              
            }}
            style={{
              width: wp('90%'),
              height: 40,
              marginVertical: 0,
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

 const BookingHistory = ({ }) => { 
  const bookings = useBookingHistory()
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
          data={bookings}
          renderItem={({item, index}) => (
            <View style={styles.propertyItem} >
              <LatoText bold fontSize={rf(1.8)} style={{ lineHeight: 30}}>{item.property.title} </LatoText>  
              <Row style={{ width: "100%", flexWrap: "wrap" }}>
                <LatoText style={{ width: '50%', lineHeight: 20 }} fontSize={rf(1.6)}><LatoText bold>Rate property:</LatoText> <Stars ratings={item.property.rating} size={rf(2)}/></LatoText>
                <LatoText style={{ width: '50%', lineHeight: 20 }} fontSize={rf(1.6)}><LatoText bold>Rate owner:</LatoText> <Stars ratings={item.property.owner.rating} size={rf(2)} /></LatoText>
                <LatoText style={{ width: '50%', lineHeight: 20 }} fontSize={rf(1.6)}><LatoText bold>Date:</LatoText> {item.book_from}</LatoText>
                <LatoText style={{ width: '50%', lineHeight: 20 }} fontSize={rf(1.6)}><LatoText bold>Location:</LatoText> {`${item.property.city}, ${item.property.country}`} </LatoText>
                <LatoText style={{ width: '100%', lineHeight: 20 }} fontSize={rf(1.6)}><LatoText bold>Amount paid:</LatoText>  {item.total_bill} usd ({item.total_days} nights,{' '}{item.price_per_night} usd per night)</LatoText>
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
  return <LatoText color={'#F2BF07'} fontSize={size || rf(1.7)}>
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