import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import Footer from '../../components/Footer';
import NavigationHeader from '../../components/NavigationHeader2';
import Colors from '../../constants/Colors';
import { rf, wp } from '../../constants/Constants';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListEmpty from '../../components/ListEmpty';
import PropertyItem from '../../components/PropertyItem';
import { PROPERTIES } from '../../constants/Data';

const Tab = createMaterialTopTabNavigator();

export default function HomeScreen() {
  
  return (
    <View style={styles.container}>

      <NavigationHeader />


      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} onChangeTab={() => {}}/>}
        initialLayout={{ width: wp('100%'),  }}
        style={{ width: wp('100%'), backgroundColor: '#FFF', }}
        backBehavior='none'
        screenOptions={{
          swipeEnabled: false
        }}
      >
        <Tab.Screen name="Nearby" component={Nearby} options={{ tabBarLabel: 'Nearby' }}/>
        <Tab.Screen name="Wishlisted" component={Wishlisted} options={{ tabBarLabel: 'Wishlisted' }}/>
        <Tab.Screen name="Recomendations" component={Recomendations} options={{ tabBarLabel: 'Personalized Recomendations' }}/>
      </Tab.Navigator>

      <Footer />

    </View>
  )
}

const Nearby = () => { 

  const [data, setData] = useState(PROPERTIES);

  return(
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <PropertyItem {...item} />
      )}
      keyExtractor={(item, i) => item.id}
      style={{ width: wp('100%'), height: '100%', padding: wp('2.5%'), backgroundColor: "#FFF", }}
      contentContainerStyle={{ alignItems:'center'}}
      ListEmptyComponent={() => <ListEmpty text='No items to display' />}
      />  
  )
 }

const Wishlisted = () => { 

  const [data, setData] = useState(PROPERTIES);

  return(
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <PropertyItem {...item} />
      )}
      keyExtractor={(item, i) => item.id}
      style={{ width: wp('100%'), height: '100%', padding: wp('2.5%'), backgroundColor: "#FFF", }}
      contentContainerStyle={{ alignItems:'center'}}
      ListEmptyComponent={() => <ListEmpty text='No items to display' />}
      />  
  )
 }

const Recomendations = () => { 

  const [data, setData] = useState(PROPERTIES);

  return(
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <PropertyItem {...item} />
      )}
      keyExtractor={(item, i) => item.id}
      style={{ width: wp('100%'), height: '100%', padding: wp('2.5%'), backgroundColor: "#FFF", }}
      contentContainerStyle={{ alignItems:'center'}}
      ListEmptyComponent={() => <ListEmpty text='No items to display' />}
      />  
  )
 }

const MyTabBar = ({ state, descriptors, navigation, position, onChangeTab }) => (
  <View style={tabBarStyles.tabBar}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key];
      const label = options.tabBarLabel;
      const isFocused = state.index === index;

      const onPress = () => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
          onChangeTab(label)
        }
      };

      const inputRange = state.routes.map((_, i) => i);
      const opacity = Animated.interpolate(position, {
        inputRange,
        outputRange: inputRange.map(i => (i === index ? 1 : 0)),
      });

      return (
        <TouchableOpacity
          key={route.key}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          style={{ ...tabBarStyles.button }}
        >
          <Animated.Text style={{ fontFamily: isFocused ? "Lato-Bold" : "Lato-Regular", ...tabBarStyles.label }}>
            {label}
          </Animated.Text>
          <Animated.View style={{ opacity, ...tabBarStyles.indicator }}/>
        </TouchableOpacity>
      );
    })}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  }
});

const tabBarStyles = StyleSheet.create({
  tabBar: {
    width: wp('90%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center",
    marginVertical: 5,
    marginTop: 50,
    marginHorizontal: wp('5%')

  },
  label: {
    textAlign: "center",
    color: Colors.text,
    fontSize: rf(1.8)
  },
  button:{ 
    width: 'auto',
    height: 35,
    marginHorizontal: 15,
    justifyContent: "space-between",
    alignItems:"center"
  },
  indicator:{
    width: '100%',
    height: 6,
    borderRadius:3,
    backgroundColor: Colors.primaryColor
  }
})
