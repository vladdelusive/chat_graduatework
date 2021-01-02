import * as profiles from './types';

export const fetchProfileId = (payload) => ({ type: profiles.FETCH_PROFILE_ID, payload });
export const saveProfileId = (payload) => ({ type: profiles.SAVE_PROFILE_ID, payload });