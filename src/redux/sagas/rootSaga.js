import { all } from 'redux-saga/effects';
import { loginSaga, logoutSaga, resendOtpSaga, signupSaga, verifyOtpSaga } from './auth/AuthSagas';
import { changeEmailSaga } from './auth/changeEmailSaga';
import { changePassSaga } from './auth/changePassSaga';
import { changePhoneSaga } from './auth/changePhoneSaga';
import { forgetPassSaga } from './auth/forgetPassSaga';
import { deleteMediaSaga } from './owner/deleteMediaSaga';
import { fetchOwnerPropertySaga } from './owner/fetchSaga';
import { houseRulesSaga } from './owner/houseRulesSaga';
import { postPropertySaga } from './owner/postPropertySaga';
import { updatePropertySaga } from './owner/updateSaga';
import { fetchReviewsSaga } from './profile/fetchReviewsSaga';
import { fetchProfileSaga } from './profile/fetchSaga';
import { insertProfileSaga } from './profile/insertSaga';
import { updateProfileSaga } from './profile/updateSaga';
import { bookPropertySaga } from './property/bookPropertySaga';
import { fetchConfigSaga, fetchPropertySaga, fetchWishlistSaga, searchPropertySaga } from './property/fetchSaga';
import { updateWishlistSaga } from './property/updateSaga';

export default function* rootSaga() {
    yield all([
        signupSaga(),
        verifyOtpSaga(),
        resendOtpSaga(),
        loginSaga(),
        logoutSaga(),
        fetchProfileSaga(),
        insertProfileSaga(),
        updateProfileSaga(),
        forgetPassSaga(),
        changePassSaga(),
        changeEmailSaga(),
        changePhoneSaga(),
        fetchReviewsSaga(),
        fetchPropertySaga(),
        fetchWishlistSaga(),
        updateWishlistSaga(),
        bookPropertySaga(),
        fetchConfigSaga(),
        searchPropertySaga(),
        fetchOwnerPropertySaga(),
        houseRulesSaga(),
        postPropertySaga(),
        updatePropertySaga(),
        deleteMediaSaga()
    ])
}