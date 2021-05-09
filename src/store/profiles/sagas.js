import { call, put, takeEvery } from 'redux-saga/effects';
import * as profiles from './types';
import { saveProfileId, onSnapshotSaveUpdateProfileId } from './actions';
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

function* updateProfileIdSaga(action) {
    try {
        const { payload } = action;
        const response = yield call(api.auth.preparedUpdatedProfileData, payload.data);
        const { profile } = response;
        yield put(onSnapshotSaveUpdateProfileId(profile))
    } catch (error) {
        console.log(error);
    }
}

export function* profilesSaga() {
    yield takeEvery(profiles.FETCH_PROFILE_ID, fetchProfileIdSaga);
    yield takeEvery(profiles.FETCH_UPDATE_PROFILE_ID, updateProfileIdSaga);
}
