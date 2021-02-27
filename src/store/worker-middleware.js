import { call, put } from 'redux-saga/effects';
import { addPreloader, removePreloader } from './preloaders/actions';

export function* workerMiddleware(params, action) {
	yield put(addPreloader(action.type));
	try {
		yield call(params.worker, action);
	} catch (error) {
		console.log({ error });
	} finally {
		yield put(removePreloader(action.type));
	}
}
