import { IS_DEVELOPMENT } from 'constants/env';
import { auth } from './auth';
import { profiles } from './profiles';
import { chats } from './chats';
import { calls } from './calls';

export const api = {
    auth,
    profiles,
    chats,
    calls,
};

if (IS_DEVELOPMENT) {
    window.api = api;
}