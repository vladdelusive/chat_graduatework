import { takeEvery } from 'redux-saga/effects';
import * as notification from './types';

function* changeStatusOnlineSaga() {
}

export function* notificationSaga() {
    yield takeEvery(notification.CHANGE_STATUS, changeStatusOnlineSaga);
}
