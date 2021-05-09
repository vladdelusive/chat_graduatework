import { createReducer } from 'store/utils';
import * as profiles from './types';

const initialState = {
    profilesList: {},
    profilesFromChatUids: []
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

    [profiles.SAVE_UPDATE_PROFILE_ID](state, action) {
        const { payload } = action;
        return {
            ...state,
            profilesList: {
                ...state.profilesList,
                [payload.uid]: payload,
            }
        };
    },
    
    [profiles.SET_PROFILES_CHATS_UIDS](state, action) {
        const { payload } = action;
        return {
            ...state,
            profilesFromChatUids: payload
        };
    },
});
