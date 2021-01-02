import { createReducer } from '../utils';
// import { OActionTypes as app } from './actions';

export const initialState = {};

export const reducer = createReducer(initialState, {
	'@@router/LOCATION_CHANGE'(state) {
		return state;
	},
});
