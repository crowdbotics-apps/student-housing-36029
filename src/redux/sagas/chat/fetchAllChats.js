import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { setAllChats,startLoading,setError } from "../../reducers/AllChatsreducer";


export const fetchAllChats = createAction("chat/fetchAllChats");

function* fetchData({ payload }) {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getAllChats, payload);
    console.log('fetchAllChats res.data: ', res.data)
    if(res.data)
        yield put(setAllChats(res.data));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)));
  }
}

export function* fetchAllChatsSaga() {
  yield takeLatest(fetchAllChats, fetchData);
}


