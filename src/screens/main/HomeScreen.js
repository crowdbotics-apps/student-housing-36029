import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { wp } from '../../constants/Constants';

export default function HomeScreen() {
  
  return (
    <View style={styles.container}>

      <Text>Home Screen</Text>
      
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
  text: {
    width: wp('80%'),
    height: 'auto',
    textAlign: 'left',
    flexWrap: 'wrap',
    fontSize: 16,
    marginTop: 30
  }

})