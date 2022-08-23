import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Check } from '../../components/Check';
import Footer from '../../components/Footer';
import InfoBox from '../../components/InfoBox';
import LatoText from '../../components/LatoText';
import LeftSlider from '../../components/LeftSlider';
import ListEmpty from '../../components/ListEmpty';
import MultirangeSlider from '../../components/MultirangeSlider';
import NavigationHeader from '../../components/NavigationHeader2';
import PrimaryButton from '../../components/PrimaryButton';
import PropertyItem from '../../components/PropertyItem';
import PropertyLoader from '../../components/PropertyLoader';
import Row from '../../components/Row';
import StyledSearchBar from '../../components/StyledSearchBar2';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { navigate } from '../../navigations/NavigationService';
import { setFilters, setPropertyDetails, useFilters, useIsLoading, useProperty } from '../../redux/reducers/PropertyReducer';
import { updateWishlist } from '../../redux/sagas/property/updateSaga';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import { useDispatchEffect } from '../../utilities/hooks';
import { searchProperty } from '../../redux/sagas/property/fetchSaga';
import { Button } from 'react-native-elements';
import GoogleMaps from '../../components/GoogleMaps';
import { GeocodeAddress } from '../../services/Geocoding';
import { toQueryString } from '../../utilities/utils';

export default function SearchScreen() {
  const filters = useFilters();

  useDispatchEffect(searchProperty, filters, filters);

  return (
    <View style={styles.container}>

      <NavigationHeader />

      <SearchFilters />

      <SearchList />

      <Footer />

    </View>
  )
}
const SearchFilters = () => {
  const dispatch = useDispatch();
  const filters = useFilters();
  const isLoading = useIsLoading();
  const city = filters.city; 

  const [showFilters, setShowFilters] = useState(false);
  const [coords, setCoords] = useState(null);
  const [mainFilters, setMainFilters] = useState({
    price_range: [0,5000],
    bathroom: [],
    room_type: []
  });
   
  useEffect(() => {
   if(city?.length) {
    setCoords(null);
     GeocodeAddress(city, ({lat,lng}) => setCoords({ latitude: lat, longitude: lng }))
   }
  }, [city]);

  const handlePriceRange = (value) => {
    const newFilters = { ...mainFilters }; 
    newFilters.price_range = value;
    setMainFilters(newFilters);
    dispatch(setFilters({ 
      ...filters, 
      price_range: newFilters.price_range,
      bathroom: toQueryString(newFilters.bathroom),
      room_type: toQueryString(newFilters.room_type)
    }))
  };
  const handleChangeCheckBox = (key, value) => {
    const newFilters = { ...mainFilters }; 
    if(!newFilters[key].includes(value)) 
      newFilters[key] = [ ...newFilters[key], value ];
    else {
      const index = newFilters[key].findIndex((val) => val === value);
      if (index > -1) newFilters[key].splice(index, 1);
    }
    setMainFilters(newFilters);
    dispatch(setFilters({ 
      ...filters, 
      price_range: newFilters.price_range,
      bathroom: toQueryString(newFilters.bathroom),
      room_type: toQueryString(newFilters.room_type)
    }))
  };

  return (
    <>
    <View style={{ marginTop: 20}}>
       <Row style={{ width: wp('50%'),}} >
        <Pressable onPress={() => setShowFilters(true)}><LatoText fontSize={rf(1.8)}>Filter Properties   <Icon.Ionicon name='filter' size={rf(2)} color={Colors.text} /></LatoText></Pressable>
        <SortPopup />
       </Row>

        <StyledSearchBar />
       
       <Row style={{ width: wp('90%'), marginTop: 0, justifyContent: "flex-start" }}>
        <LatoText bold style={styles.label}>Price Range</LatoText>
        <MultirangeSlider
          initial={[0, 5000]} 
          onValuesChange={handlePriceRange}
          min={0}
          max={5000}
          reset={false}
          defaults={[0, 5000]}
          />
       </Row>
       <Row style={{ width: wp('90%'), marginTop: 0, justifyContent: "flex-start" }}>
        <LatoText bold style={styles.label}>Bathroom</LatoText>
        <Check text={'Shared'} checked={mainFilters.bathroom.includes('Shared')  || false} onChange={()=>handleChangeCheckBox('bathroom','Shared')} />
        <Check text={'Private'} checked={mainFilters.bathroom.includes('Private')  || false} onChange={()=>handleChangeCheckBox('bathroom','Private')} />
       </Row>
       <Row style={{ width: wp('90%'), marginVertical: 10, justifyContent: "flex-start" }}>
        <LatoText bold style={styles.label}>Room Type</LatoText>
        <Check text={'Entire place'} checked={mainFilters.room_type?.includes('Entire place') || false} onChange={()=>handleChangeCheckBox('room_type','Entire place')}/>
        <Check text={'Private room'} checked={mainFilters.room_type?.includes('Private room') || false} onChange={()=>handleChangeCheckBox('room_type','Private room')}/>
        <Check text={'Shared room'} checked={mainFilters.room_type?.includes('Shared room') || false} onChange={()=>handleChangeCheckBox('room_type','Shared room')}/>
       </Row>

      { coords &&
       <GoogleMaps
        center={coords}
        markers={[{
          key: city, 
          id: city, 
          markerCoords: coords || { latitude: 0, longitude: 0 }, 
          title: city, 
        }]}
        mapContainer={{ height: 185, marginTop: 16 }}
      />
      }
    </View>
    <LeftSlider 
        isVisible={showFilters} 
        closeModal={() => setShowFilters(false)}
      />
    </>
  )
}
const SortPopup = () => { 
  const [showPopover, setShowPopover] = useState(false);

  return (
        <Popover
          placement={[PopoverPlacement.BOTTOM]}
          isVisible={showPopover}
          onRequestClose={() => setShowPopover(false)}
          from={(
            <Pressable onPress={() => setShowPopover(true)}>
              <LatoText fontSize={rf(1.8)}>Sort  <Icon.Ionicon name='filter' size={rf(2)} color={Colors.text} /></LatoText>
            </Pressable>
          )}
          arrowShift={0.5}
          verticalOffset={-StatusBar.currentHeight}
          arrowSize={{ width: 0, height: 0}}
          // backgroundStyle={{ backgroundColor: 'transparent'}}
          >
            <View style={styles.sortPopup}>
              <Row style={{ width: '100%', height: 40, marginBottom: 5 }}>
                <LatoText black fontSize={rf(1.8)}>Sort by: </LatoText>
                <Icon.Ionicon name='close' size={24} color={Colors.text} onPress={() => setShowPopover(false)} />
              </Row>
              <Check text={'The most relevant'} checked={false} />
              <Check text={'The nearest'} checked={false} />
              <Check text={'Recent'} checked={false} />
              <LatoText black fontSize={rf(1.8)} style={{ marginVertical: 16 }}> 
                Price: 
              </LatoText>
              <Check text={'From low to high'} checked={false} />
              <Check text={'From high to low'} checked={false} />
              <PrimaryButton
                title={'Sort'}
                // onPress={handleSearch}
                // loading={isLoading}
                titleStyle={{ fontSize: rf(1.8) }}
                buttonStyle={{ width: '100%', height: hp('5%'),  }}
                containerStyle={{ marginTop: 20 }}
                />
              <Button
                title={'Cancel'}
                type='clear'
                onPress={() => { setShowPopover(false) }}
                titleStyle={{ color: Colors.text, fontSize: rf(1.7), fontFamily: 'Lato-Bold', height: 22, textDecorationStyle: 'solid' }}
                buttonStyle={{ width: 'auto', backgroundColor: "transparent", padding: 0 }}
                containerStyle={{ marginTop: hp('2%') }}
                TouchableComponent={TouchableOpacity} />
            </View>
        </Popover>
  )
 }
const SearchList = () => { 
  const properties = useProperty();
  const dispatch = useDispatch();
  const isLoading = useIsLoading();

  const onFavourite = (id, val) => { 
    console.log(id, val);
    dispatch(
      updateWishlist({
        property_id: id,
        is_wish_listed: val,
      }),
    );
   }
  const onViewProperty = (id) => { 
    dispatch(setPropertyDetails(properties.find(p => p.id === id)));
    navigate('PropertyDetails')
   }

  if(isLoading) 
   return <PropertyLoader />

  return(
    <>
    {properties.length>0 &&
    <InfoBox style={{ width: 'auto', paddingHorizontal: 10, marginVertical: 5 }}>
      <LatoText>{properties.length} properties found</LatoText>
    </InfoBox>
    }
    <FlatList
      data={properties}
      renderItem={({item, index}) => (
        <PropertyItem 
          {...item} 
          onViewProperty={onViewProperty}
          toggleFavourite={(val) => onFavourite(item.id, val)} 
          />
      )}
      keyExtractor={(item, i) => item.id}
      style={{ width: wp('100%'), height: '100%', paddingHorizontal: wp('2.5%'), backgroundColor: "#FFF", }}
      contentContainerStyle={{ alignItems:'center'}}
      ListEmptyComponent={() => <ListEmpty text='No items to display' height={hp('30%')} />}
      ListFooterComponent={() => <View style={{height: 100}}/>}
      />  
    </>
  )
 }
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  label: {
    width: 80,
  },
  sortPopup: {
    width: 300,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
    // marginTop: -16,
    // alignSelf: 'center',
    elevation: 6
  }
});
