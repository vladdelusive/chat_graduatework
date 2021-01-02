import { createSelector } from 'reselect';

/*
|--------------------------------------------------------------------------
| State piece getters
|--------------------------------------------------------------------------
*/

const _getNotification = (state) => state.notification;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const getNotifications = createSelector(
    [_getNotification],
    (notifications) => notifications
);

export const getNotificationOnlineStatus = createSelector(
    [getNotifications],
    (notifications) => notifications.online
);
