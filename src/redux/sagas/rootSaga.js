import { all } from 'redux-saga/effects';
import { loginSaga, logoutSaga, resendOtpSaga, signupSaga, verifyOtpSaga } from './auth/AuthSagas';
import { changePassSaga } from './auth/changePassSaga';
import { forgetPassSaga } from './auth/forgetPassSaga';
import { fetchProfileSaga } from './profile/fetchSaga';
import { updateProfileSaga } from './profile/updateSaga';

export default function* rootSaga() {
    yield all([
        signupSaga(),
        verifyOtpSaga(),
        resendOtpSaga(),
        loginSaga(),
        logoutSaga(),
        fetchProfileSaga(),
        updateProfileSaga(),
        forgetPassSaga(),
        changePassSaga(),
    ])
}