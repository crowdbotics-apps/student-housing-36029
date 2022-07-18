import React, { useState,  } from 'react';
import { Text, View, StyleSheet, FlatList ,  TouchableWithoutFeedback } from 'react-native';
import { Divider, Input } from 'react-native-elements';
import { HEIGHT, wp } from '../constants/Constants';
import Colors from '../constants/Colors';
import ReactNativeModal from 'react-native-modal';
import LatoText from './LatoText';


const PhoneCodesModal = ({ 
  isModalVisible,
    title,
    items,
    onSelect,
    closeModal
}) => {
  
    const [search, setSearch] = useState({  
        text: '', filteredData: []
    });
    let itemsObj = {}
    items.forEach(item => {itemsObj[item['en']]=1});
    const itemNames = Object.keys(itemsObj); 

    const reduce = (list, text, index) => { 
      let result = [];
      let i = 0;
       for (let item of list) {
         if(item['en'][index]===text[index]) result[i++] = item;
       }
       if(index < text.length-1)
          return reduce(result, text, index+1);
      else 
          return result;
    }

    const onSearch = (searchTerm='') => {
      let result=items;
      if(searchTerm.length>=2) {
          result = reduce(result, searchTerm, 0);
      }
      setSearch({ 
        text: searchTerm, 
        filteredData: result
        //filteredData: items.filter(item => item.name.toUpperCase().indexOf(search.toUpperCase()) === 0 )
      });
    }

    const _onSelectItem = (item) => { 
      onSelect(item);
      closeModal();
      setSearch({ text: '', filteredData: [] })
    }
    return (
        <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        backdropOpacity={0.9}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        animationInTiming={300}
        animationOutTiming={300}
        useNativeDriver>
          <View style={styles.listContainer}>
            <View style={styles.row}>
              <LatoText style={styles.titleStyle} bold>{ title }</LatoText>
              <TouchableWithoutFeedback onPress={() => closeModal()}>
              <View><LatoText style={styles.text} >Close</LatoText></View>
              </TouchableWithoutFeedback>
            </View>
            <Input
              containerStyle={styles.inputContainer}
              inputContainerStyle={styles.inputView}
              inputStyle={styles.inputStyle}
              value=''
              placeholder='Search here'
              onChangeText={onSearch}
              onFocus={() => {}}
              onEndEditing={(text) => {}}
              keyboardType='default'
              returnKeyType='done'
              onSubmitEditing={() => {}}
              />
            <FlatList
              data={(search.text.length && search.filteredData.length) ? search.filteredData : items}
              renderItem={({item, index}) => (
                <TouchableWithoutFeedback onPress={() => _onSelectItem(item)}>
                  <View style={styles.row2}>
                    <View style={styles.modalCountryItemContainer}>
                      <Text style={styles.modalFlagStyle}>{item.flag}</Text>
                      <LatoText style={{ fontSize: 14 }}>{item["en"]}</LatoText>
                    </View>
                    <LatoText style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>{`${item.dialCode}`}</LatoText>
                  </View>
                </TouchableWithoutFeedback>
              )}
              keyExtractor={(item, i) => `${item['en']}-${i}`}
              style={styles.flatlistStyle}
              ItemSeparatorComponent={() => <Divider style={{ width: wp('90%')-50, backgroundColor: '#eee'}} />}
              keyboardShouldPersistTaps='always'
              />  
          </View>
      </ReactNativeModal>
    )
}
const styles = StyleSheet.create({
  listContainer: {
    width: wp('90%'),
    minHeight: 50,
    maxHeight: HEIGHT-100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 0, 
  },
  row: {
    flexDirection: 'row',
    height: 50, 
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  row2: {
    flexDirection: 'row',
    height: 40, 
    width: wp('90%')-40,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
  },

  titleStyle: {
    fontSize: 18,
    color: Colors.primaryColor,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    height: 40,
    width: wp('90%') - 10,
    marginTop: 10, marginBottom: 10
  },
  inputView: {
    height: 45,
    alignItems: 'center',
    borderBottomWidth: 0,
    backgroundColor: '#F6F7FB',
    paddingHorizontal: 15
  },
  inputStyle: {
      fontSize: 15
  },
  flatlistStyle: {
    width: wp('90%')-20,
    minHeight: 50,
    backgroundColor: '#FFF',
    paddingVertical: 5,
    marginBottom: 20, 
  }, 
  modalFlagStyle: {
    fontSize: 25,
    marginBottom: 5, marginRight: 20
  },
  modalCountryItemContainer: {
    width: wp('90%')-120,
    height: 50,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

})

export default PhoneCodesModal;