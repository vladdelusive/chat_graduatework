import { createSelector } from 'reselect';

const _getAppState = (state) => state.app;

export const getAppState = createSelector(
	[_getAppState],
	(app) => app,
);
