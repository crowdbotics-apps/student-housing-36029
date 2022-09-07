import { createAction } from "@reduxjs/toolkit";
import { call, put, select, takeLatest } from "redux-saga/effects";
import RNToast from "../../../components/RNToast";
import { getSimplifiedError } from "../../../services/ApiErrorhandler";
import ApiService from "../../../services/ApiService";
import { startLoading, setReviews, setError, setReviewResponse, setShouldRateOwner } from "../../reducers/ProfileReducer";

export const fetchReviews = createAction("profile/fetchReviews");

function* fetchData() {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getReviews);
    console.log('fetchReviews res.data: ', res.data)
    if(res.data.results){
      yield put(setReviews(res.data.results));
      yield put(setReviewResponse(res.data));

    }
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}
export const fetchMoreReviews = createAction("profile/fetchMoreReviews");

function* fetchMoreData({ payload }) {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getMoreReviews, payload);
    console.log('fetchMoreReviews res.data: ', res.data)
    if(res.data.results){
      let reviews = yield select(state => state.Profile.reviews);
      yield put(setReviews(reviews.concat(res.data.results)));
      yield put(setReviewResponse(res.data));
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}
export const postReview = createAction("profile/postReview");

function* insertData({ payload }) {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.postReview, payload);
    console.log('postReview res.data: ', res.data)
    if(res.data.message === 'Succesfully User rated.'){
      RNToast.showShort('Successfully reviewed');
      setShouldRateOwner(false)
    } else {
      alert(res.data.message);
      yield put(setShouldRateOwner(false))
    }
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
    setShouldRateOwner(false)
  }
}

export function* fetchReviewsSaga() {
  yield takeLatest(fetchReviews, fetchData);
  yield takeLatest(fetchMoreReviews, fetchMoreData);
  yield takeLatest(postReview, insertData);
}

export const fetchUserRating = createAction("profile/fetchUserRating");

function* fetchRatingData({ payload: id }) {
  yield put(startLoading(true))
  try {
    let res = yield call(ApiService.getUserOwnRating, id);
    console.log('fetchUserRating res.data: ', res.data)
    if(res.data.results)
        yield put(setReviews(res.data.results));
  } catch (error) {
    console.log({ error });
    yield put(setError(getSimplifiedError(error)))
  }
}

export function* fetchUserRatingSaga() {
  yield takeLatest(fetchUserRating, fetchRatingData);
}
