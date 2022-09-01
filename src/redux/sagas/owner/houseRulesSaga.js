import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setHouseRules, setError, editHouseRules } from "../../reducers/OwnerReducer";

export const addHouseRule = createAction("owner/addHouseRule");

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

export const updateHouseRule = createAction("owner/updateHouseRule");

function* updateData({ payload }) {
  console.log('payload: ', payload);
  const { id, rule } = payload; 
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.updateHouseRule, id, rule);
    console.log('updateHouseRule res.data: ', res.data)
    if(res.data && res.data.id)
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

export const deleteHouseRule = createAction("owner/deleteHouseRule");

function* deleteData({ payload }) {
  console.log('payload: ', payload);
  const { id } = payload; 
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.deleteHouseRule, id);
    console.log('deleteHouseRule res.data: ', res.data)
    if(res.data.detail) {
      alert(getSimplifiedError(res.data.detail));
      yield put(setError(getSimplifiedError(res.data.detail)))
    } else {
      yield put(editHouseRules(payload));
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
