import { createReducer } from 'store/utils';
import * as chats from './types';

const initialState = {
    chatsList: [],
    activeChatId: null,
    usersChats: [],
    isLoadingUsersChats: false,
};

export const chatsReducer = createReducer(initialState, {
    [chats.SAVE_CHATS](state, action) {
        const { payload } = action
        return {
            ...state,
            chatsList: payload
        };
    },

    [chats.SET_ACTIVE_CHAT_ID](state, action) {
        const { payload } = action
        return {
            ...state,
            activeChatId: payload
        };
    },

    [chats.FETCH_USERS_FOR_CHAT](state) {
        return {
            ...state,
            isLoadingUsersChats: true
        };
    },

    [chats.SAVE_USERS_FOR_CHAT](state, action) {
        const { payload } = action
        return {
            ...state,
            usersChats: payload,
            isLoadingUsersChats: false,
        };
    },

});
