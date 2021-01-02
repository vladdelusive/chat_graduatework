import { IS_DEVELOPMENT } from 'constants/env';
import { auth } from './auth';
import { profiles } from './profiles';
import { chats } from './chats';

export const api = {
    auth,
    profiles,
    chats,
};

if (IS_DEVELOPMENT) {
    window.api = api;
}