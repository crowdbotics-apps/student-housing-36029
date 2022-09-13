import React from 'react';
import { StyleSheet, View } from 'react-native';
import Footer from '../../components/Footer';
import NavigationHeader from '../../components/NavigationHeader';
import Colors from '../../constants/Colors';


export default function AdminHomeScreen() {
  
  return (
    <View style={styles.container}>

      <NavigationHeader />

      <Footer />

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  }
});
 
