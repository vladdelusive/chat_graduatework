import { takeEvery } from 'redux-saga/effects';
// import { api } from 'services';
// import { getAuthProfileUid } from 'store/auth/selectors';
// import { call } from 'store/export-reducers';
import * as notification from './types';

function* changeStatusOnlineSaga(action) {
    // TODO -> onDisconnect
    // const uid = yield select(getAuthProfileUid)
    // if (uid) {

    //     yield call(api.auth[payload ? "setOnlineProfile" : "setOfflineProfile"], uid)
    // }
}

export function* notificationSaga() {
    yield takeEvery(notification.CHANGE_STATUS, changeStatusOnlineSaga);
}
