import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { LinearProgress} from 'react-native-elements';
import Colors from '../constants/Colors';
import { WIDTH } from '../constants/Constants';
import LatoText from './LatoText';

export default function UploadingModal({ uploading }) {
  
    return (
        <Modal
          isVisible={uploading}
          backdropOpacity={0.5}
        >
          <View style={styles.modal}>
            <LatoText bold style={styles.headingText}>
              {`Photo Upload`}{' '}
            </LatoText>
            <LinearProgress
              variant="indeterminate"
              color={Colors.primaryColor}
              style={{width: WIDTH - 50, height: 6, borderRadius: 10}}
            />
          </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
  modal: {
    width: WIDTH - 30,
    height: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 14,
    padding: 10,
    elevation: 8,
  },
  headingText: {
    color: Colors.primaryColor,
    fontSize: 18,
  },

})