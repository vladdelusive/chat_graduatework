import * as profiles from './types';

export const fetchProfileId = (payload) => ({ type: profiles.FETCH_PROFILE_ID, payload });
export const saveProfileId = (payload) => ({ type: profiles.SAVE_PROFILE_ID, payload });

export const onSnapshotFetchUpdateProfileId = (payload) => ({ type: profiles.FETCH_UPDATE_PROFILE_ID, payload });
export const onSnapshotSaveUpdateProfileId = (payload) => ({ type: profiles.SAVE_UPDATE_PROFILE_ID, payload });

export const setProfilesChatsUids = (payload) => ({ type: profiles.SET_PROFILES_CHATS_UIDS, payload });