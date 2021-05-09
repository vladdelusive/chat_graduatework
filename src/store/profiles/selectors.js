import { createSelector } from 'reselect';

/*
|--------------------------------------------------------------------------
| State piece getters
|--------------------------------------------------------------------------
*/

const _getProfiles = (state) => state.profiles;
const _getPathname = (state) => state.router.location.pathname;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const getProfilesIdList = createSelector(
    [_getProfiles],
    (profiles) => profiles.profilesList
);

export const getChatProfilesUidsList = createSelector(
    [_getProfiles],
    (profiles) => profiles.profilesFromChatUids
);

export const getProfileId = createSelector(
    [getProfilesIdList, _getPathname],
    (profilesList, path) => {
        const id = path.replace("/profile/", "")
        return profilesList[id] || null
    }
);