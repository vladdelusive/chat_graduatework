import { createSelector } from 'reselect';

const _getPreloadersState = (state) => state.preloaders;

const _preloaderNames = (state, preloaderNames) => {
    if (!Array.isArray(preloaderNames)) {
        preloaderNames = [preloaderNames];
    }
    return preloaderNames;
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
