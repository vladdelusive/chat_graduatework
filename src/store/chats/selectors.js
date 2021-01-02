import { createSelector } from 'reselect';

/*
|--------------------------------------------------------------------------
| State piece getters
|--------------------------------------------------------------------------
*/

const _getChats = (state) => state.chats;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const getChatsList = createSelector(
    [_getChats],
    (chats) => chats.chatsList
);

export const getActiveChatId = createSelector(
    [_getChats],
    (chats) => chats.activeChatId
);

export const getUsersChats = createSelector(
    [_getChats],
    (chats) => chats.usersChats
);

export const getIsLoadingUsersChats = createSelector(
    [_getChats],
    (chats) => chats.isLoadingUsersChats
);