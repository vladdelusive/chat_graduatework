/**
 * Creates an actionCreator function which accepts `payload` and a `type` from lexical scope
 * @param {string} type
 * @returns {function} actionCreator
 */
export function createAction(type) {
	const actionCreator = (payload = {}) => ({ type, payload });
	actionCreator.type = type;
	return actionCreator;
}

/**
 * Creates a standardized reducer with "type" and "payload" keys
 * @param initialState
 * @param reducerMap
 * @returns {function(*=, *)}
 */
export function createReducer(initialState, reducerMap) {
	return (state = initialState, action) => {
		const reducer = reducerMap[action.type];

		return reducer
			? reducer(state, action)
			: state;
	};
}
