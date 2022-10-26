import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { Check } from '../../components/Check';
import CitySearchBar from '../../components/CitySearchBar';
import Footer from '../../components/Footer';
import GoogleMaps from '../../components/GoogleMaps';
import ImageFile from '../../components/ImageFile';
import ImagePicker from '../../components/ImagePicker';
import LatoText from '../../components/LatoText';
import MediaUpload from '../../components/MediaUpload';
import NavigationHeader from '../../components/NavigationHeader';
import PrimaryButton from '../../components/PrimaryButton';
import RadioButtons from '../../components/RadioButtons';
import Row from '../../components/Row';
import StyledDatepicker from '../../components/StyledDatepicker';
import StyledDropdown from '../../components/StyledDropdown';
import StyledInput from '../../components/StyledInput';
import { TextButton } from '../../components/TextButton';
import VideoFile from '../../components/VideoFile';
import VideoPicker from '../../components/VideoPicker';
import Colors from '../../constants/Colors';
import CommonStyles from '../../constants/CommonStyles';
import { hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { goBack } from '../../navigations/NavigationService';
import { resetForm, setFormError, setPhotos, setPropertyForm, setVideos, updatePropertyForm, useCreateSuccess, useFormErrors, useHouseRules, useIsLoading, useMedia, usePropertyDetails, usePropertyForm, useSuccess, useUpdateSuccess } from '../../redux/reducers/OwnerReducer';
import { usePropertyConfig } from '../../redux/reducers/PropertyReducer';
import { addHouseRule, deleteHouseRule, updateHouseRule } from '../../redux/sagas/owner/houseRulesSaga';
import { postProperty } from '../../redux/sagas/owner/postPropertySaga';
import { GeocodeAddress } from '../../services/Geocoding';
import { useCurrentLocation } from '../../utilities/hooks';

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
  const dispatch = useDispatch();
  const formValues = usePropertyForm();
  const formErrors = useFormErrors();
  const isLoading = useIsLoading();
  const createSucess = useCreateSuccess();
  const updateSucess = useUpdateSuccess();
  const createdProperty = usePropertyDetails(); 
  const { photos, videos } = useMedia();
  const {
    room_facilities,
    property_amenities,
    room_accessibilities
  } = usePropertyConfig();

  const initialState = {
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
    available_from: moment(new Date()).format('YYYY-MM-DD'),
    available_to: moment(new Date()).format('YYYY-MM-DD'),
    facilities: [],
    accessiblities: [],
    amenities: [],
    time_type: 'Day',
  }
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(setPropertyForm(initialState));
    return () => {
      dispatch(resetForm())
    }
  }, []);

  const onSubmitValue = (key, value, error) => {
    console.log('key, value: ', key, value)
    if(error)
      dispatch(setFormError({ 
        [key]: `[${key}]: ${error}` 
      }));
    else 
      dispatch(updatePropertyForm({
        [key]: value
      }));
  }
  const handleChangeCheckBox = (key, value) => {
    if(!Array.isArray(formValues[key])) {
      console.log(key, formValues[key]);
      return;
    }
    const checkedIds = [ ...formValues[key] ]; 
    if(!checkedIds.includes(value)) 
      checkedIds.push(value);
    else {
      const index = checkedIds.indexOf(value);
      if (index > -1) checkedIds.splice(index, 1);
    }
    dispatch(updatePropertyForm({
      [key]: checkedIds
    }));
  };
  const handleSubmit = () => { 
    const errorString = Object.values(formErrors).filter(val=>val!=null).join('\n');
    console.log('errorString: ', errorString);
    if(errorString.length>0)
      alert(errorString);
    else {
      dispatch(postProperty(null));
    }
  }

  useEffect(() => {
    if(createSucess) {
      const allMedia = [ ...photos, ...videos ]; 
      if(allMedia.length) {
        console.log('allMedia: ', allMedia)
        setUploading(true);
      } else {
        goBack();
      }
    }
    if(updateSucess) 
      goBack();
  }, [createSucess, updateSucess]);

   console.log('formValues: ', formValues);

  if(Object.keys(formValues).length===0) 
    return null;

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
            onEndEditing={(text, error) => onSubmitValue('title', text, error)}
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
            onEndEditing={(text, error) => onSubmitValue('description', text, error)}
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
            onEndEditing={(text, error) => onSubmitValue('per_night_price', text, error)}
            inputProps={{ keyboardType: 'number-pad' }}
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
            // onChangeText={(text) => onSubmitValue('minimum_renting_duration', text)}
            onEndEditing={(text, error) => { onSubmitValue('minimum_renting_duration', text, error) }}
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
            onChangeText={(text, error) => onSubmitValue('country', text, error)}
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
            onChangeText={(text, error) => onSubmitValue('city', text, error)}
          />
          
          <Divider style={{ width: "100%", height: 1, backgroundColor: '#CCDBE0', marginTop: 20, marginBottom: 16 }}/>

          <LatoText bold fontSize={rf(1.7)} >{`Property Availability`}</LatoText>
          <Row style={{ alignItems: 'center', marginVertical: 20 }}>
            <View style={{ width: wp('42%') }}>
              <StyledDatepicker 
              label={'From'}
              value={moment(formValues.available_from).toDate()}
              onDateChange={(date) => onSubmitValue('available_from', moment(date).format('YYYY-MM-DD'))}
              datepickerStyle={{ width: wp('40%')-30 }}  
              containerStyle={{ justifyContent: 'flex-start', }}
              />
            </View>
            <View style={{ width: wp('42%') }}>
              <StyledDatepicker 
                label={'To'}
                value={moment(formValues.available_to).toDate()}
                onDateChange={(date) => onSubmitValue('available_to', moment(date).format('YYYY-MM-DD'))}
                datepickerStyle={{ width: wp('40%')-30 }}  
                containerStyle={{ justifyContent: 'flex-start', }}
                />
            </View>
          </Row>

          <PrimaryButton
            title={'Post New Property'}
            onPress={handleSubmit}
            loading={isLoading}
            titleStyle={{ fontSize: rf(2) }}
            buttonStyle={{ width: wp('90%'), height: hp('5%') }}
            containerStyle={{ marginTop: 20 }}
            />

        </View>
      </ScrollView>

      <MediaUpload 
        uploading={uploading}
        closeModal={() => setUploading(false)}
        data={[ ...photos, ...videos ]}
        propertyId={createdProperty?.id}
      />
    </KeyboardAvoidingView>
  )
 }
const EditableInput = ({ label, value, title, placeholder, onEndEditing, inputProps, isInputVisible=true }) => { 
  const [edit, setEdit] = useState(isInputVisible);
  const [text, setText] = useState(value);
  const _onEndEditing = (text, error) => {
      setEdit(!!error); 
      onEndEditing(text, error);
  }
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
        onEndEditing={_onEndEditing}
        {...inputProps}
      />
    )
  else return (
    <LatoText fontSize={rf(1.6)}><LatoText bold>{title}: </LatoText><LatoText> {text}  </LatoText><Icon.Community name='pencil-outline' size={18} color={Colors.primaryColor} onPress={() => setEdit(true)} /></LatoText>
  )
 }

  const VideoList = () => { 
    const dispatch = useDispatch();
    const { videos } = useMedia();
    const [showVideoPicker, setShowVideoPicker] = useState(false);
    
    const onPickVideo = (vids) => {
      dispatch(setVideos(videos.concat(vids)));
    }
    const removeVideo = (video) => {
      const newData = [ ...videos ]; 
      const index = videos.findIndex(item => item.name === video.name); 
      newData.splice(index,1);
      dispatch(setVideos(newData));
    }

  return (
    <View style={{ marginVertical: 20 }}>
       <LatoText bold fontSize={rf(1.6)}>Videos</LatoText>
       <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap', marginTop: 10  }}>
          {
            videos.map((item,i) => {
              <VideoFile 
                key={item.uri+''+i}
                data={item} 
                containerStyle={styles.thumbnail} 
                onRemove={() => removeVideo(item)} />
            })
          }
          <VideoFile  containerStyle={styles.thumbnail} onAdd={() => setShowVideoPicker(true)} />
       </View>
       <VideoPicker
        showPicker={showVideoPicker}
        closePicker={() => setShowVideoPicker(false)}
        onPickVideo={onPickVideo}
        multipleSelection={true}
      />
    </View>
  )
  }
  const ImageList = () => { 
    const dispatch = useDispatch();
    const { photos } = useMedia();
    const [showImagePicker, setShowImagePicker] = useState(false);
    
    const onPickImage = (images) => {
      dispatch(setPhotos(photos.concat(images)));
    }
    const removePhoto = (image) => {
      const newData = [ ...photos ]; 
      const index = photos.findIndex(item => item.name === image.name); 
      newData.splice(index,1);
      dispatch(setPhotos(newData));
    }
    return (
      <View style={{ marginVertical: 20 }}>
         <LatoText bold fontSize={rf(1.6)}>Photos</LatoText>
         <Row style={{ width: '100%', flexWrap: 'wrap', marginTop: 10  }}>
          {
            photos.map((item,i) => 
              <ImageFile 
                key={item.uri+''+i}
                data={item} 
                thumbnail={item.uri} 
                containerStyle={styles.thumbnail} 
                onRemove={() => removePhoto(item)}
                />
            )
          }
          <ImageFile  containerStyle={styles.thumbnail} onAdd={() => setShowImagePicker(true)} />
         </Row>
         <ImagePicker
          showPicker={showImagePicker}
          closePicker={() => setShowImagePicker(false)}
          onPickImage={onPickImage}
          multipleSelection={true}
        />
      </View>
    )
  }
  const Location = () => { 
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [city, setCity] = useState('');
  const [coords, setCoords] = useState();
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);
  const userLocation = useCurrentLocation();
  
  useEffect(() => {
    if(city && city.length) {
      GeocodeAddress(city, ({lat,lng}) => {
        setCoords({ latitude: lat, longitude: lng });
        dispatch(updatePropertyForm({ latitude: lat, longitude: lng }));
      });
    }
   }, [city]);
   useEffect(() => {
    if(isCurrentLocation && userLocation) {
      setCoords({ ...userLocation });
      dispatch(updatePropertyForm({ ...userLocation }));
    }
   }, [isCurrentLocation]);
   
   const onSearch = (val) => { 
    setCity(val); 
    setIsCurrentLocation(false) 
    dispatch(updatePropertyForm({ city: val }));
   }
  const onCurrentLocation = (val) => { 
    setIsCurrentLocation(val);
   }
   return(
    <View style={{ width: wp('90%') }}>
      <Pressable onPress={() => {setExpanded(!expanded)}}>
        <LatoText bold>Upload Location  <Icon.Ionicon name='chevron-down-sharp' size={16} color={Colors.text} style={{ marginTop: 10 }} /></LatoText>
      </Pressable>
      {
        expanded && 
        <View style={{ width: wp('90%') }}>
           <CitySearchBar value={city} onSelect={onSearch} />
           {
            (coords || userLocation) &&
            <GoogleMaps 
                center={coords || userLocation}
                markers={[{
                  key: city, 
                  id: city, 
                  markerCoords: coords || userLocation, 
                  title: coords ? city : 'My Location', 
                }]}
                mapContainer={{ height: 185, marginTop: 16 }}
              />
            }

            <Check text={'Choose my current location'} checked={isCurrentLocation} onChange={onCurrentLocation} />
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

  console.log('rules: ', rules);

  useEffect(() => {
    setRules(houseRules);
  }, [houseRules]);
  
  const onAddRule = (text) => { 
    if(text.length===0) return;
    setEdit(false); 
    setRules(rules.concat([{ name: text }])); 
    setNewRule('');
    dispatch(addHouseRule({ name: text }));
  }
  const onEdit = (text, rule) => { 
    if(text.length>0) {
      let edited = [ ...rules ]; 
      const index = edited.findIndex(r => r.id === rule.id); 
      edited[index] = { ...edited[index], name: text };
      setRules(edited); 
      dispatch(updateHouseRule({
        id: rule.id,
        rule: { name: text },
      }));
    } else {
      let edited = [ ...rules ]; 
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
          key={rule.id || `rule-${i+1}`}
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
    marginVertical: 2
  }
});
