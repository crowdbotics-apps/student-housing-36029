/* eslint-disable arrow-body-style */
import React, { useState,  } from 'react';
import { Text, View, StyleSheet, FlatList ,  TouchableWithoutFeedback } from 'react-native';
import { Button, Divider, Input } from 'react-native-elements';
import { HEIGHT, hp, rf, ROW_NAMES, wp } from '../constants/Constants';
import Colors from '../constants/Colors';
import ReactNativeModal from 'react-native-modal';
import LatoText from './LatoText';
import Row from './Row';
import Icon from '../constants/Icon';
import PrimaryButton from './PrimaryButton';
import DraggableItemList from './DraggableItemList';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateRows, useRows } from '../redux/reducers/UsersReducer';
import { Host, Portal } from 'react-native-portalize';
import { useCallback } from 'react';
import { useEffect } from 'react';

const CustomizeRows = ({ 
    isModalVisible,
    closeModal,
    onSubmit
}) => {
  const dispatch = useDispatch();
  const userRows = useRows();

  const [rows, setRows] = useState(userRows);

  const onChangeOrder = (row) => { 
    console.log('rows: ', row);
    setRows([ ...row ]);
  }
  const onRemoveRow = (row) => { 
    console.log('row: ', row);
    setRows(rows.filter(col => col !== row));
  }
  const resetDefault = () => { 
    setRows(ROW_NAMES)
   }
    return (
      <Portal>
        <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        backdropOpacity={0.9}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        animationInTiming={300}
        animationOutTiming={300}
        useNativeDriver
        style={{width: '100%', height: '100%'}}>
        <View style={styles.listContainer}>
          <Icon.Ionicon name='close' size={20} color={Colors.text} style={{ position:'absolute', right: 20, top: 20 }} onPress={closeModal} />

            {/* <View style={{ flex:1, flexWrap:'wrap',}}> */}
            <Row style={{ justifyContent: 'center', height: 60 }}>
                <LatoText black fontSize={rf(2.8)}>Customize Rows</LatoText>
            </Row>

            <Row style={{ width: '100%', height: 250, justifyContent: 'space-between', alignItems: 'flex-start', }}>
                <View style={{ width: '45%' }}>
                    <LatoText bold fontSize={rf(1.8)} style={{ lineHeight: 30 }}>Add/Remove Rows</LatoText>
                    <RowsList onChange={(rows) => setRows(rows)} />
                    <Row style={{ justifyContent: 'flex-start', height: 40 }}>
                      <TextButton
                        title={'Reset to default'}
                        titleStyle={{ color: '#0965E0', lineHeight: 16 }}
                        onPress={resetDefault}
                      />
                    </Row>
                </View>

                <Divider orientation="vertical" width={1} style={{ right: 15 }} />

                <View style={{ width: '58%' }}>
                    <LatoText bold fontSize={rf(1.8)} style={{ lineHeight: 30 }}>Reorder Rows (Drag To Reorder)</LatoText>
                    <DraggableItemList 
                      data={rows} 
                      onChange={onChangeOrder} 
                      onRemove={onRemoveRow}/>
                    <Row style={{ justifyContent: 'flex-start', height: 40 }}>
                    <TextButton
                      title={'Reset to default'}
                      titleStyle={{ color: '#0965E0', lineHeight: 16 }}
                      onPress={resetDefault}
                    />
                    </Row>
                </View>
            </Row>
            <Row style={{  justifyContent: 'center', marginVertical: 20 }}>
              <TextButton 
                title={'Cancel'}
                onPress={closeModal}
                containerStyle={{ height: 30, justifyContent: 'center',}}
              />
              <PrimaryButton
                title={'Apply Changes'}
                onPress={() => {
                  closeModal();
                  dispatch(updateRows(rows))
                }}
                titleStyle={{ fontSize: rf(1.6) }}
                buttonStyle={{ width: 160, height: 30,  }}
                containerStyle={{ left: 20 }}
                />
            </Row>
        </View>
      </ReactNativeModal>
      </Portal>
    )
}
const RowsList = ({ onChange }) => { 
  const userRows = useRows();
  const [rows, setRows] = useState(new Map());

  useEffect(() => {
    const selectedRows = new Map();
    for (const rowName of ROW_NAMES) {
      selectedRows.set(rowName, userRows.includes(rowName))
    }
    setRows(selectedRows);
  }, [userRows]);
  
  const toggleSelect = useCallback((rowName,val) => { 
    const selectedRows = new Map(rows);
    selectedRows.set(rowName,val);
    setRows(selectedRows);
    const newRows = []; 
    selectedRows.forEach((val, key) => {
      if(val===true) newRows.push(key);
    })
    onChange(newRows);
  }, [rows]);

  return (
    <View style={{ }}>
      {
        ROW_NAMES.map(item => (
          <Check text={item} checked={rows.get(item)} onChange={(val) => toggleSelect(item,val)} key={item}/>
        ))
      }
    </View>
  )
 }
const Check = ({ text, checked, onChange }) => (
  <Row style={{ justifyContent: 'flex-start', width: text.length * 8 + 35, height: 30 }}>
    {checked ?
      <Icon.Community name='checkbox-marked' size={16} color={Colors.text} onPress={() => {onChange && onChange(!checked)}} />
      :
      <Icon.Community name='checkbox-blank-outline' size={16} color={Colors.text} onPress={() => {onChange && onChange(!checked)}} />}
    <LatoText style={{ marginLeft: 8, fontSize: rf(1.6) }}>{text}</LatoText>
  </Row>
);
const TextButton = ({ title, titleStyle, containerStyle, onPress }) => {
  return (
    <Button
      title={title}
      type='clear'
      onPress={onPress}
      titleStyle={{ color: Colors.text, fontSize: rf(1.8), fontFamily: 'Lato-Bold', height: 22, textDecorationLine: "underline", textDecorationColor: titleStyle?.color || Colors.text, ...titleStyle }}
      buttonStyle={{ width: 'auto', backgroundColor: "transparent", padding: 0 }}
      containerStyle={{ ...containerStyle }}
      TouchableComponent={TouchableOpacity} />
  );
};


const styles = StyleSheet.create({
  listContainer: {
    width: wp('90%'),
    minHeight: 50,
    maxHeight: HEIGHT-100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 0, 
    paddingHorizontal: 16
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

export default CustomizeRows;