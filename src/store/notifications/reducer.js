import { createReducer } from 'store/utils';
import * as notification from './types';

const initialState = {
    online: true,
};

export const notificationReducer = createReducer(initialState, {

    [notification.CHANGE_STATUS](state, action) {
        const { payload } = action;
        return {
            ...state,
            online: payload,
        }
    },

});
