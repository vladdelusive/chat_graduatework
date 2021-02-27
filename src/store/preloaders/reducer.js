import { createReducer } from 'store/utils';
import * as preloaders from './types';

const initialState = {
    list: new Set(),
};

export const preloadersReducer = createReducer(initialState, {
    [preloaders.ADD_PRELOADER](state, action) {
        const { payload } = action;
        const list = new Set([...state.list]);
        list.add(payload);
        return { ...state, list }
    },

    [preloaders.REMOVE_PRELOADER](state, action) {
        const { payload } = action;
        const list = new Set([...state.list]);
        list.delete(payload);
        return { ...state, list }
    },
});

