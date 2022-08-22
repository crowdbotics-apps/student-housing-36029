import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { goBack, navigate } from '../../navigations/NavigationService';
import { setFilters, setPropertyDetails, useFilters, useHouseRules, useIsLoading, useProperty, usePropertyConfig } from '../../redux/reducers/PropertyReducer';
import { updateWishlist } from '../../redux/sagas/property/updateSaga';
import Popover, { PopoverMode, PopoverPlacement } from 'react-native-popover-view';
import { useDispatchEffect } from '../../utilities/hooks';
import { searchProperty } from '../../redux/sagas/property/fetchSaga';
import { Button, Divider } from 'react-native-elements';
import GoogleMaps from '../../components/GoogleMaps';
import { GeocodeAddress } from '../../services/Geocoding';
import { toQueryString } from '../../utilities/utils';
import StyledInput from '../../components/StyledInput';
import CommonStyles from '../../constants/CommonStyles';
import VideoFile from '../../components/VideoFile';
import ImageFile from '../../components/ImageFile';
import CitySearchBar from '../../components/CitySearchBar';
import RadioButtons from '../../components/RadioButtons';
import StyledDropdown from '../../components/StyledDropdown';
import { TextButton } from '../../components/TextButton';
import StyledDatepicker from '../../components/StyledDatepicker';
import { addHouseRule, deleteHouseRule, updateHouseRule } from '../../redux/sagas/property/houseRulesSaga';
import ImageUpload from '../../components/ImageUpload';
import VideoUpload from '../../components/VideoUpload';

export default function NewPropertyScreen() {

  return (
    <View style={styles.container}>
      <NavigationHeader />
      
      <Button
        title={'New Property'}
        type='clear'
        onPress={() => goBack()}
        icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight:5 }}/>}
        titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Black', }}
        buttonStyle={{ backgroundColor: "transparent", padding: 0}}
        containerStyle={{ marginBottom: hp('3%'), alignSelf: 'flex-start', marginTop: hp('3%'), marginLeft: wp('5%'),  }}
        TouchableComponent={TouchableOpacity}
        />  

      <NewPropertyForm />

      <Footer />
    </View>
  )
}

const NewPropertyForm = () => { 
  const {
    room_facilities,
    property_amenities,
    room_accessibilities
  } = usePropertyConfig();

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    minimum_renting_duration: '',
    per_night_price: '',
    type: '',
    bath_room: '',
    status: '',
    no_of_rooms: 0,
    no_of_beds: 0,
    country: '',
    city: '',
    media: [],
    available_from: new Date(),
    available_to: new Date(),
    facilities: [],
    accessiblities: [],
    amenities: [],
    time_type: 'Day',
  });

  const onSubmitValue = (key, value) => {
    setFormValues({
      ...formValues,
      [key]: value
    })
  }
  const handleChangeCheckBox = (key, value) => {
    const newValues = { ...formValues }; 
    if(!newValues[key].includes(value)) 
      newValues[key] = [ ...newValues[key], value ];
    else {
      const index = newValues[key].findIndex((val) => val === value);
      if (index > -1) newValues[key].splice(index, 1);
    }
    setFormValues(newValues);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          width: wp("100%"),
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 80,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
      >
        <View style={styles.formContainer}>

          <EditableInput 
            label={'Enter Property Name'}
            placeholder={'Write here'}
            title={'Property Name'}
            value={formValues.title}
            onEndEditing={(text) => onSubmitValue('title', text)}
            />
          
          <VideoList />
          <ImageList />
          <Location />

          <Divider style={{ width: "100%", height: 1, backgroundColor: '#CCDBE0', marginTop: 10, marginBottom: 16 }}/>

          <EditableInput 
            label={'Add Description'}
            placeholder={'Write here'}
            title={'Description'}
            value={formValues.description}
            onEndEditing={(text) => onSubmitValue('description', text)}
            />
          
          <LatoText bold fontSize={rf(1.7)} style={{marginTop: 20}}>Property Type</LatoText>
          <View style={{marginTop: 5}}>
            <RadioButtons
              data={[
                { label: 'Entire place' , value: 'Entire place', selected: formValues.type === 'Entire place' },
                { label: 'Private room' , value: 'Private room', selected: formValues.type === 'Private room', },
                { label: 'Shared room' , value: 'Shared room', selected: formValues.type === 'Shared room' },
              ]}
              onSelect={(item) => onSubmitValue('type', item.value)}
              layout={'column'}
              containerStyle={{ alignItems: 'flex-start', marginLeft: -10 }}
            />
          </View>

          <Divider style={{ width: "100%", height: 1, backgroundColor: '#CCDBE0', marginTop: 10, marginBottom: 16 }}/>

          <EditableInput 
            label={'Enter Price'}
            placeholder={'Write here'}
            title={'Price'}
            value={formValues.per_night_price}
            onEndEditing={(text) => onSubmitValue('per_night_price', text)}
            />
          <LatoText fontSize={rf(1.7)} style={{marginTop: 15, marginBottom: 5}}>Time Type</LatoText>
          <StyledDropdown
            placeholder={'Choose Time Type'}
            items={[
              { label: 'Day', value: 'Day', selected: formValues.time_type === 'Day', key: 'Type 1' },
              { label: 'Week', value: 'Week', selected: formValues.time_type === 'Week', key: 'Type 2' },
              { label: 'Month', value: 'Month', selected: formValues.time_type === 'Month', key: 'Type 3' },
              { label: 'Year', value: 'Year', selected: formValues.time_type === 'Year', key: 'Type 4' },
            ]}
            onValueChange={(value) => onSubmitValue('time_type', value)}
          />
          <Divider style={{ width: "100%", height: 1, backgroundColor: '#CCDBE0', marginTop: 20, marginBottom: 16 }}/>

          <Collapsible title={'Add Amenities'}>
            <View style={{ marginTop: 5, marginBottom: 10 }}>
              {
                property_amenities?.map(item => (
                  <Check 
                  key={`amenity_${item.id}`}
                  text={item.name} 
                  checked={formValues.amenities.includes(item.id)} 
                  onChange={()=>handleChangeCheckBox('amenities',item.id)}
                  />
                ))
              }
            </View>
          </Collapsible>
          <Collapsible title={'Add Facilities'}>
            <View style={{ marginTop: 5, marginBottom: 10 }}>
              {
                room_facilities?.map(item => (
                  <Check 
                    key={`facility_${item.id}`}
                    text={item.name} 
                    checked={formValues.facilities.includes(item.id)} 
                    onChange={()=>handleChangeCheckBox('facilities',item.id)}
                    />
                ))
              }
            </View>
          </Collapsible>
          <Collapsible title={'Add Property Accessibility'}>
            <View style={{ marginTop: 5, marginBottom: 10 }}>
            {
              room_accessibilities?.map(item => (
                  <Check 
                  key={`accessibility_${item.id}`}
                  text={item.name} 
                  checked={formValues.accessiblities.includes(item.id)} 
                  onChange={()=>handleChangeCheckBox('accessiblities',item.id)}
                  />
                ))
            }
            </View>
          </Collapsible>

          <Divider style={{ width: "100%", height: 1, backgroundColor: '#CCDBE0', marginTop: 10, marginBottom: 16 }}/>

          <LatoText bold fontSize={rf(1.7)} style={{marginTop: 0}}>Minimum Renting Duration:</LatoText>
          <View style={{marginTop: 5}}>
            <RadioButtons
              data={[
                { label: '1 day' , value: 1, selected: formValues.minimum_renting_duration===1,  },
                { label: '7 days' , value: 7, selected: formValues.minimum_renting_duration===7 },
                { label: 'Custom' , value: 'Custom', selected: ![1, 7].includes(formValues.minimum_renting_duration) },
              ]}
              onSelect={(item) => onSubmitValue('minimum_renting_duration', item.value)}
              layout={'column'}
              containerStyle={{ alignItems: 'flex-start', marginLeft: -10 }}
            />
          </View>
          {
          ![1, 7].includes(formValues.minimum_renting_duration) &&
          <StyledInput
            required
            containerStyle={CommonStyles.input}
            value={formValues.minimum_renting_duration==='Custom'?0:formValues.minimum_renting_duration}
            placeholder={'Start typing renting duration'}
            keyboardType="number-pad"
            returnKeyType="done"
            onChangeText={(text) => onSubmitValue('minimum_renting_duration', text)}
            // onEndEditing={(text) => { setEdit(false); onEndEditing(text) }}
          />
          }

          <Divider style={{ width: "100%", height: 1, backgroundColor: '#CCDBE0', marginTop: 20, marginBottom: 16 }}/>

          <LatoText bold fontSize={rf(1.7)} style={{marginTop: 0}}>Bathroom</LatoText>
          <View style={{marginTop: 5}}>
            <RadioButtons
              data={[
                { label: 'Shared' , value:'Shared', selected: formValues.bath_room === 'Shared' },
                { label: 'Private' , value:'Private', selected: formValues.bath_room === 'Private'  },
              ]}
              onSelect={(item) => onSubmitValue('bath_room', item.value)}
              layout={'column'}
              containerStyle={{ alignItems: 'flex-start', marginLeft: -10 }}
            />
          </View>

          <Divider style={{ width: "100%", height: 1, backgroundColor: '#CCDBE0', marginTop: 10, marginBottom: 16 }}/>

          <LatoText bold fontSize={rf(1.7)} style={{marginTop: 0}}>Property Status</LatoText>
          <View style={{marginTop: 5}}>
            <RadioButtons
              data={[
                { label: 'Available', value: 'Available', selected: formValues.status === 'Available' },
                { label: 'Rented', value: 'Rented', selected: formValues.status === 'Rented'  },
              ]}
              onSelect={(item) => onSubmitValue('status', item.value)}
              layout={'column'}
              containerStyle={{ alignItems: 'flex-start', marginLeft: -10 }}
            />
          </View>

          <Divider style={{ width: "100%", height: 1, backgroundColor: '#CCDBE0', marginTop: 10, marginBottom: 16 }}/>

          <HouseRules />

          <Divider style={{ width: "100%", height: 1, backgroundColor: '#CCDBE0', marginTop: 20, marginBottom: 16 }}/>
          
          <StyledInput
            required
            containerStyle={CommonStyles.input}
            label={'Enter country/state'}
            value={formValues.country}
            placeholder={'Start typing country'}
            keyboardType="default"
            returnKeyType="done"
            onChangeText={(text) => onSubmitValue('country', text)}
          />
          <View style={{ height: 15 }}/>
          <StyledInput
            required
            containerStyle={CommonStyles.input}
            label={'Enter city'}
            value={formValues.city}
            placeholder={'Start typing city'}
            keyboardType="default"
            returnKeyType="done"
            onChangeText={(text) => onSubmitValue('city', text)}
          />
          
          <Divider style={{ width: "100%", height: 1, backgroundColor: '#CCDBE0', marginTop: 20, marginBottom: 16 }}/>

          <LatoText bold fontSize={rf(1.7)} >{`Property Availability`}</LatoText>
          <Row style={{ }}>
            <View style={{ width: '50%', marginVertical: 15 }}>
              <StyledDatepicker 
              label={'From'}
              value={formValues.available_from}
              onDateChange={(date) => onSubmitValue('available_from', date)}
              datepickerStyle={{ width: 160 }}  
              containerStyle={{ width: '100%', justifyContent: 'flex-start', }}
              />
            </View>
            <View style={{ width: '50%' }}>
              <StyledDatepicker 
                label={'To'}
                value={formValues.available_to}
                onDateChange={(date) => onSubmitValue('available_to', date)}
                datepickerStyle={{ width: 160 }}  
                containerStyle={{ width: '100%', justifyContent: 'flex-start', }}
                />
            </View>
          </Row>

          <PrimaryButton
          title={'Post New Property'}
          onPress={() => {}}
          titleStyle={{ fontSize: rf(2) }}
          buttonStyle={{ width: wp('90%'), height: hp('5%') }}
          containerStyle={{ marginTop: 20 }}
          />

        </View>

      </ScrollView>
    </KeyboardAvoidingView>

  )
 }
const EditableInput = ({ label, value, title, placeholder, onEndEditing, inputProps, isInputVisible=true }) => { 
  const [edit, setEdit] = useState(isInputVisible);
  const [text, setText] = useState(value);
  if(edit)
    return(
      <StyledInput
        required
        containerStyle={CommonStyles.input}
        label={label}
        value={text}
        placeholder={placeholder}
        keyboardType="default"
        returnKeyType="done"
        onChangeText={(text) => setText(text)}
        onEndEditing={(text) => { setEdit(false); onEndEditing(text) }}
        {...inputProps}
      />

    )
  else return (
    <LatoText fontSize={rf(1.6)}><LatoText bold>{title}: </LatoText><LatoText> {text}  </LatoText><Icon.Community name='pencil-outline' size={18} color={Colors.primaryColor} onPress={() => setEdit(true)} /></LatoText>
  )
 }

 const VideoList = () => { 
  const [data, setData] = useState([]);
  const [showVideoPicker, setShowVideoPicker] = useState(false);
  const onPickVideo = (vids) => {
    setData(data.concat(vids));
  }

  return (
    <View style={{ marginVertical: 20 }}>
       <LatoText bold fontSize={rf(1.6)}>Videos</LatoText>
       <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: 10  }}>
       {
        data.map(item => {
          <VideoFile data={item} thumbnail={item.uri} containerStyle={styles.thumbnail} />
        })
       }
       <VideoFile  containerStyle={styles.thumbnail} />
       </View>
       <VideoUpload
        showPicker={showVideoPicker}
        closePicker={() => setShowVideoPicker(false)}
        onPickVideo={onPickVideo}
        multipleSelection={true}
      />

    </View>
  )
  }
 const ImageList = () => { 
  const [data, setData] = useState([]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  
  const onPickImage = (images) => {
    setData(data.concat(images));
  }
  return (
    <View style={{ marginVertical: 20 }}>
       <LatoText bold fontSize={rf(1.6)}>Photos</LatoText>
       <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: 10  }}>
        {
          data.map(item => {
            <ImageFile data={item} thumbnail={item.uri} containerStyle={styles.thumbnail} />
          })
        }
        <ImageFile  containerStyle={styles.thumbnail} />
       </View>
       <ImageUpload
        showPicker={showImagePicker}
        closePicker={() => setShowImagePicker(false)}
        onPickImage={onPickImage}
        multipleSelection={true}
      />

    </View>
  )
  }
const Location = () => { 
  const [expanded, setExpanded] = useState(false);
  const [country, setCountry] = useState('');
  const [coords, setCoords] = useState();
  useEffect(() => {
    if(country && country.length) {
      GeocodeAddress(country, ({lat,lng}) => setCoords({ latitude: lat, longitude: lng }))
    }
   }, [country]);

  return(
    <View style={{ width: wp('90%') }}>
      <Pressable onPress={() => {setExpanded(!expanded)}}>
        <LatoText bold>Upload Location  <Icon.Ionicon name='chevron-down-sharp' size={16} color={Colors.text} style={{ marginTop: 10 }} /></LatoText>
      </Pressable>
      {
        expanded && 
        <View style={{ width: wp('90%') }}>
           <CitySearchBar onSelect={(val) => setCountry(val)} />
           <GoogleMaps 
              center={coords || { latitude: 0, longitude: 0 }}
              markers={[{
                key: country, 
                id: country, 
                markerCoords: coords || { latitude: 0, longitude: 0 }, 
                title: country, 
              }]}
              mapContainer={{ height: 185, marginTop: 16 }}
            />
            <Check text={'Choose my current location'} checked={true} />
        </View>
      }
    </View>

  )
 }
 const Collapsible = ({ children, title }) => {
  const [expanded, setExpanded] = useState(false);
  return(
    <View style={{ width: wp('90%'), marginVertical:5 }}>
    <Pressable onPress={() => {setExpanded(!expanded)}}>
      <LatoText bold fontSize={rf(1.7)}>{title}  <Icon.Ionicon name='chevron-down-sharp' size={16} color={Colors.text} style={{ marginTop: 10 }} /></LatoText>
    </Pressable>
    {
      expanded && 
      children
    }
  </View>
  )
}

const input = React.createRef();

const HouseRules = () => { 
  const dispatch = useDispatch();
  const houseRules = useHouseRules();

  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setRules(houseRules);
  }, [houseRules]);
  
  const onAddRule = (text) => { 
    if(text.length===0) return;
    setEdit(false); 
    setRules(rules.concat(text)); 
    setNewRule('');
    dispatch(addHouseRule({ name: newRule }));
  }
  const onEdit = (text, rule) => { 
    if(text.length>0) {
      const edited = [ ...rules ]; 
      const index = edited.findIndex(r => r.id === rule.id); 
      edited[index].name = text;
      setRules(edited); 
      dispatch(updateHouseRule({
        id: rule.id,
        rule: { name: text },
      }));
    } else {
      const edited = [ ...rules ]; 
      const index = edited.findIndex(r => r.id === rule.id); 
      edited.splice(index, 1);
      setRules(edited);  
      dispatch(deleteHouseRule({
        id: rule.id,
      }));
    }
  }
  useEffect(() => {
    if(edit) input.current?.focus();
  }, [edit]);

  return (
    <View style={{ }}>
      <LatoText bold fontSize={rf(1.7)} style={{marginBottom: 10}}>House Rules</LatoText>
      {
        rules.map((rule,i) => (
          <EditableInput 
          key={rule.id}
          placeholder={'Write here'}
          title={`Rule # ${i+1}`}
          value={rule.name}
          onEndEditing={(text) => { onEdit(text, rule) }}
          isInputVisible={false}
          />
        ))
      }
      <Row style={{ justifyContent: 'flex-start', width: '100%', marginVertical: 10 }}>
        <TextButton 
        title={rules.length==0?'Write house rules':'Add Rule'} 
        titleStyle={{ color: Colors.primaryColor, fontSize: rf(1.6) }} 
        onPress={() =>{ setEdit(true) }}
        containerStyle={{ }}/>
      </Row>
      {
        edit && 
        <StyledInput
          ref={input}
          containerStyle={CommonStyles.input}
          value={newRule}
          placeholder={'Start typing here'}
          keyboardType="default"
          returnKeyType="done"
          onChangeText={(text) => setNewRule(text)}
          onEndEditing={(text) => { onAddRule(text) }}
          onBlur={() => { onAddRule(newRule) }}
        />
      }
    </View>
  )
 }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  formContainer: {
    width: wp('90%'),
    backgroundColor: Colors.background,
  },
  thumbnail: {
    width: wp('45%')-2,
    height: 150,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
