import { createSelector } from 'reselect';

/*
|--------------------------------------------------------------------------
| State piece getters
|--------------------------------------------------------------------------
*/

const _getCall = (state) => state.call;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const getIsShowCallModal = createSelector(
    [_getCall],
    (call) => call.isShowModal
);