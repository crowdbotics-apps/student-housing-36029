import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import queryString from 'query-string';
import { setUsers,startLoading,setError } from "../../reducers/UsersReducer";


export const fetchUsers = createAction("users/fetchUsers");

function* fetchData({ payload }) {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getAllUsers, payload);
    console.log('fetchUsers res.data: ', res.data)
    if(res.data)
        yield put(setUsers(res.data));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)));
  }
}

export function* fetchUsersSaga() {
  yield takeLatest(fetchUsers, fetchData);
}
