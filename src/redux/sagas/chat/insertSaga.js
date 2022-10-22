import { createAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setError, updateChannelList } from "../../reducers/ChatReducer";

export const createNewChat = createAction("chat/createNewChat");

function* insertData({ payload: id  }) {
  console.log('payload: ', id);
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.createNewChat, { u_id: id });
    console.log('createNewChat res.data: ', res.data)
    if(res.data?.channel_name)
        yield put(updateChannelList(res.data));
    else if(res.data.error) {
      alert(getSimplifiedError(res.data.error));
      yield put(setError(getSimplifiedError(res.data.error)))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(error));

  }
}

export function* createNewChatSaga() {
  yield takeLatest(createNewChat, insertData);
}
