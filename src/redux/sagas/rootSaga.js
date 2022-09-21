import { all } from 'redux-saga/effects';
import { deactivateAccountSaga, loginSaga, logoutSaga, resendOtpSaga, signupSaga, verifyOtpSaga } from './auth/AuthSagas';
import { changeEmailSaga } from './auth/changeEmailSaga';
import { changePassSaga } from './auth/changePassSaga';
import { changePhoneSaga } from './auth/changePhoneSaga';
import { forgetPassSaga } from './auth/forgetPassSaga';
import { fetchChannelListSaga } from './chat/fetchSaga';
import { createNewChatSaga } from './chat/insertSaga';
import { deleteMediaSaga } from './owner/deleteMediaSaga';
import { fetchPropertyRatingSaga } from './owner/fetchReviewsSaga';
import { fetchOwnerPropertySaga } from './owner/fetchSaga';
import { houseRulesSaga } from './owner/houseRulesSaga';
import { postPropertySaga } from './owner/postPropertySaga';
import { updatePropertySaga } from './owner/updateSaga';
import { fetchBookingSaga } from './profile/fetchBookingSaga';
import { fetchOwnerProfileSaga } from './profile/fetchOwnerProfileSaga';
import { fetchReviewsSaga, fetchUserRatingSaga } from './profile/fetchReviewsSaga';
import { fetchProfileSaga } from './profile/fetchSaga';
import { insertProfileSaga } from './profile/insertSaga';
import { paymentMethodSaga } from './profile/paymentMethodSaga';
import { updateProfileSaga } from './profile/updateSaga';
import { bookPropertySaga } from './property/bookPropertySaga';
import { fetchConfigSaga, fetchPropertyDetailsSaga, fetchPropertySaga, fetchWishlistSaga, searchPropertySaga } from './property/fetchSaga';
import { updateWishlistSaga } from './property/updateSaga';
import { fetchUsersSaga } from './users/fetchSaga';

export default function* rootSaga() {
    yield all([
        signupSaga(),
        verifyOtpSaga(),
        resendOtpSaga(),
        loginSaga(),
        logoutSaga(),
        fetchProfileSaga(),
        fetchOwnerProfileSaga(),
        insertProfileSaga(),
        updateProfileSaga(),
        forgetPassSaga(),
        changePassSaga(),
        changeEmailSaga(),
        changePhoneSaga(),
        deactivateAccountSaga(),
        fetchReviewsSaga(),
        fetchPropertySaga(),
        fetchWishlistSaga(),
        updateWishlistSaga(),
        bookPropertySaga(),
        fetchPropertyDetailsSaga(),
        fetchConfigSaga(),
        searchPropertySaga(),
        fetchOwnerPropertySaga(),
        houseRulesSaga(),
        postPropertySaga(),
        updatePropertySaga(),
        deleteMediaSaga(),
        fetchUserRatingSaga(),
        fetchPropertyRatingSaga(),
        paymentMethodSaga(),
        fetchBookingSaga(),
        fetchChannelListSaga(),
        createNewChatSaga(),
        fetchUsersSaga()
    ])
}