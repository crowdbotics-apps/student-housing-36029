/* eslint-disable arrow-body-style */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Footer from '../../components/Footer';
import NavigationHeader from '../../components/NavigationHeader';
import Colors from '../../constants/Colors';
import { hp, rf, wp } from '../../constants/Constants';
import Icon from '../../constants/Icon';
import { goBack, navigate } from '../../navigations/NavigationService';
import ChatBox from '../../components/ChatBox';

export default function ChatScreen() {
  
    return (
        <View style={styles.container}>
            <NavigationHeader />
            
            <Button
              title={'All Messages'}
              type='clear'
              onPress={() => goBack()}
              icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight:5, marginLeft:-5 }}/>}
              titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Black', }}
              buttonStyle={{ backgroundColor: "transparent", }}
              containerStyle={{ marginVertical: 16, alignSelf: 'flex-start', marginHorizontal: wp('5%') }}
              TouchableComponent={Pressable}
              />  

            <ChatBox />
            
            <Footer />
        </View>
      )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
})