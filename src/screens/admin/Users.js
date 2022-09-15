import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, Pressable } from 'react-native';
import { goBack } from '../../navigations/NavigationService';
import NavigationHeader from "../../components/NavigationHeader";
import Colors from "../../constants/Colors";
import { hp, rf, wp } from "../../constants/Constants";
import Icon from "../../constants/Icon";
import { Button, Divider, ListItem } from 'react-native-elements';
import Footer from "../../components/Footer";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import LatoText from "../../components/LatoText";
import { Check } from "../../components/Check";
import Row from "../../components/Row";
import { ScrollView } from "react-native-gesture-handler";
import Dialog from "react-native-dialog";

const Tab = createMaterialTopTabNavigator();

export default function Users() {
    const tab = 0;
    const [label, setLabel] = useState(tab === 0 ? 'Property Owners' : 'Students');
    const [visible, setVisible] = useState(false);
    const [namesurname, setnamesurname] = useState(false);
    const [email, setemail] = useState(false);
    const [phone, setphone] = useState(false);
    const [country, setcountry] = useState(false);
    const [booking, setbooking] = useState(false);

    const ListData = ['Name Surname', 'Email', 'Phone Number', 'Country State', 'Booking'];
    // const ListData = [{item:'Name Surname' , key : 1},{ item:'Email',key:2}, {item:'Phone Number',key:3}, {item:'Country State',key:4}, {item:'Booking',key:5}];

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };


    return (
        <View style={styles.container}>
            <NavigationHeader />
            {/* Dialog Box */}
            <Dialog.Container visible={visible} >
                <View style={{ width: (wp('85%')), height: (hp('50%')) }}>
                    <Row style={{ justifyContent: 'center' }}>
                        <LatoText style={{ fontFamily: "Lato-Bold" }} fontSize={20}>Customize Rows</LatoText>
                        <Icon.Ionicon name='close' size={20} color={Colors.text} style={{ left: (wp('18%')) }} onPress={handleCancel} />
                    </Row>
                    <Row>
                        <View style={{ flexDirection: 'column' }}>
                            <LatoText style={{ fontFamily: "Lato-Bold" }}>Add/Remove Rows</LatoText>
                            <Check text={'Name Surname'} checked={namesurname} onChange={() => { setnamesurname(!namesurname) }} />
                            <Check text={'Email'} checked={email} onChange={() => { setemail(!email) }} />
                            <Check text={'Phone Number'} checked={phone} onChange={() => { setphone(!phone) }} />
                            <Check text={'Country State'} checked={country} onChange={() => { setcountry(!country) }} />
                            <Check text={'Booking'} checked={booking} onChange={() => { setbooking(!booking) }} />


                            <Pressable
                                onPress={() => {
                                        setnamesurname(false),
                                        setemail(false),
                                        setphone(false),
                                        setcountry(false)
                                        setbooking(false)
                                }}

                            ><LatoText style={{ fontFamily: 'Lato-Bold', color: '#0965E0', textDecorationLine: 'underline' }}>Reset to default</LatoText></Pressable>
                            <Button
                                title="Cancel"
                                type='clear'
                                titleStyle={{ color: Colors.text, fontSize: rf(2), textDecorationLine: 'underline', marginTop: 50 }}
                                buttonStyle={{ backgroundColor: "transparent" }}
                                containerStyle={{ alignSelf: 'flex-start' }}
                                TouchableComponent={TouchableOpacity}


                            />


                        </View>
                        <Divider orientation="vertical" width={1.5} style={{ right: 15, top: 15 }} />
                        <View style={{ flexDirection: 'column', marginTop: 30, height: '90%' }}>
                            <LatoText style={{ fontFamily: "Lato-Bold" }}>Reorder Rows (Drag To Reorder)</LatoText>
                            {
                                ListData.map((item, index) => {
                                    return (

                                        <Row style={{ marginTop: 5 }} key={index}>
                                            <LatoText>{index + 1} .</LatoText>
                                            <View style={{ backgroundColor: '#F7FAFC', height: 30, width: 150, borderRadius: 6, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 5 }}>
                                                <LatoText>{item}</LatoText>
                                                <Icon.Ionicon name='close' size={20} color={Colors.primaryColor} onPress={() => { setnamesurname(false) }} />
                                            </View>
                                        </Row>
                                    )

                                })
                            }
                            <Pressable onPress={() => {
                            }}><LatoText style={{ fontFamily: 'Lato-Bold', color: '#0965E0', textDecorationLine: 'underline' }}>Reset to default</LatoText></Pressable>
                            <Button
                                onPress={handleCancel}
                                title='Apply Changes'
                                icon={<Icon.Ionicon name='arrow-forward' size={16} color={Colors.white} style={{ top: 2 }} />}
                                buttonStyle={{ backgroundColor: Colors.secondaryColor, marginTop: 50 }}
                                TouchableComponent={TouchableOpacity}
                                iconRight={true}

                            />
                        </View>
                    </Row>

                </View>
            </Dialog.Container>
            {/* Dialog Box */}
            <View style={styles.main__view}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Button
                            title="Users"
                            type='clear'
                            onPress={() => goBack()}
                            icon={<Icon.Ionicon name='arrow-back' size={16} color={Colors.primaryColor} style={{ marginRight: 5 }} />}
                            titleStyle={{ color: Colors.text, fontSize: rf(2), fontFamily: 'Lato-Bold', }}
                            buttonStyle={{ backgroundColor: "transparent", }}
                            containerStyle={{ alignSelf: 'flex-start' }}
                            TouchableComponent={TouchableOpacity}
                        />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Button
                            title="Customize Rows"
                            type='clear'
                            onPress={showDialog}
                            titleStyle={{ color: Colors.text, fontSize: rf(1.8), fontFamily: 'Lato-Bold', }}
                            buttonStyle={{ backgroundColor: "transparent", borderBottomColor: Colors.text, borderBottomWidth: 1 }}
                            containerStyle={{ alignSelf: 'flex-start' }}
                            TouchableComponent={TouchableOpacity}
                        />
                        <Button
                            title="Add Account"
                            type='clear'
                            onPress={() => goBack()}
                            titleStyle={{ color: "blue", fontSize: rf(1.8), fontFamily: 'Lato-Bold', }}
                            buttonStyle={{ backgroundColor: "transparent", borderBottomColor: "blue", borderBottomWidth: 1, left: 5 }}
                            containerStyle={{ alignSelf: 'flex-start' }}
                            TouchableComponent={TouchableOpacity}
                        />
                    </View>
                </View>
                <Tab.Navigator
                    initialRouteName={'Students'}
                    tabBar={props => <MyTabBar {...props} onChangeTab={label => setLabel(label)} />}
                    initialLayout={{ width: wp('100%'), height: 500 }}
                    style={{ width: wp('100%'), backgroundColor: '#FFF', top: 10 }}
                    backBehavior='none'
                    screenOptions={{
                        swipeEnabled: false,
                    }}
                >
                    <Tab.Screen name="Property Owner" component={PropertyOwner} options={{ tabBarLabel: 'Property Owner' }} />
                    <Tab.Screen name="Students" component={Students} options={{ tabBarLabel: 'Students' }} />
                </Tab.Navigator>

            </View>
            <Footer />

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
    const ApiData = [
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 0 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 1 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 2 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 3 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 4 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 5 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 6 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 7 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 8 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 9 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 10 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 11 },
        { name: 'Australia', email: 'email@gmal.com', phone: "+441234567890", id: 12 },
    ]

    const BookingData = [
        {
            id: 0,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 1,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 2,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
        {
            id: 3,
            imgurl: 'https://media.istockphoto.com/photos/new-homes-on-a-quiet-street-in-raleigh-nc-picture-id1319269543?b=1&k=20&m=1319269543&s=170667a&w=0&h=9Nv2yeDkHR01ADDhxcY4A1PZx9veOOwPRVnNXT6Jk3c=',
            studentname: 'Name Surname',
        },
    ]
    const [checked, setchecked] = useState(false);
    const [bookingdetails, setBookingdetails] = useState(true);
    const [activeItem, setActiveItem] = useState(0);
    // const [bookingid, setbookingid] = useState();



    return (
        <View style={{ backgroundColor: Colors.background, flex: 1 }}>
            <Check text={'Select all'} checked={checked} onChange={() => { setchecked(!checked) }} />
            <ScrollView>
                {
                    ApiData.map((item, index) => {
                        return (
                            <View key={index} style={bookingdetails ? styles.card : [styles.card, { height: 'auto' }]}>
                                <Row style={{ left: 5 }}>
                                    <LatoText fontSize={12}>Name Surname</LatoText>
                                    <LatoText fontSize={12}>{item.email}</LatoText>
                                    <LatoText fontSize={12}>{item.phone}</LatoText>
                                </Row>
                                {
                                    checked ?
                                        <Icon.Community name='checkbox-marked' size={13} style={{ right: 9, bottom: 5 }} /> :
                                        <Icon.Community name='checkbox-blank-outline' size={13} style={{ right: 9, bottom: 5 }} />
                                }
                                <Row style={{ bottom: 20, left: 5 }}>
                                    <LatoText fontSize={12}>{item.name}</LatoText>
                                    <Button
                                        title="See bookings"
                                        type='clear'
                                        onPress={() => {
                                            setBookingdetails(!bookingdetails)
                                            setActiveItem(index)
                                        }}
                                        icon={bookingdetails ? <Icon.Ionicon name='caret-up-outline' size={13} color={Colors.text} style={{ right: 5 }} /> : <Icon.Ionicon name='caret-down-outline' size={13} color={Colors.text} style={{ right: 5 }} />}
                                        titleStyle={{ color: Colors.text, fontSize: 12, fontFamily: 'Lato' }}
                                        buttonStyle={{ backgroundColor: "transparent", }}
                                        TouchableComponent={TouchableOpacity}
                                        iconPosition="right"
                                    />
                                    <LatoText fontSize={12} color={'transparent'}>email@gm</LatoText>
                                </Row>
                                {
                                    !bookingdetails ? BookingData.map((Bitem, index) => {
                                        if (item.id === activeItem) {
                                            return (
                                                <View style={styles.bookingdetails} key={index}>
                                                    <Image source={{ uri: Bitem.imgurl }} style={{ width: (wp('30%')) }} />
                                                    <View style={{ flexDirection: 'column', left: 10, justifyContent: 'space-around' }} >
                                                        <LatoText style={{ fontFamily: 'Lato-Bold' }}>Property Name   <Icon.FontAwesome name="star" size={12} color='#F2BF07' /><Icon.FontAwesome name="star" size={12} color='#F2BF07' /><Icon.FontAwesome name="star" size={12} color='#F2BF07' /><Icon.FontAwesome name="star" size={12} color='#F2BF07' /><Icon.FontAwesome name="star" size={12} color='#F2BF07' /></LatoText>
                                                        <LatoText>Student: {Bitem.studentname}</LatoText>
                                                        <Pressable><LatoText style={{ fontFamily: 'Lato-Bold', color: '#0965E0', textDecorationLine: 'underline' }}>View Booking Details</LatoText></Pressable>
                                                    </View>
                                                    <View style={{ flexDirection: 'column', justifyContent: 'space-around', left: 3 }} >
                                                        <Icon.Material name="edit" size={15} color={'#0965E0'} />
                                                        <LatoText></LatoText>
                                                        <Icon.Material name="delete-outline" size={15} color={'#0965E0'} />
                                                    </View>
                                                </View>
                                            )
                                        }
                                    }) : null


                                }
                            </View>

                        )
                    })
                }

            </ScrollView>

            <View>

            </View>



            {/* pagination Work */}
            <View style={{ alignItems: 'flex-end' }}>
                <LatoText style={{ right: 50 }}>{` <<< Pagination 1 to 50 >>>`}</LatoText>
            </View>
            {/* pagination Work */}


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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: Colors.background,
    },
    main__view: {
        marginHorizontal: '5%',
        top: hp('1%'),
        height: 550
    },
    card: { height: (hp('8%')), width: (wp('90%')), backgroundColor: '#F7FAFC', borderColor: Colors.primaryColor, borderWidth: 1, borderRadius: 6, padding: '3%', marginTop: 5 },
    bookingdetails: { backgroundColor: 'white', height: (hp('10%')), width: '100%', flexDirection: 'row', padding: '2%', justifyContent: 'space-between', bottom: 15, marginTop: 5 },
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
        width: 90,
        height: 40,
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