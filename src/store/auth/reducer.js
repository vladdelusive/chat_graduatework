import { createReducer } from 'store/utils';
import * as auth from './types';

const initialState = {
    isAuthenticated: false,
    isLoggingIn: false,
    profile: null,
};

export const authReducer = createReducer(initialState, {
    [auth.SAVE_LOGIN_AUTH](state, action) {
        const { payload } = action;
        return {
            ...state,
            isAuthenticated: true,
            profile: payload,
        };
    },

    [auth.SAVE_UPDATE_PROFILE](state, action) {
        const { payload } = action;
        return {
            ...state,
            profile: payload,
        };
    },

    [auth.FAIL_LOGIN_AUTH](state) {
        return initialState
    },

    [auth.CLEAR_AUTH]() {
        return initialState;
    },
});
