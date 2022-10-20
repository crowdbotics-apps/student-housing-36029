import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import Footer from '../../components/Footer';
import NavigationHeader from '../../components/NavigationHeader';
import Colors from '../../constants/Colors';
import LatoText from '../../components/LatoText';
import { rf, wp, hp } from '../../constants/Constants';
import PrimaryButton from '../../components/PrimaryButton';
import Icon from '../../constants/Icon';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../navigations/NavigationService';


export default function AdminHomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <NavigationHeader />
      <View style={styles.main__view}>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <LatoText bold color={Colors.text} fontSize={rf(2.3)} style={{ alignSelf: 'flex-start', marginBottom: 20 }}>Dashboard</LatoText>
          <PrimaryButton
            title={'View Users'}
            buttonStyle={{ width: wp('40%'), height: hp('5%'), }}
            onPress={()=>{navigation.navigate('Users')}}
          />
        </View>
        <View style={{ flexDirection: 'row', top: hp('6%') }}>
          <Pressable onPress={()=>{ navigate('Properties') }}>
            <View style={styles.section__view}>
              <Icon.Ionicon name='home' size={20} color={Colors.primaryColor} />
              <LatoText bold color={Colors.text} fontSize={rf(1.8)}>Properties</LatoText>
            </View>
          </Pressable>
          <Pressable onPress={()=>{ navigate('AllChats') }}>
            <View style={styles.section__view}>
              <Icon.Entypo name='chat' size={20} color={Colors.primaryColor} />
              <LatoText bold color={Colors.text} fontSize={rf(1.8)}>Conversations</LatoText>
            </View>
          </Pressable>
        </View>
        <View style={{ top: hp('8%'),left:-5 }}>
          <Pressable onPress={()=>{ navigate('Bookings') }}>
            <View style={styles.section__view}>
              <Icon.FontAwesome name='history' size={20} color={Colors.primaryColor} />
              <LatoText bold color={Colors.text} fontSize={rf(1.8)}>Booking History</LatoText>
            </View>
          </Pressable>
        </View>


      </View>

      {/* <Footer /> */}

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  main__view: {
      marginHorizontal: '5%',
      top: hp('2.5%')
  },
  section__view: {
    height: hp('20%'),
    width: wp('40%'),
    alignItems: 'center',
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 6,
    backgroundColor: '#F7FAFC',
    margin: '3%'
  }
});

