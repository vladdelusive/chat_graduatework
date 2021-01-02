import * as auth from './types';

export const fetchLogInByGoogle = () => ({ type: auth.FETCH_LOGIN_BY_GOOGLE });
export const fetchRegisterByMailAndPassword = (payload) => ({ type: auth.FETCH_REGISTER_BY_MAIL_AND_PASSWORD, payload });
export const fetchLogInByMailAndPassword = (payload) => ({ type: auth.FETCH_LOGIN_BY_MAIL_AND_PASSWORD, payload });

export const saveLogInAuth = (payload) => ({ type: auth.SAVE_LOGIN_AUTH, payload });
export const failLogInAuth = (payload) => ({ type: auth.FAIL_LOGIN_AUTH, payload });

export const logoutRequest = () => ({ type: auth.LOGOUT_REQUEST });
export const clearAuth = (payload) => ({ type: auth.CLEAR_AUTH, payload });

export const setUpdateProfile = (payload) => ({ type: auth.SET_UPDATE_PROFILE, payload });
export const saveUpdateProfile = (payload) => ({ type: auth.SAVE_UPDATE_PROFILE, payload });
