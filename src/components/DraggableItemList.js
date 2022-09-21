import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import Icon from '../constants/Icon';
import LatoText from './LatoText';
import Row from './Row';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist'
import { TouchableOpacity } from 'react-native';
import { rf } from '../constants/Constants';

const DraggableItemList = gestureHandlerRootHOC(({ data, onChange, onRemove }) => {
  
  const renderItem = ({ item, index, drag, isActive }) => (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
        >
          <Row style={{ marginTop: 5, width: 170 }}>
              <LatoText>{index + 1}.</LatoText>
              <View style={{ backgroundColor: '#F7FAFC', height: 30, width: 150, borderRadius: 6, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                  <LatoText fontSize={rf(1.6)}>{item}</LatoText>
                  <Icon.Ionicon name='close' size={18} color={Colors.primaryColor} onPress={() => onRemove(item)} />
              </View>
          </Row>
        </TouchableOpacity>
      </ScaleDecorator>
    );

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({ data }) => onChange(data)}
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  )
  
});

export default DraggableItemList