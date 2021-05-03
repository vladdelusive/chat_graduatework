import { createReducer } from 'store/utils';
import * as call from './types';

const initialState = {
    isShowModal: false,
    speakers: {
        callDevice: {},
        isTestPlaying: false,
        list: [],
    },
    mics: {
        micDevice: {},
        list: [],
    },
    cams: {
        camDevice: {},
        list: [],
    },
    callState: {
        type: null,
        isActiveCall: false,
        // subscriber: null,
    },
    remoteVideo: null,
    localVideo: null,
    peer: null,
    tab: "1",
    // history: { items: [], ....}, online: false,
};

export const callReducer = createReducer(initialState, {
    [call.TOGGLE_IS_SHOW_CALL_MODAL](state) {
        return {
            ...state,
            isShowModal: !state.isShowModal
        };
    },

    /*
    ** CHANGE_CALL_STATE
    */

    [call.CHANGE_CALL_STATE](state, action) {
        const { payload } = action
        return {
            ...state,
            callState: {
                ...state.callState,
                ...payload,
            }
        };
    },

    [call.SET_REMOTE_SRC_OBJECT](state, action) {
        const { payload } = action
        return {
            ...state,
            remoteVideo: payload
        };
    },

    [call.SET_LOCAL_SRC_OBJECT](state, action) {
        const { payload } = action
        return {
            ...state,
            localVideo: payload
        };
    },

    [call.SET_NET_PEER_CONNECTION](state, action) {
        const { payload } = action
        return {
            ...state,
            peer: payload
        };
    },

    [call.SET_CALL_MODAL_TAB](state, action) {
        const { payload } = action
        return {
            ...state,
            tab: payload
        };
    },

    /*
    ** SETTINGS DEVICES
    */

    [call.SET_IS_SHOW_CALL_MODAL](state, action) {
        const { payload } = action;
        return {
            ...state,
            isShowModal: payload
        };
    },

    [call.SET_CALL_SPEAKER](state, action) {
        const { payload } = action
        return {
            ...state,
            speakers: {
                ...state.speakers,
                callDevice: payload
            }
        };
    },

    [call.SET_MIC_DEVICE](state, action) {
        const { payload } = action
        return {
            ...state,
            mics: {
                ...state.mics,
                micDevice: payload
            }
        };
    },

    [call.SAVE_MICS_LIST](state, action) {
        const { payload } = action
        return {
            ...state,
            mics: {
                ...state.mics,
                list: payload
            }
        };
    },

    [call.SAVE_SPEAKERS_LIST](state, action) {
        const { payload } = action
        return {
            ...state,
            speakers: {
                ...state.speakers,
                list: payload
            }
        };
    },

    [call.SAVE_IS_PLAYING_SPEAKER](state, action) {
        const { payload } = action
        return {
            ...state,
            speakers: {
                ...state.speakers,
                isTestPlaying: payload
            }
        };
    },

    [call.SET_CAM_DEVICE](state, action) {
        const { payload } = action
        return {
            ...state,
            cams: {
                ...state.cams,
                camDevice: payload
            }
        };
    },

    [call.SAVE_CAMS_LIST](state, action) {
        const { payload } = action
        return {
            ...state,
            cams: {
                ...state.cams,
                list: payload
            }
        };
    },
});
