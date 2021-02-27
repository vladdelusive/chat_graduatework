import * as preloaders from './types';

export const addPreloader = (payload) => ({ type: preloaders.ADD_PRELOADER, payload });
export const removePreloader = (payload) => ({ type: preloaders.REMOVE_PRELOADER, payload });
