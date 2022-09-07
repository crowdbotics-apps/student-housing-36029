import { useRoute } from '@react-navigation/native';
import { MoreOrLess } from "@rntext/more-or-less";
import moment from 'moment';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, ListItem, Rating } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import images from '../../assets/images';
import LatoText from '../../components/LatoText';
import ListEmpty from '../../components/ListEmpty';
import NavigationHeader from '../../components/NavigationHeader';
import PrimaryButton from '../../components/PrimaryButton';
import PropertyItem from '../../components/PropertyItem';
import Row from '../../components/Row';
import StyledInput from '../../components/StyledInput';
import Colors from '../../constants/Colors';
import CommonStyles from '../../constants/CommonStyles';
import { hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { goBack, navigate } from '../../navigations/NavigationService';
import { useIsLoading, useProfilePreview, useReviewResponse, useReviews } from '../../redux/reducers/ProfileReducer';
import { setPropertyDetails } from '../../redux/reducers/PropertyReducer';
import { fetchOwnerProfile } from '../../redux/sagas/profile/fetchOwnerProfileSaga';
import { fetchMoreReviews, fetchReviews, postReview } from '../../redux/sagas/profile/fetchReviewsSaga';
import { updateWishlist } from '../../redux/sagas/property/updateSaga';
import { useDispatchEffect, useKeyboard } from '../../utilities/hooks';
import { timeInWords } from '../../utilities/utils';

export default function OwnerProfilePreview() {
  const dispatch = useDispatch();
  const userId = useRoute().params?.id;
  const profilePreview = useProfilePreview();
  const reviews = useReviews(); 
  const isLoading = useIsLoading();
  const isKeyboardVisible = useKeyboard();

  const { user, properties, user_profile, should_rate_owner } = profilePreview;
  
  let ownerRating = 0;
  let ownerReviews = [];
  if (reviews?.length) {
    ownerReviews = reviews?.filter((review) => review.to_user?.id === +userId);
    if(ownerReviews.length) {
      ownerReviews.forEach(item => {
        ownerRating += item.rating;
      });
      ownerRating = ownerRating / ownerReviews.length;
    }
  }

  const onViewProperty = (id) => { 
    dispatch(setPropertyDetails(properties?.find(p => p.id === id)));
    navigate('PropertyDetails')
   }
   const onFavourite = (id, val) => { 
    console.log(id, val);
    dispatch(
      updateWishlist({
        property_id: id,
        is_wish_listed: val,
      }),
    );
   }

  useDispatchEffect(fetchOwnerProfile, userId, userId);
  useDispatchEffect(fetchReviews, null, true);

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

              <View style={{ width: '100%', marginTop: hp('2%') }}>
                <Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} onPress={() => { goBack() }}/>
              </View>

              <LatoText black fontSize={rf(2.8)}>
                {`${user ? user?.full_name+'’s' : ''} Profile`}
              </LatoText>

              <Overview 
                id={user?.id}
                imageUrl={user_profile?.profile_image_url}
                propertyCount={properties?.length || 0}
                ratings={ownerRating}
              />

              {
              properties?.length > 0 &&
              <View style={{ }}>
                <LatoText black fontSize={rf(2.2)}>{`Properties  (${properties?.length || 0})`}</LatoText>
                  {
                    properties?.map(item => (
                      <PropertyItem
                        {...item} 
                        onViewProperty={onViewProperty}
                        toggleFavourite={(val) => onFavourite(item.id, val)} 
                        />
                    ))
                  }
              </View>
              }

              <Reviews ratings={ownerRating} reviews={ownerReviews} />

              { 
                should_rate_owner && 
                <GiveRating id={user?.id} name={user?.full_name} /> 
              }

            </View>

            </ScrollView>

          </KeyboardAvoidingView>
        </View>
      )
}
const Overview = ({ id, imageUrl, propertyCount, ratings }) => { 
  return (
    <ListItem containerStyle={overviewStyles.container}>
      <Image source={imageUrl ? {uri: imageUrl} : images.dummyProfileImage} style={overviewStyles.image} />
      <ListItem.Content style={overviewStyles.content}>
      <ListItem.Title>
        <View style={{ width: wp('50%') }}>
            <LatoText fontSize={rf(1.8)}><LatoText bold>{`Properties: `}</LatoText>{propertyCount}</LatoText>
            <LatoText style={{ width: '100%', lineHeight: 22, fontSize: rf(1.6) }}>Total owner’s rate:  <Stars ratings={ratings} /></LatoText>
        </View>
      </ListItem.Title>
      <ListItem.Subtitle style={{ width: wp('40%') }}>
        <Button
            title={'Contact Property Owner'}
            type='solid'
            onPress={() => { navigate('Chat') }}
            titleStyle={{ color: Colors.white, fontSize: rf(1.6), fontFamily: 'Lato-Bold', }}
            buttonStyle={{ backgroundColor: Colors.primaryColor, width: '100%',height: 35, borderRadius: 6, padding: 0 }}
            containerStyle={{ width: wp('40%'), height: 35,borderRadius: 6,  }}
            // TouchableComponent={TouchableOpacity}
            />   
      </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
)

 }
const Reviews = ({ ratings, reviews }) => { 
  const dispatch = useDispatch();
  const reviewResponse = useReviewResponse(); 

  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => { 
    setCollapsed(!collapsed)
   }

  const handleLoadMore = () => {
    const payload = reviewResponse?.next.split('?')[1];
    dispatch(fetchMoreReviews(payload));
  };

  return (
    <View style={{ width: '100%', backgroundColor: '#F7FAFC', borderRadius: 10, padding: wp('2%'), marginVertical: 10}}>
       {
        !!ratings && 
        <Row style={{ width: '100%', height: 30 }}>
          <LatoText black fontSize={rf(2)}>{`Property Owner Rate: `}</LatoText>
          <LatoText style={{ width: '50%', lineHeight: 22, fontSize: rf(1.6), textAlign: 'right' }}>
            Rate: {ratings?.toFixed(1)}   <Stars ratings={ratings} size={rf(2.2)} />
          </LatoText>
        </Row>
      }
      <LatoText black fontSize={rf(2)}>{`Reviews: `}</LatoText>
      {
        reviews.length===0 ? <ListEmpty text='No reviews' height={50}/> 
        :
        reviews.map((item,index) => {
          if (index > 1 && collapsed) return null;
          return (
            <Row style={{ width: "100%",marginTop: 5 }} key={item.id}>
              <View style={{ width: '25%', }}>
                <LatoText fontSize={rf(1.5)} color={'#828282'} style={{ lineHeight: 20 }}>{timeInWords(new Date(item.date))}</LatoText>  
                <LatoText fontSize={rf(1.5)} color={'#828282'}>{moment(new Date(item.date)).format('MM/DD/YYYY')}</LatoText>  
              </View>
              <MoreOrLess 
                numberOfLines={2} 
                textComponent={LatoText} 
                containerStyle={{ width: '75%' }}
                textStyle={{ fontSize: rf(1.6) }}
                textButtonStyle={{ fontSize: rf(1.6), color: Colors.textButton }}>
                {item.comment}{' '}
                <LatoText bold>{` - `} {item.from_user.name}</LatoText>
              </MoreOrLess>  
            </Row>
          )
        })
      }
      {reviewResponse?.next && !collapsed && (
        <Pressable onPress={handleLoadMore}>
          <LatoText bold color={Colors.textButton} style={{ marginVertical: 10 }}>{`Load more..`}</LatoText>
        </Pressable>
      )}
      {reviews?.length > 2 && (
        <Pressable onPress={toggleCollapsed}>
          <LatoText bold fontSize={rf(1.7)} color={Colors.textButton} style={{ width: '100%', marginVertical: 10, lineHeight: 20 }}>
            { !collapsed ? 'Close all reviews' : 'Open all reviews' }{"  "}
            <Icon.Ionicon name='chevron-down-sharp' size={15} color={Colors.textButton} style={{ height: 10 }} />
          </LatoText>
        </Pressable>
      )}
    </View>
  )
 }

 const GiveRating = ({ id, name }) => {
  const dispatch = useDispatch(); 
  const isLoading = useIsLoading();
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');

  const submitForm = () => { 
    if (userReview.length===0) {
      return alert('Enter valid review');
    }
    const payload = {
      'to-user': +id,
      rating: userRating,
      comment: userReview,
    };
    dispatch(postReview(payload));
    setUserRating(0);
    setUserReview('');
  }
  return(
    <View style={{ width: '100%', backgroundColor: '#F7FAFC', borderRadius: 10, paddingHorizontal: wp('2%'), paddingVertical: hp('2.5%')}}>
      <LatoText black fontSize={rf(2)}>{ name }</LatoText>
      <Row style={{ width: wp('100%'), justifyContent: 'flex-start' }}>
        <LatoText fontSize={rf(1.6)}>Rate owner: </LatoText>
        <Rating 
          ratingCount={5}
          startingValue={0}
          imageSize={wp('3%')}
          style={styles.rating} 
          onFinishRating={(rating) => setUserRating(rating)}
          
          />
      </Row>
      <LatoText fontSize={rf(1.6)}>Write a review  <Icon.Community name='pencil-outline' size={16} color={Colors.primaryColor} /> </LatoText>
      <StyledInput
        required
        containerStyle={CommonStyles.input}
        value={userReview}
        placeholder={'Write your review here'}
        keyboardType="default"
        returnKeyType="done"
        onChangeText={(text) => setUserReview(text)}
      />
      <PrimaryButton
        title={'Save Review'}             
        onPress={submitForm}
        loading={isLoading}
        buttonStyle={{ width: wp('60%'), height: hp('5%') }}
        containerStyle={{ width: wp('90%'), marginTop: 20, alignItems:'center' }}
        />

    </View>
  )
}
 const Stars = ({ ratings=0, total=5, size }) => { 
  const stars = new Array(Math.round(ratings)).fill('★'); 
  const remianing = new Array(total - Math.round(ratings)).fill('☆');
  return <LatoText color={'#F2BF07'} fontSize={rf(1.9)}>
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
    paddingVertical: hp('2%'),
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
  },
  rating:{
    alignItems: "flex-start",
    justifyContent:"center",
    width: wp('15%'),
    height: 30,
    marginLeft: 10,
    backgroundColor: "#F7FAFC"
  },

});

const overviewStyles = StyleSheet.create({
  container: {
    height: 'auto',
    width: wp('90%'),
    justifyContent:'flex-start',
    alignItems: "center",
    marginVertical: hp('4%'),
    padding:0
  },
  content: {
    height: wp('40%'),
    width: wp('50%'),
    justifyContent:'space-between',
    alignItems: 'flex-start',
    marginLeft: 0
  },
  image:{
    height: wp('40%'),
    width: wp('40%'),
    borderRadius: 2,
    resizeMode: 'contain',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0
  },
  rating:{
    alignItems: "flex-start",
    justifyContent:"center",
    width: wp('15%'),
    height: 30
  },

})
; 

