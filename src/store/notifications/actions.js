import * as notification from './types';

export const changeOnlineStatus = (payload) => ({ type: notification.CHANGE_STATUS, payload });