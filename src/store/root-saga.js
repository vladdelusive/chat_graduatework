import { all } from 'redux-saga/effects';
import * as sagas from './export-sagas';

export function* rootSaga() {
	yield all(Object.values(sagas).map((saga) => saga()))
}
