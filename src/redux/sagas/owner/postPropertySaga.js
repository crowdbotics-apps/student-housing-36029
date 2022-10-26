import { createAction } from "@reduxjs/toolkit";
import { call, put, select, takeLatest } from "redux-saga/effects";
import RNToast from "../../../components/RNToast";
import { getSimplifiedError, getStringError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setError, addProperty, setPropertyDetails } from "../../reducers/OwnerReducer";

export const postProperty = createAction("owner/postProperty");

function* insertData() {
  yield put(startLoading(true))
  try {
    let formValues = yield select(state => state.Owner.propertyForm)
    let houseRules = yield select(state => state.Owner.houseRules)
    const payload = createPropertyPayload(formValues, houseRules); 
    console.log('payload: ', payload)
    let res = yield call(ApiService.postProperty, payload);
    console.log('postProperty res.data: ', res.data);
    if(res.data.property) {
      yield put(addProperty(res.data.property));
      yield put(setPropertyDetails(res.data.property));
      RNToast.showShort('Successfully posted');
    }
    if(res.data.error) {
        alert(getStringError(res.data.error));
        yield put(setError(res.data.error));
    }
    else {
    }    
  } catch (error) {
    console.log({ error });
    yield put(setError(error));
  }
}

export function* postPropertySaga() {
  yield takeLatest(postProperty, insertData);
}

const createPropertyPayload = (values, rules) => ({
  title: values.title,
  description: values.description,
  minimum_renting_duration: values.minimum_renting_duration,
  per_night_price: values.per_night_price,
  type: values.type,
  bath_room: values.bath_room,
  status: values.status,
  country: values.country,
  city: values.city,
  latitude: values.latitude,
  longitude: values.longitude,
  available_from: values.available_from,
  available_to: values.available_to,
  room_facilities: values.facilities.length>0 ? values.facilities.join() : "0",
  room_accessibilities: values.accessiblities.length>0 ? values.accessiblities.join() : "0",
  property_amenities: values.amenities.length>0 ? values.amenities.join() : "0",
  time_type: values.time_type,
  housing_rules: rules.length>0 ? rules.map(rule => rule.id).join() : "0"
})