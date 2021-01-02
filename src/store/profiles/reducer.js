import { createReducer } from 'store/utils';
import * as profiles from './types';

const initialState = {
    profilesList: {},
};

export const profilesReducer = createReducer(initialState, {
    [profiles.SAVE_PROFILE_ID](state, action) {
        const { payload } = action
        return {
            ...state,
            profilesList: {
                ...state.profilesList,
                [payload.uid]: payload,
            }
        };
    },

});
