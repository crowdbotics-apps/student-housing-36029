import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, Pressable } from 'react-native';
import { goBack, navigate } from '../../navigations/NavigationService';
import NavigationHeader from "../../components/NavigationHeader";
import Colors from "../../constants/Colors";
import { hp, rf, ROW_NAMES, wp } from "../../constants/Constants";
import Icon from "../../constants/Icon";
import { Button, Divider, ListItem } from 'react-native-elements';
import Footer from "../../components/Footer";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import LatoText from "../../components/LatoText";
import { Check } from "../../components/Check";
import Row from "../../components/Row";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';
import CustomizeRows from "../../components/CustomizeRows";
import { useIsLoading, useRows, useUsers } from "../../redux/reducers/UsersReducer";
import { useEffect } from "react";
import { BookingData } from "../../constants/Data";
import { useDispatchEffect } from "../../utilities/hooks";
import { fetchUsers } from "../../redux/sagas/users/fetchSaga";
import { FlatList } from "react-native";
import ListEmpty from "../../components/ListEmpty";
import { TextButton } from "../../components/TextButton";
import { useDispatch } from "react-redux";
import { ActivityIndicator } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function Users() {

const navigation = useNavigation();
    const tab = 0;
    const [label, setLabel] = useState(tab === 0 ? 'Property Owners' : 'Students');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [hover, sethover] = useState(true);



    return (
        <View style={styles.container}>
            <NavigationHeader />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', top: 10, bottom: 10, marginHorizontal: 10 }}>
                <View>
                    <Button
                        title="Users"
                        type='clear'
                        onPress={() => goBack()}
                        icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight: 5 }} />}
                        titleStyle={{ color: Colors.text, fontSize: rf(2.5), fontFamily: 'Lato-Black' }}
                        buttonStyle={{ backgroundColor: "transparent", }}
                        containerStyle={{ alignSelf: 'flex-start' }}
                        TouchableComponent={TouchableOpacity}
                    />
                </View>
                <Row>
                  <Button
                    title="Customize Rows"
                    type='clear'
                    onPress={() => {
                        sethover(!hover)
                        setIsModalVisible(true);
                    }}
                    titleStyle={!hover ? { color: "blue", fontSize: rf(1.8), fontFamily: 'Lato-Bold', textAlignVertical: "bottom" } : [{ color: Colors.text, fontSize: rf(1.8), fontFamily: 'Lato-Bold' }]}
                    buttonStyle={!hover ? { backgroundColor: "transparent", borderBottomColor: "blue", borderBottomWidth: 1 } : [{ backgroundColor: "transparent", borderBottomColor: Colors.text, borderBottomWidth: 1 }]}
                    containerStyle={{ alignSelf: 'flex-start' }}
                    TouchableComponent={TouchableOpacity}
                  />
                  <Button
                    title="Add Account"
                    type='clear'
                    onPress={() => {
                        sethover(!hover)
                    }}
                    titleStyle={hover ? { color: "blue", fontSize: rf(1.8), fontFamily: 'Lato-Bold' } : [{ color: Colors.text, fontSize: rf(1.8), fontFamily: 'Lato-Bold', textAlignVertical: "bottom"  }]}
                    buttonStyle={hover ? { backgroundColor: "transparent", borderBottomColor: "blue", borderBottomWidth: 1, left: 5 } : [{ backgroundColor: "transparent", borderBottomColor: Colors.text, borderBottomWidth: 1, left: 5 }]}
                    containerStyle={{ alignSelf: 'flex-start' }}
                    TouchableComponent={TouchableOpacity}
                  />
                </Row>
            </View>

            <Tab.Navigator
                initialRouteName={'Students'}
                tabBar={props => <MyTabBar {...props} onChangeTab={label => setLabel(label)} />}
                initialLayout={{ width: wp('100%'), height: 500 }}
                style={{ width: wp('100%'), backgroundColor: '#FFF', top: 20 }}
                backBehavior='none'
                screenOptions={{
                    swipeEnabled: false,
                }}
            >
                <Tab.Screen name="Property Owner" component={PropertyOwner} options={{ tabBarLabel: 'Property Owners' }} />
                <Tab.Screen name="Students" component={Students} options={{ tabBarLabel: 'Students' }} />
            </Tab.Navigator>

            <Footer />

            <CustomizeRows 
              isModalVisible={isModalVisible}
              closeModal={() => setIsModalVisible(false)}
              />
        </View>
    )
}

const PropertyOwner = () => {
    return (
        <View style={{ backgroundColor: Colors.background, flex: 1 }}>
            <Text>Property Owner</Text>
        </View>
    )
}
const Students = () => {
  const dispatch = useDispatch();
  const isLoading = useIsLoading();
  const usersData = useUsers();

  const [studentData, setStudentData] = useState([]);
  const [checkedAll, setCheckedAll] = useState(false);

  useDispatchEffect(fetchUsers, null, studentData.length===0);
  
  useEffect(() => {
    if(usersData && usersData.results) {
      const allUsers = usersData.results || []; 
      setStudentData(studentData.concat(allUsers));
    }
  }, [usersData]);

  const loadMore = () => { 
    const payload = usersData.next;
    if(payload) {
      let paramString = payload.split('?')[1];
      dispatch(fetchUsers(paramString));  
    }
  }

  return (
      <View style={{ backgroundColor: Colors.background, flex: 1 }}>
        {
          studentData.length === 0 ? 
            isLoading ?
            <ActivityIndicator color={'blue'} size='large' /> 
            :
            <ListEmpty text='No items to display' height={hp('40%')}/>
          :
          <>
          <Row style={{ marginLeft: 20}}>
            <Check text={'Select all'} checked={checkedAll} onChange={() => { setCheckedAll(!checkedAll) }} />
          </Row>
          <FlatList
            data={studentData}
            extraData={checkedAll}
            renderItem={({item, index}) => (
              <UserItem data={item} selected={checkedAll} />
            )}
            keyExtractor={(item, i) => item.id+"-"+i}
            style={{ width: wp('100%'), height: '100%', paddingHorizontal: wp('2.5%'), backgroundColor: "#FFF", }}
            contentContainerStyle={{ alignItems:'center'}}
            ListFooterComponent={() => (
              <Row style={{ width: '100%', height: 150, marginTop: 20, alignItems: 'flex-start', }}>
                {usersData.next && !isLoading && <TextButton title={'Load more'} titleStyle={{ color: 'blue' }} onPress={loadMore}/>}
                {studentData.length>0 && isLoading && <ActivityIndicator color={'blue'} size='large' />}
              </Row>
            )}
          />  
          </>
        }
      </View>
  )

}

const UserItem = ({ selected, data }) => { 
  const rows = useRows();
  const user = data.user; 
  const country = data.country || '';
  const city = data.city || '';  

  const [isSelected, setIsSelected] = useState(false);
  const [showBookings, setShowBookings] = useState(false);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <View style={{ ...styles.card, height: showBookings ? 'auto' : 70 }}>
      <Row style={{ width: wp('85%'), height: 50, marginTop:12 }}>
        {
          isSelected ?
              <Icon.Community name='checkbox-marked' size={18} onPress={() => setIsSelected(!isSelected)} style={{ marginBottom: 10 }}/> :
              <Icon.Community name='checkbox-blank-outline' size={18} onPress={() => setIsSelected(!isSelected)} style={{ marginBottom: 10 }} />
        }
        <Row style={{ width: wp('85%')-25, flexWrap: 'wrap', justifyContent: 'flex-start', }}>
          {
            rows.map(row => {
              if(row === ROW_NAMES[0]) return <LatoText fontSize={rf(1.6)} style={{ marginRight: 16 }}>{user.name}</LatoText>
              if(row === ROW_NAMES[1]) return <LatoText fontSize={rf(1.6)} style={{ marginRight: 16 }}>{user.email}</LatoText>
              if(row === ROW_NAMES[2]) return <LatoText fontSize={rf(1.6)} style={{ marginRight: 16 }}>{user.phone_number}</LatoText>
              if(row === ROW_NAMES[3]) return <LatoText fontSize={rf(1.6)} style={{ marginRight: 16 }}>{`${[city, country].filter(item=>item.length>0).join(", ")}`}</LatoText>
              if(row === ROW_NAMES[4]) return (
                <Button
                  title="See bookings"
                  type='clear'
                  onPress={() => {
                      setShowBookings(!showBookings)
                  }}
                  icon={!showBookings ? <Icon.Ionicon name='caret-up-outline' size={13} color={Colors.text} style={{ right: 5 }} /> : <Icon.Ionicon name='caret-down-outline' size={13} color={Colors.text} style={{ right: 5 }} />}
                  titleStyle={{ color: Colors.text, fontSize: rf(1.6), fontFamily: 'Lato-Regular' }}
                  buttonStyle={{ backgroundColor: "transparent", width: 80, }}
                  TouchableComponent={TouchableOpacity}
                  iconPosition="right"
              />
              )
            })
          }
        </Row>
      </Row>

      <View style={{ height: 10 }}/>

      {
        showBookings && 
        data?.bookings.map((item, index) => (
          <View style={styles.bookingdetails} key={index}>
            <Image source={{ uri: item.imgurl }} style={{ width: (wp('30%')) }} />
            <View style={{ flexDirection: 'column', left: 10, justifyContent: 'space-around' }}>
                <LatoText style={{ fontFamily: 'Lato-Bold' }}>{item.property.name}  <Stars ratings={item.property.rating} size={rf(2)}/></LatoText>
                <LatoText>Student: {item.user.name}</LatoText>
                <Pressable onPress={()=>{navigate('BookingDetails')}}>
                  <LatoText bold color={'#0965E0'} fontSize={rf(1.8)} style={{textDecorationLine:'underline'}}>
                    View Booking Details
                  </LatoText>
                </Pressable>
            </View>
            <View style={{ justifyContent: 'space-around', left: 3 }}>
                <Icon.Material name="edit" size={15} color={'#0965E0'} />
                <LatoText></LatoText>
                <Icon.Material name="delete-outline" size={15} color={'#0965E0'} />
            </View>
          </View>
        ))
      }
    </View>
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
                  <Animated.View style={{ opacity, ...tabBarStyles.indicator }} />
              </TouchableOpacity>
            );
        })}
    </View>
)

const Stars = ({ ratings=0, total=5, size }) => { 
  const stars = new Array(Math.round(ratings)).fill('★'); 
  const remianing = new Array(total - Math.round(ratings)).fill('☆'); ; 
  return <LatoText color={'#F2BF07'} fontSize={size || rf(1.7)}>
    {stars.map(star => star)}{remianing.map(star => star)}
  </LatoText>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: Colors.background,
  },
  mainView: {
    top: hp('1%'),
    height: 550
  },
  card: {
    width: wp('90%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginTop: 8
  },
  bookingdetails: {
    backgroundColor: 'white',
    height: (hp('10%')),
    width: '100%',
    flexDirection: 'row',
    padding: '2%',
    justifyContent: 'space-between',
    bottom: 15,
    marginTop: 5
  },

})


const tabBarStyles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 5,
    },
    label: {
        textAlign: "center",
        color: Colors.text,
        fontSize: rf(1.8),
    },
    button: {
        width: 'auto',
        height: 30,
        marginHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center"
    },
    indicator: {
        width: 90,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.primaryColor
    }
})