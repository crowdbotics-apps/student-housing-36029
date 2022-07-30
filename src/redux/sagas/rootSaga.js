import { all } from 'redux-saga/effects';
import { loginSaga, logoutSaga, resendOtpSaga, signupSaga, verifyOtpSaga } from './auth/AuthSagas';
import { changeEmailSaga } from './auth/changeEmailSaga';
import { changePassSaga } from './auth/changePassSaga';
import { changePhoneSaga } from './auth/changePhoneSaga';
import { forgetPassSaga } from './auth/forgetPassSaga';
import { fetchReviewsSaga } from './profile/fetchReviewsSaga';
import { fetchProfileSaga } from './profile/fetchSaga';
import { insertProfileSaga } from './profile/insertSaga';
import { updateProfileSaga } from './profile/updateSaga';

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
        fetchReviewsSaga()
    ])
}