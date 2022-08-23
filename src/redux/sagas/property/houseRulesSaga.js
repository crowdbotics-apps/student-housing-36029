import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setHouseRules, setError, editHouseRules } from "../../reducers/PropertyReducer";

export const addHouseRule = createAction("property/addHouseRule");

function* insertData({ payload }) {
  console.log('payload: ', payload);
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.addHouseRule, payload);
    console.log('addHouseRule res.data: ', res.data)
    if(res.data) 
        yield put(setHouseRules(res.data));
    else if(res.data.error) {
      alert(getSimplifiedError(res.data.error));
      yield put(setError(getSimplifiedError(res.data.error)))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error));
  }
}

export const updateHouseRule = createAction("property/updateHouseRule");

function* updateData({ payload }) {
  console.log('payload: ', payload);
  const { id, rule } = payload; 
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.updateHouseRule, id, rule);
    console.log('updateHouseRule res.data: ', res.data)
    if(res.data && res.data === '')
        yield put(editHouseRules(payload));
    else if(res.data.error) {
      alert(getSimplifiedError(res.data.error));
      yield put(setError(getSimplifiedError(res.data.error)))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error));
  }
}

export const deleteHouseRule = createAction("property/deleteHouseRule");

function* deleteData({ payload }) {
  console.log('payload: ', payload);
  const { id } = payload; 
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.deleteHouseRule, id);
    console.log('deleteHouseRule res.data: ', res.data)
    if(res.data && res.data === '')
        yield put(editHouseRules(payload));
    else if(res.data.error) {
      alert(getSimplifiedError(res.data.error));
      yield put(setError(getSimplifiedError(res.data.error)))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error));
  }
}

export function* houseRulesSaga() {
  yield takeLatest(addHouseRule, insertData);
  yield takeLatest(updateHouseRule, updateData);
  yield takeLatest(deleteHouseRule, deleteData);

}
