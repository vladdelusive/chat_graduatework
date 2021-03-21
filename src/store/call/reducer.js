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
    // incoming: {
    //     user: null,
    //     // status: null,
    //     active: false
    // },
    outgoing: {
        user: null,
        // status: null,
        active: false
    },
    activeCall: false,
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
    ** INCOMING-OUTGOING - CALL BLOCK
    */

    [call.SAVE_OUTGOING_CALL](state, action) {
        const { payload } = action
        return {
            ...state,
            outgoing: {
                ...state.outgoing,
                active: payload,
            }
        };
    },

    // [call.CHANGE_OUTGOING_CALL](state, action) {
    //     const { payload } = action
    //     return {
    //         ...state,
    //         outgoing: {
    //             ...state.outgoing,
    //             ...payload
    //         }
    //     };
    // },

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
