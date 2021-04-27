import { createSelector } from 'reselect';

/*
|--------------------------------------------------------------------------
| State piece getters
|--------------------------------------------------------------------------
*/

const _getAuth = (state) => state.auth;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const getAuth = createSelector(
    [_getAuth],
    (auth) => auth
);

export const getAuthIsAuthenticated = createSelector(
    [getAuth],
    (auth) => auth.isAuthenticated
);


export const getAuthProfile = createSelector(
    [getAuth],
    (auth) => auth.profile
);

export const getAuthProfileUid = createSelector(
    [getAuthProfile],
    (profile) => profile?.uid
);

export const getAuthProfileChats = createSelector(
    [getAuthProfile],
    (profile) => profile.chats
);
