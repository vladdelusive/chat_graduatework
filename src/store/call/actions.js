import * as call from './types';

export const toggleIsShowCallModal = () => ({ type: call.TOGGLE_IS_SHOW_CALL_MODAL });
export const setIsShowCallModal = (payload) => ({ type: call.SET_IS_SHOW_CALL_MODAL, payload });

// calls settings

export const fetchDevicesList = () => ({ type: call.FETCH_DEVICES_LIST });

export const saveSpeakersList = (payload) => ({ type: call.SAVE_SPEAKERS_LIST, payload });
export const saveMicsList = (payload) => ({ type: call.SAVE_MICS_LIST, payload });
export const saveCamsList = (payload) => ({ type: call.SAVE_CAMS_LIST, payload });

export const setMicDevice = (payload) => ({ type: call.SET_MIC_DEVICE, payload });
export const setCallSpeaker = (payload) => ({ type: call.SET_CALL_SPEAKER, payload });
export const setCamDevice = (payload) => ({ type: call.SET_CAM_DEVICE, payload });

export const checkCurrentSpeaker = (payload) => ({ type: call.CHECK_CURRENT_SPEAKER, payload });

export const saveIsPlayingSpeaker = (payload) => ({ type: call.SAVE_IS_PLAYING_SPEAKER, payload });

// outgoing - incoming call



export const onMakeCall = (payload) => ({ type: call.ON_MAKE_CALL, payload });
export const onAnswerCall = (payload) => ({ type: call.ON_ANSWER_CALL, payload });
export const onCancelCall = (payload) => ({ type: call.ON_CANCEL_CALL, payload });

export const changeCallState = (payload) => ({ type: call.CHANGE_CALL_STATE, payload });
// export const saveOutgoingCall = (payload) => ({ type: call.SAVE_OUTGOING_CALL, payload });

// export const fetchOutgoingCall = (payload) => ({ type: call.FETCH_OUTGOING_CALL, payload });
// export const saveOutgoingCall = (payload) => ({ type: call.SAVE_OUTGOING_CALL, payload });

// export const changeOutgoingCall = (payload) => ({ type: call.CHANGE_OUTGOING_CALL, payload });