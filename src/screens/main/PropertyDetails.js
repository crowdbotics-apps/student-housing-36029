import moment from "moment"
import { usePubNub } from "pubnub-react"
import React, { useEffect, useState } from "react"
import { useRef } from "react"
import { Pressable, ScrollView, StyleSheet, View } from "react-native"
import { Button } from "react-native-elements"
import { useDispatch } from "react-redux"
import BookingSuccessModal from "../../components/BookingSuccessModal"
import ChatBox from "../../components/ChatBox"
import Footer from "../../components/Footer"
import GoogleMaps from "../../components/GoogleMaps"
import HeartButton from "../../components/HeartButton"
import ImageCarousel from "../../components/ImageCarousel"
import InfoBox from "../../components/InfoBox"
import LatoText from "../../components/LatoText"
import NavigationHeader from "../../components/NavigationHeader"
import PrimaryButton from "../../components/PrimaryButton"
import Row from "../../components/Row"
import StyledDatepicker from "../../components/StyledDatepicker"
import { TextButton } from "../../components/TextButton"
import Colors from "../../constants/Colors"
import { hp, rf, wp } from "../../constants/Constants"
import { FACILITY_ICONS } from "../../constants/Data"
import Icon from "../../constants/Icon"
import { goBack, navigate } from "../../navigations/NavigationService"
import { useUser } from "../../redux/reducers/AuthReducer"
import {
  setChannelListUpdated,
  setChatDetails,
  useChannelList,
  useChannelListUpdated
} from "../../redux/reducers/ChatReducer"
import {
  useIsLoading,
  usePropertyDetails
} from "../../redux/reducers/PropertyReducer"
import { createNewChat } from "../../redux/sagas/chat/insertSaga"
import { bookProperty } from "../../redux/sagas/property/bookPropertySaga"
import { fetchPropertyDetails } from "../../redux/sagas/property/fetchSaga"
import { updateWishlist } from "../../redux/sagas/property/updateSaga"
import { GeocodeAddress } from "../../services/Geocoding"
import { getChannelName, setMetaData } from "../../services/PubNubChat"
import { checkIsBooked } from "../../utilities/checkIsBooked"
import { useDispatchEffect } from "../../utilities/hooks"
import { totalPrice } from "../../utilities/utils"

export default function PropertyDetails() {
  const dispatch = useDispatch()
  const details = usePropertyDetails()
  const isLoading = useIsLoading()
  const channelListUpdated = useChannelListUpdated()
  const channelListData = useChannelList()
  const channelStore = channelListData.results;
  const authUser = useUser()
  const pubnub = usePubNub()

  const [showSuccess, setShowSuccess] = useState(false)
  const [showChatbox, setShowChatbox] = useState(false)

  const {
    id,
    title,
    media = [],
    rating,
    description,
    city,
    country,
    latitude,
    longitude,
    per_night_price,
    time_type,
    minimum_renting_duration,
    room_facilities,
    property_amenities,
    room_accessibilities,
    housing_rules,
    type,
    is_wish_listed,
    bookings,
    owner
  } = details

  const channel = channelStore?.find(c => {
    if (c.participants?.length===2)
      return c.participants?.findIndex(p => p.user.id === owner?.id) !== -1
    return false
  })

  useDispatchEffect(fetchPropertyDetails, id, id)

  useEffect(() => {
      if (channel) {
        dispatch(
          setChatDetails({
            channel: getChannelName(channel),
            ...channel.participants.find(p => p.user.id !== authUser.id)
          })
        )
        setMetaData(pubnub, getChannelName(channel));
      }
  }, [channel]);

  useEffect(() => {
    if (channelListUpdated) {
      const channel = channelStore.find(c => {
        if (c.participants?.length===2)
          return c.participants?.findIndex(p => p.user.id === owner?.id) !== -1
        return false
      })
      if (channel) {
        dispatch(
          setChatDetails({
            channel: getChannelName(channel),
            ...participants.find(p => p.user.id !== authUser.id)
          })
        )
        setMetaData(pubnub, getChannelName(channel));
      }
      dispatch(setChannelListUpdated(false))
    }
  }, [channelListUpdated]);

  const mediaFiles = media.map(file => file.property_media.split("?")[0])

  const [selectedDays, setSelectedDays] = useState({
    from: new Date(),
    to: new Date(
      new Date().getTime() +
        24 * (minimum_renting_duration || 3) * 60 * 60 * 1000
    )
  })
  const startDate = moment(selectedDays.from)
  const endDate = moment(selectedDays.to)
  const totalDays = Math.ceil(endDate.diff(startDate, "days", true))

  const handleFromChange = (from = new Date()) => {
    const startDate = moment(from)
    const endDate = moment(selectedDays.to)
    const totalDays = Math.ceil(endDate.diff(startDate, "days", true))
    if (totalDays <= 0) {
      setSelectedDays(prev => ({
        ...prev,
        from,
        to: new Date(
          from.getTime() + 24 * (minimum_renting_duration || 3) * 60 * 60 * 1000
        )
      }))
    } else {
      setSelectedDays(prev => ({ ...prev, from }))
    }
  }

  const handleToChange = to => {
    setSelectedDays(prev => ({ ...prev, to }))
  }

  const onFavourite = (id, val) => {
    console.log(id, val)
    dispatch(
      updateWishlist({
        property_id: id,
        is_wish_listed: val
      })
    )
  }

  const [coords, setCoords] = useState({
    latitude: latitude || 0,
    longitude: longitude || 0
  })

  useEffect(() => {
    if (coords.latitude === null) {
      GeocodeAddress(city, ({ lat, lng }) =>
        setCoords({ latitude: lat, longitude: lng })
      )
    }
  }, [])

  const [propertyBooked, setPropertyBooked] = useState(false)

  useEffect(() => {
    if (bookings) {
      const existingBookings = bookings.map(booking => {
        return {
          from: booking.book_from,
          to: booking.book_to
        }
      })
      const returnVal = checkIsBooked(existingBookings, selectedDays)
      setPropertyBooked(returnVal)
    }
  }, [selectedDays, bookings])

  const handleBookProperty = () => {
    dispatch(
      bookProperty({
        property_id: id,
        book_from: moment(selectedDays.from).format("MM-DD-YYYY"),
        book_to: moment(selectedDays.to).format("MM-DD-YYYY")
      })
    )
  }

  const scrollRef = useRef()

  return (
    <View style={styles.container}>
      <NavigationHeader />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{
          width: wp("100%"),
          alignItems: "center",
          justifyContent: "flex-start",
          paddingBottom: 0
        }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={(contentWidth, contentHeight) => {
          showChatbox &&
            scrollRef.current &&
            scrollRef.current.scrollToEnd({
              animating: true
            })
        }}
      >
        <Button
          title={"Property Details"}
          type="clear"
          onPress={() => goBack()}
          icon={
            <Icon.Ionicon
              name="arrow-back"
              size={16}
              color={Colors.primaryColor}
              style={{ marginRight: 5, marginLeft: -5 }}
            />
          }
          titleStyle={{
            color: Colors.text,
            fontSize: rf(1.8),
            fontFamily: "Lato-Bold"
          }}
          buttonStyle={{ backgroundColor: "transparent" }}
          containerStyle={{
            marginVertical: hp("1%"),
            alignSelf: "flex-start",
            marginHorizontal: wp("5%")
          }}
          TouchableComponent={Pressable}
        />

        <Row
          style={{ justifyContent: "center", width: "100%", marginBottom: 5 }}
        >
          <LatoText black fontSize={rf(2.2)}>
            {title}
          </LatoText>
          <HeartButton
            onToggle={val => onFavourite(id, val)}
            isSelected={is_wish_listed}
            size={rf(2.2)}
            containerStyle={{
              position: "absolute",
              right: wp("5%"),
              width: rf(2.4)
            }}
          />
        </Row>

        <InfoBox style={{ width: wp("90%"), marginBottom: hp("1%") }}>
          <Row style={{ justifyContent: "center", width: "100%" }}>
            <Icon.Material
              name="check-circle-outline"
              color={Colors.primaryColor}
              size={20}
              style={{ marginRight: 5 }}
            />
            <LatoText fontSize={rf(1.5)}>
              Book property for a month and receive 20% off.
            </LatoText>
            <TextButton
              title={"Book Now"}
              titleStyle={{
                color: "#000",
                fontSize: rf(1.5),
                fontFamily: "Lato-Bold",
                height: 20
              }}
              containerStyle={{ marginLeft: 5 }}
            />
          </Row>
        </InfoBox>
        <ImageCarousel images={mediaFiles} />

        <View style={styles.details}>
          <LatoText bold style={styles.heading}>{`Booking Details:`}</LatoText>
          <Row style={{ alignItems: "center" }}>
            <View style={{ width: wp("42%") }}>
              <StyledDatepicker
                label={"From"}
                value={selectedDays.from}
                onDateChange={handleFromChange}
                datepickerStyle={{ width: wp("40%") - 30 }}
                containerStyle={{ justifyContent: "flex-start" }}
              />
            </View>
            <View style={{ width: wp("42%") }}>
              <StyledDatepicker
                label={"To"}
                value={selectedDays.to}
                onDateChange={handleToChange}
                datepickerStyle={{ width: wp("40%") - 30 }}
                containerStyle={{ justifyContent: "flex-start" }}
              />
            </View>
          </Row>
          <Row style={{ alignItems: "center" }}>
            <View style={{ width: wp("42%") }}>
              <Detail
                label={"Price Per Night:"}
                value={`$${totalPrice(
                  time_type,
                  per_night_price,
                  1
                )} per night`}
              />
              <Detail
                label={"Check-In Date:"}
                value={`${moment(new Date(selectedDays.from)).format(
                  "DD/MM/YYYY"
                )} (2 PM)`}
              />
            </View>
            <View style={{ width: wp("42%") }}>
              <Detail
                label={"Total Per Chosen Period:"}
                value={`$${totalPrice(time_type, per_night_price, totalDays)}`}
              />
              <Detail
                label={"Check-Out Date:"}
                value={`${moment(new Date(selectedDays.to)).format(
                  "DD/MM/YYYY"
                )} (Until 11 AM)`}
              />
            </View>
          </Row>

          {propertyBooked && (
            <LatoText
              color="#FF0000"
              fontSize={rf(1.6)}
              style={{ alignSelf: "center", marginTop: 24 }}
            >
              Currently unavailable
            </LatoText>
          )}
          <PrimaryButton
            title={"Book Property"}
            onPress={handleBookProperty}
            loading={isLoading}
            titleStyle={{ fontSize: rf(1.8) }}
            buttonStyle={{ width: 300, height: hp("5%") }}
            containerStyle={{ marginTop: 24, alignSelf: "center" }}
            disabled={propertyBooked}
          />
        </View>

        <View style={{ width: wp("90%"), marginTop: 24 }}>
          <LatoText bold style={styles.heading}>{`Location:`}</LatoText>
          <LatoText style={styles.text}>{`${city}, ${country}`}</LatoText>
          <GoogleMaps
            center={coords || { latitude: 0, longitude: 0 }}
            markers={[
              {
                key: city,
                id: city,
                markerCoords: coords || { latitude: 0, longitude: 0 },
                title: title,
                description: `${city}, ${country}`
              }
            ]}
            mapContainer={{ height: 185, marginTop: 16 }}
          />
        </View>

        <View style={{ width: wp("90%"), marginTop: 24 }}>
          <LatoText bold style={styles.heading}>{`Facilities:`}</LatoText>
          {room_facilities?.length !== 0 && (
            <Row
              style={{
                width: wp("90%"),
                flexWrap: "wrap",
                justifyContent: "flex-start"
              }}
            >
              {room_facilities?.map(({ name }) => (
                <Facility name={name} key={name} />
              ))}
            </Row>
          )}
        </View>

        <View style={{ width: wp("90%"), marginTop: 24 }}>
          <LatoText bold style={styles.heading}>{`Amenities:`}</LatoText>
          {property_amenities?.length !== 0 && (
            <Row
              style={{
                width: wp("90%"),
                flexWrap: "wrap",
                justifyContent: "flex-start"
              }}
            >
              {property_amenities?.map(({ name }) => (
                <Facility name={name} key={name} />
              ))}
            </Row>
          )}
        </View>

        <View style={{ width: wp("90%"), marginTop: 24 }}>
          <LatoText bold style={styles.heading}>{`Accessibilities:`}</LatoText>
          {room_accessibilities?.length !== 0 && (
            <View style={{ width: wp("90%"), justifyContent: "flex-start" }}>
              {room_accessibilities?.map(({ name }) => (
                <Accessibility name={name} key={name} />
              ))}
            </View>
          )}
        </View>

        <View style={{ width: wp("90%"), marginTop: 24 }}>
          <LatoText bold style={styles.heading}>{`House Rules:`}</LatoText>
          {housing_rules?.map(({ id, name }) => (
            <Check text={name} checked={false} key={id} />
          ))}
        </View>

        <Row
          style={{
            width: wp("90%"),
            marginTop: 24,
            justifyContent: "flex-start"
          }}
        >
          <LatoText bold fontSize={rf(1.8)}>{`Property Type:`}</LatoText>
          <LatoText style={{ marginLeft: 10 }}>{type}</LatoText>
        </Row>

        <Row
          style={{
            width: wp("85%"),
            height: 50,
            marginVertical: 30,
            alignItems: "center"
          }}
        >
          <TextButton
            title="Property Owner’s Profile"
            titleStyle={{ color: Colors.primaryColor }}
            containerStyle={{ height: 40 }}
            onPress={() => {
              navigate("OwnerProfilePreview", { id: owner?.id })
            }}
            disabled={!owner}
          />
          <Button
            title={"Contact Property Owner"}
            type="solid"
            onPress={() => {
              setShowChatbox(true);
              if(!channel)
                dispatch(createNewChat(owner?.id));
            }}
            titleStyle={{
              color: Colors.white,
              fontSize: rf(1.6),
              fontFamily: "Lato-Bold"
            }}
            buttonStyle={{
              backgroundColor: Colors.primaryColor,
              width: wp("40%"),
              height: 35,
              borderRadius: 6,
              padding: 0
            }}
            containerStyle={{
              width: wp("40%"),
              height: 35,
              borderRadius: 6,
              marginBottom: 20
            }}
            disabled={!owner}
          />
        </Row>

        <ChatBox
          isVisible={showChatbox}
          closeChatbox={() => setShowChatbox(false)}
          onLoadMore={() => navigate("Chat")}
        />

        <View style={{ height: 60 }} />
      </ScrollView>

      <BookingSuccessModal
        isModalVisible={showSuccess}
        closeModal={() => {
          setShowSuccess(false)
        }}
        data={details}
      />
      <Footer />
    </View>
  )
}

const Detail = ({ label, value }) => {
  return (
    <View style={{ width: "100%", paddingLeft: 10, marginTop: 14 }}>
      <LatoText bold style={styles.label}>
        {label}
      </LatoText>
      <LatoText style={styles.text}>{value}</LatoText>
    </View>
  )
}
const Facility = ({ name }) => {
  return (
    <Row style={{ justifyContent: "flex-start", width: "33%", height: 30 }}>
      {FACILITY_ICONS[name]}
      <LatoText style={{ marginLeft: 10 }}>{name}</LatoText>
    </Row>
  )
}
const Accessibility = ({ name }) => {
  return (
    <Row style={{ justifyContent: "flex-start", width: "100%", height: 30 }}>
      {FACILITY_ICONS[name]}
      <LatoText style={{ marginLeft: 10 }}>{name}</LatoText>
    </Row>
  )
}
const Check = ({ text, checked }) => {
  return (
    <Row style={{ justifyContent: "flex-start", width: "100%", height: 30 }}>
      {checked ? (
        <Icon.Community name="checkbox-marked" size={20} color={Colors.text} />
      ) : (
        <Icon.Community
          name="checkbox-blank-outline"
          size={20}
          color={Colors.text}
        />
      )}
      <LatoText style={{ marginLeft: 10 }}>{text}</LatoText>
    </Row>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.background
  },
  details: {
    width: wp("90%"),
    padding: 12,
    borderWidth: 2,
    borderColor: Colors.primaryColor,
    borderRadius: 12,
    marginTop: hp("2%"),
    backgroundColor: "#F7FAFC"
  },
  heading: {
    fontSize: rf(1.8),
    marginBottom: 15
  },
  label: {
    fontSize: rf(1.6),
    textAlign: "left",
    lineHeight: 26
  },
  value: {
    fontSize: rf(1.6),
    textAlign: "left"
  }
})
