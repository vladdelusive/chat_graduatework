import { call, put, takeEvery } from 'redux-saga/effects';
import * as profiles from './types';
import { saveProfileId } from './actions';
import { api } from 'services';
import { noty } from 'utils';

function* fetchProfileIdSaga(action) {
    try {
        const { payload } = action;
        const response = yield call(api.profiles.fetchProfileId, payload);
        yield put(saveProfileId(response));
    } catch (error) {
        noty("error")
        console.warn(error);
    }
}

export function* profilesSaga() {
    yield takeEvery(profiles.FETCH_PROFILE_ID, fetchProfileIdSaga);
}
