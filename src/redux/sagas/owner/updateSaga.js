import { createAction } from "@reduxjs/toolkit";
import { call, put, select, takeLatest } from "redux-saga/effects";
import RNToast from "../../../components/RNToast";
import { getSimplifiedError, getStringError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { toQueryString } from "../../../utilities/utils";
import { startLoading, setError, setPropertyDetails, updatePropertyList } from "../../reducers/OwnerReducer";

export const updateProperty = createAction("owner/updateProperty");

function* updateData({ payload: id }) {
  yield put(startLoading(true))
  try {
    let formValues = yield select(state => state.Owner.propertyForm)
    let houseRules = yield select(state => state.Owner.houseRules)
    const payload = createPropertyPayload(formValues, houseRules); 
    console.log('payload: ', payload)
    let res = yield call(ApiService.updateProperty, id, payload);
    console.log('updateProperty res.data: ', res.data);
    if(res.data.property) {
      yield put(updatePropertyList({ id: id, property: res.data.property }));
      yield put(setPropertyDetails(res.data.property));
      RNToast.showShort('Successfully updated');
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

export function* updatePropertySaga() {
  yield takeLatest(updateProperty, updateData);
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
  room_facilities: toQueryString(values.facilities),
  room_accessibilities: toQueryString(values.accessiblities),
  property_amenities: toQueryString(values.amenities),
  time_type: values.time_type,
  housing_rules: toQueryString(rules.map(rule => rule.id))
})

