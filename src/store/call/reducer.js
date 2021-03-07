import { createReducer } from 'store/utils';
import * as call from './types';

const initialState = {
    isShowModal: false,
};

export const callReducer = createReducer(initialState, {
    [call.TOGGLE_IS_SHOW_CALL_MODAL](state) {
        return {
            ...state,
            isShowModal: !state.isShowModal
        };
    },
    [call.SET_IS_SHOW_CALL_MODAL](state, action) {
        const { payload } = action;
        return {
            ...state,
            isShowModal: payload
        };
    },
});
