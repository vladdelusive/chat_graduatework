import { takeEvery } from 'redux-saga/effects';
import * as callTypes from './types';

export function* callSaga() {
    yield takeEvery(callTypes.TOGGLE_IS_SHOW_CALL_MODAL, () => { });
}
