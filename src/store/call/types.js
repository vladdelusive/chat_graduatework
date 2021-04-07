const PRFX = '@call/';

export const TOGGLE_IS_SHOW_CALL_MODAL = `${PRFX}TOGGLE_IS_SHOW_CALL_MODAL`;
export const SET_IS_SHOW_CALL_MODAL = `${PRFX}SET_IS_SHOW_CALL_MODAL`;

// call settings state

export const SET_CALL_SPEAKER = `${PRFX}SET_CALL_SPEAKER`;
export const SET_MIC_DEVICE = `${PRFX}SET_MIC_DEVICE`;
export const SET_CAM_DEVICE = `${PRFX}SET_CAM_DEVICE`;

export const FETCH_DEVICES_LIST = `${PRFX}FETCH_DEVICES_LIST`;

export const SAVE_SPEAKERS_LIST = `${PRFX}SAVE_SPEAKERS_LIST`;
export const SAVE_MICS_LIST = `${PRFX}SAVE_MICS_LIST`;
export const SAVE_CAMS_LIST = `${PRFX}SAVE_CAMS_LIST`;

export const CHECK_CURRENT_SPEAKER = `${PRFX}CHECK_CURRENT_SPEAKER`;

export const SAVE_IS_PLAYING_SPEAKER = `${PRFX}SAVE_IS_PLAYING_SPEAKER`;

// outgoing/incoming state

export const FETCH_OUTGOING_CALL = `${PRFX}FETCH_OUTGOING_CALL`;
export const SAVE_OUTGOING_CALL = `${PRFX}SAVE_OUTGOING_CALL`;

export const ON_MAKE_CALL = `${PRFX}ON_MAKE_CALL`;
export const ON_ANSWER_CALL = `${PRFX}ON_ANSWER_CALL`;
export const ON_CANCEL_CALL = `${PRFX}ON_CANCEL_CALL`;

export const CHANGE_CALL_STATE = `${PRFX}CHANGE_CALL_STATE`;

// export const CHANGE_OUTGOING_CALL = `${PRFX}CHANGE_OUTGOING_CALL`;