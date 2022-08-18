/* eslint-disable arrow-body-style */
import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import ReactNativeModal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { hp, rf, WIDTH, wp } from '../constants/Constants';
import Icon from '../constants/Icon';
import { setFilters, useFilters, usePropertyConfig } from '../redux/reducers/PropertyReducer';
import { toQueryString } from '../utilities/utils';
import { Check } from './Check';
import LatoText from './LatoText';
import PrimaryButton from './PrimaryButton';
import Row from './Row';

const LeftSlider = ({ isVisible, closeModal }) => {
  const dispatch = useDispatch();
  const filters = useFilters();
  const {
    room_facilities,
    property_amenities,
    room_accessibilities
  } = usePropertyConfig();

  const [showAccessibilities, setShowAccessibilities] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false);
  const [moreFilters, setMoreFilters] = useState({
    room_facilities: [],
    room_accessibilities: [],
    property_amenities: [],
    rooms: 1,
    beds: 1
  });
  const handleCounter = (key, value) => { 
    const newFilters = { ...moreFilters }; 
    newFilters[key] = value;
    setMoreFilters(newFilters);
  }
  const handleChangeCheckBox = (key, value) => {
    const newFilters = { ...moreFilters }; 
    if(!newFilters[key].includes(value)) 
      newFilters[key] = [ ...newFilters[key], value ];
    else {
      const index = newFilters[key].findIndex((val) => val === value);
      if (index > -1) newFilters[key].splice(index, 1);
    }
    setMoreFilters(newFilters);
  };
  console.log('moreFilters: ', moreFilters);
  const handleSearch = () => { 
    closeModal();
    dispatch(setFilters({ 
      ...filters, 
      room_facilities: toQueryString(moreFilters.room_facilities),
      room_accessibilities: toQueryString(moreFilters.room_accessibilities),
      property_amenities: toQueryString(moreFilters.property_amenities),
      rooms: moreFilters.rooms,
      beds: moreFilters.beds
    }))
   }
  const clearFilters = () => { 
    closeModal();
    setMoreFilters({
      room_facilities: [],
      room_accessibilities: [],
      property_amenities: [],
      rooms: 1,
      beds: 1  
    })
    dispatch(setFilters({ 
      ...filters, 
      room_facilities: null,
      room_accessibilities: null,
      property_amenities: null,
      rooms: null,
      beds: null  
    }))
   }
    return (
        <ReactNativeModal
        isVisible={isVisible}
        onSwipeComplete={closeModal}
        swipeDirection={['left']}
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        animationIn={'slideInLeft'}
        animationInTiming={600}
        animationOut={'slideOutLeft'}
        animationOutTiming={300}
        style={styles.modal}
        useNativeDriver>
        <View style={{ width: rf(1)*35, height: '100%', padding: 26, backgroundColor:'#FFF' }}>
          <Row style={{ width: '100%', height: 40, marginBottom: 20 }}>
            <LatoText black fontSize={rf(1.8)}>Filter Properties   <Icon.Ionicon name='filter' size={18} color={Colors.text} /></LatoText>
            <Icon.Ionicon name='close' size={24} color={Colors.text} onPress={closeModal} />
          </Row>
          <ScrollView
            // contentContainerStyle={{
            //   width: "100%",
            //   paddingBottom: 0,
            // }}
          >
            <View style={{ }}>
              <Row style={{ width: '100%', marginTop: 0, justifyContent: "flex-start" }}>
                <LatoText bold style={styles.label}>Rooms</LatoText>
                <Counter value={moreFilters.rooms} onChange={(val) => handleCounter('rooms',val)} />
              </Row>
              <Row style={{ width: '100%', marginTop: 5, justifyContent: "flex-start", marginBottom:10 }}>
                <LatoText bold style={styles.label}>Beds</LatoText>
                <Counter value={moreFilters.beds} onChange={(val) => handleCounter('beds',val)} />
              </Row>
              <LatoText bold style={styles.heading}>Room Facilities</LatoText>
              {
                room_facilities?.map(item => (
                  <Check 
                    key={`facility_${item.id}`}
                    text={item.name} 
                    checked={moreFilters.room_facilities.includes(item.id)} 
                    onChange={()=>handleChangeCheckBox('room_facilities',item.id)}
                    />
                ))
              }
              <Pressable onPress={() => {setShowAccessibilities(!showAccessibilities)}}>
              <LatoText bold style={styles.heading}>Property Accessibility  <Icon.Ionicon name='chevron-down-sharp' size={16} color={Colors.text} style={{ marginTop: 10 }} /></LatoText>
              </Pressable>
              {
                showAccessibilities && room_accessibilities?.length>0 && 
                room_accessibilities?.map(item => (
                  <Check 
                  key={`accessibility_${item.id}`}
                  text={item.name} 
                  checked={moreFilters.room_accessibilities.includes(item.id)} 
                  onChange={()=>handleChangeCheckBox('room_accessibilities',item.id)}
                  />
                ))
              }
              <Pressable onPress={() => {setShowAmenities(!showAmenities)}}>
              <LatoText bold style={styles.heading}>Property Amenities  <Icon.Ionicon name='chevron-down-sharp' size={16} color={Colors.text} style={{ marginTop: 10 }} /></LatoText>
              </Pressable>
              {
                showAmenities && property_amenities?.length>0 && 
                property_amenities?.map(item => (
                  <Check 
                  key={`amenity_${item.id}`}
                  text={item.name} 
                  checked={moreFilters.property_amenities.includes(item.id)} 
                  onChange={()=>handleChangeCheckBox('property_amenities',item.id)}
                  />
                ))
              }

              <PrimaryButton
                title={'Filter Properties'}
                onPress={handleSearch}
                titleStyle={{ fontSize: rf(1.8) }}
                buttonStyle={{ width: '100%', height: 50,  }}
                containerStyle={{ marginTop: 20 }}
                />
              <Button
                title={'Clear all filters'}
                type='clear'
                onPress={clearFilters}
                titleStyle={{ color: Colors.text, fontSize: rf(1.7), fontFamily: 'Lato-Bold', height: 22, textDecorationStyle: 'solid' }}
                buttonStyle={{ width: 'auto', backgroundColor: "transparent", padding: 0 }}
                containerStyle={{ marginTop: 20 }}
                TouchableComponent={TouchableOpacity} />

            </View>
          </ScrollView>
        </View>
      </ReactNativeModal>

    )
}

const Counter = ({ value, onChange }) => { 
  const [counter, setCounter] = useState(`${value}`);

  const onChangeText = (text) => { 
    setCounter(text);
    onChange(Number(text)) 
   }
   const decrement = () => { 
    const count = Number(counter);
    if(count===1) return;
    setCounter(`${count-1}`)
    onChange(count-1)
  }
   const increment = () => { 
    const count = Number(counter);
    setCounter(`${count+1}`)
    onChange(count+1)
  }
  return (
    <Row style={{ width: 90, }}>
      <Icon.Ionicon name='remove' size={24} color={Colors.text} onPress={decrement}  />
      <Input 
      containerStyle={{ width:30, height:30, borderWidth:1, borderColor:'#000', paddingHorizontal0:0, alignItems: 'center', }}
      inputContainerStyle={{ width:24, height:30, borderBottomWidth:0, }}
      inputStyle={{ fontFamily: 'Lato-Regular', fontSize: rf(1.6), textAlign: 'center'}}
      value={`${counter}`}
      onChangeText={onChangeText}
      />
      <Icon.Ionicon name='add' size={24} color={Colors.text} onPress={increment}  />
    </Row>
  )
 }
const styles = StyleSheet.create({
    modal: {
      alignItems: 'flex-start',
      margin: 0,
    },
    label: {
      width: 70,
      fontSize: rf(1.7)
    },
    heading: {
      width: '100%',
      fontSize: rf(1.7),
      marginVertical: 10,
      marginTop: 16,
    }
    
  });
  

export default LeftSlider;