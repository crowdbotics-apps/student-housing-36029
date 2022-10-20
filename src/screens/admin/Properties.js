import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import LatoText from '../../components/LatoText';
import ListEmpty from '../../components/ListEmpty';
import NavigationHeader from '../../components/NavigationHeader';
import PrimaryButton from '../../components/PrimaryButton';
import PropertyItem from '../../components/PropertyItem2';
import PropertyLoader from '../../components/PropertyLoader';
import Row from '../../components/Row';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { goBack, navigate } from '../../navigations/NavigationService';
import { setPropertyDetails, useIsLoading, useProperty } from '../../redux/reducers/OwnerReducer';
import { fetchAllProperty } from '../../redux/sagas/owner/fetchSaga';
import { useDispatchEffect } from '../../utilities/hooks';

export default function Properties() {
  
  return (
    <View style={styles.container}>

      <NavigationHeader />

      <Row style={{ width: wp('90%'), marginVertical: 20, alignItems: 'flex-start', }}>
        <Button
            title="Properties"
            type='clear'
            onPress={() => goBack()}
            icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight: 5 }} />}
            titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold' }}
            buttonStyle={{ backgroundColor: "transparent", }}
            containerStyle={{ alignSelf: 'flex-start', }}
            TouchableComponent={TouchableOpacity}
        />
        <PrimaryButton
          title={'Add Property'}
          onPress={() => navigate('NewProperty')}
          titleStyle={{ fontSize: rf(1.6) }}
          buttonStyle={{ width: wp('45%'), height: hp('5%'),  }}
          containerStyle={{ paddingHorizontal: 0 }}

          />
      </Row>

      <PropertyList />

      <Footer />

    </View>
  )
}

const PropertyList = () => { 
  const properties = useProperty();
  const dispatch = useDispatch();
  const isLoading = useIsLoading();

  useDispatchEffect(fetchAllProperty);

  const onViewProperty = (id) => { 
    dispatch(setPropertyDetails(properties.find(p => p.id === id)));
    navigate('EditProperty');
  }
   
  console.log(properties);
  if(isLoading) 
   return <PropertyLoader />

  return(
    <FlatList
      data={properties}
      renderItem={({item, index}) => (
        <PropertyItem 
          {...item} 
          onViewProperty={onViewProperty}
          />
      )}
      keyExtractor={(item, i) => item.id}
      style={{ width: wp('100%'), height: '100%', backgroundColor: "#FFF", }}
      contentContainerStyle={{ alignItems:'center', padding: wp('2.5%')}}
      ListEmptyComponent={() => <ListEmpty text='No items to display' height={hp('80%')}/>}
      ListFooterComponent={() => <View style={{height: 100}}/>}
      />  
  )
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
});

