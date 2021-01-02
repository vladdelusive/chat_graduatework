import { call, put, takeEvery } from 'redux-saga/effects';
import * as auth from './types';
import {
    saveLogInAuth,
    failLogInAuth,
    saveUpdateProfile,
} from './actions';
import { api } from 'services';
import { push } from 'connected-react-router';
import { routes } from 'routes';
import { saveChats } from 'store/chats/actions';

function* fetchLogInByGoogleSaga() {
    try {
        const response = yield call(api.auth.googleLogin);
        if (!response) return;
        const { chats, profile } = response;
        yield put(saveLogInAuth(profile))
        yield put(saveChats(chats))

        yield put(push(routes.profile.link()))
    } catch (error) {
        console.log(error);
        yield put(failLogInAuth());
    }
}

function* registerByMailAndPasswordSaga(action) {
    try {
        const { payload } = action;
        const response = yield call(api.auth.registerByMailAndPassword, payload);
        if (!response) return;

        const { chats } = response;
        yield put(saveLogInAuth(response))
        yield put(saveChats(chats))

        yield put(push(routes.profile.link()))
    } catch (error) {
        console.log(error);
        yield put(failLogInAuth());
    }
}

function* logInByMailAndPasswordSaga(action) {
    try {
        const { payload } = action;

        const response = yield call(api.auth.logInByMailAndPassword, payload);
        if (!response) return;
        debugger
        const { chats, profile } = response;
        yield put(saveLogInAuth(profile))
        yield put(saveChats(chats))

        yield put(push(routes.profile.link()))
    } catch (error) {
        console.log(error);
        yield put(failLogInAuth());
    }
}

function* setUpdateProfileAndChatsSaga(action) {
    try {
        const { payload } = action;
        const response = yield call(api.auth.preparedUpdatedProfileData, payload);
        const { chats, profile } = response;
        yield put(saveUpdateProfile(profile))
        yield put(saveChats(chats))
    } catch (error) {
        console.log(error);
    }
}

function* clearAuthSaga() {
    // yield removeProfileToLocalStorage();
}

export function* authSaga() {
    yield takeEvery(auth.FETCH_LOGIN_BY_GOOGLE, fetchLogInByGoogleSaga);
    yield takeEvery(auth.FETCH_REGISTER_BY_MAIL_AND_PASSWORD, registerByMailAndPasswordSaga);
    yield takeEvery(auth.FETCH_LOGIN_BY_MAIL_AND_PASSWORD, logInByMailAndPasswordSaga);

    yield takeEvery(auth.SET_UPDATE_PROFILE, setUpdateProfileAndChatsSaga);
    yield takeEvery(auth.CLEAR_AUTH, clearAuthSaga);
}
