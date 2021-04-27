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
import { workerMiddleware } from 'store/worker-middleware';
import { changeCallState, setIsShowCallModal } from 'store/call/actions';

function* fetchLogInByGoogleSaga() {
    try {
        const response = yield call(api.auth.googleLogin);
        if (!response) return;
        // const { chats, profile, calls } = response;
        const { chats, profile } = response;
        
        yield put(saveLogInAuth(profile))
        yield put(saveChats(chats))

        // yield put(changeCallState(calls))
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

        // const { profile, calls } = response;
        const { profile } = response;

        yield put(saveLogInAuth(profile))
        yield put(saveChats(profile.chats))

        // yield put(changeCallState(calls))
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
        // const { chats, profile, calls } = response;
        const { chats, profile } = response;
        yield put(saveLogInAuth(profile))
        yield put(saveChats(chats))

        // yield put(changeCallState(calls))
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
        // const { chats, profile, calls } = response;
        const { chats, profile } = response;
        yield put(saveUpdateProfile(profile))
        yield put(saveChats(chats))
        // yield put(changeCallState(calls))
    } catch (error) {
        console.log(error);
    }
}

function* clearAuthSaga() {
    yield put(setIsShowCallModal(false));
    // yield removeProfileToLocalStorage();
}

export function* authSaga() {
    yield takeEvery(auth.FETCH_LOGIN_BY_GOOGLE, fetchLogInByGoogleSaga);
    yield takeEvery(auth.FETCH_REGISTER_BY_MAIL_AND_PASSWORD, workerMiddleware, { worker: registerByMailAndPasswordSaga });
    yield takeEvery(auth.FETCH_LOGIN_BY_MAIL_AND_PASSWORD, workerMiddleware, { worker: logInByMailAndPasswordSaga });

    yield takeEvery(auth.SET_UPDATE_PROFILE, setUpdateProfileAndChatsSaga);
    yield takeEvery(auth.CLEAR_AUTH, clearAuthSaga);
}
