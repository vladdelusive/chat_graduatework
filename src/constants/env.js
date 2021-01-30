/** Build environment */
export const BUILD_ENV = process.env.NODE_ENV;
export const IS_DEVELOPMENT = BUILD_ENV === 'development';
export const IS_PRODUCTION = BUILD_ENV === 'production';

/** Permissions */
export const ALLOW_DEV_CONSOLE = process.env.REACT_APP_ALLOW_DEV_CONSOLE === 'true';
export const ALLOW_REDUX_DEVTOOLS_EXTENSION = process.env.REACT_APP_ALLOW_REDUX_DEVTOOLS_EXTENSION === 'true';
export const ALLOW_WINDOW_EXTENDS = process.env.REACT_APP_ALLOW_WINDOW_EXTENDS === 'true';

/** App */
export const APP_NAME = process.env.REACT_APP_NAME || 'Messenger app by Vlad Tovstochub';
export const CREATER_GITHUB = 'https://github.com/vladdelusive';
export const CREATER_NICKNAME = 'vladdelusive';
export const API_URL = process.env.REACT_APP_API_URL || undefined;
export const API_VERSION = process.env.REACT_APP_API_VERSION || undefined;
export const API_CONTACTS_SEED_KEY = process.env.REACT_APP_API_CONTACTS_SEED_KEY || undefined;
export const HISTORY_BASENAME = process.env.REACT_APP_HISTORY_BASENAME || '/';
