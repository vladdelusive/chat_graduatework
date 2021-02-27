import { createSelector } from 'reselect';
import { isFunction } from 'utils/is-function';

const _getPreloadersState = (state) => state.preloaders;

const _preloaderNames = (state, preloaderNames) => {
    let preloaderName = preloaderNames;
    if(isFunction(preloaderName)) {
        const funcRes = preloaderName();
        preloaderName = funcRes?.type ? funcRes.type : preloaderName;
    }
    if (!Array.isArray(preloaderName)) {
        preloaderName = [preloaderName];
    }
    return preloaderName;
};

const _getPreloaderState = createSelector(
    [_getPreloadersState],
    (preloaders) => preloaders
);

const _getPreloadersList = createSelector(
    [_getPreloaderState],
    (preloaderState) => preloaderState.list
);

export const hasPreloader = createSelector(
    [_getPreloadersList, _preloaderNames],
    (list, preloaderNames) => preloaderNames.some((name) => list.has(name))
);
