import { createSelector } from 'reselect';

/*
|--------------------------------------------------------------------------
| State piece getters
|--------------------------------------------------------------------------
*/

const _getCall = (state) => state.call;

const _getSpeakers = createSelector(
    [_getCall],
    call => call.speakers
);

const _getMics = createSelector(
    [_getCall],
    call => call.mics
);

const _getCams = createSelector(
    [_getCall],
    call => call.cams
);

/*
|--------------------------------------------------------------------------
| Selectors IsShowCallModal
|--------------------------------------------------------------------------
*/

export const getIsShowCallModal = createSelector(
    [_getCall],
    (call) => call.isShowModal
);

/*
|--------------------------------------------------------------------------
| Selectors speakers devices
|--------------------------------------------------------------------------
*/

export const getCurrentCallDevice = createSelector(
    [_getSpeakers],
    speakers => speakers.callDevice
);

export const getSpeakersList = createSelector(
    [_getSpeakers],
    speakers => speakers.list || []
);

export const getSpeakersIsTestPlaying = createSelector(
    [_getSpeakers],
    speakers => speakers.isTestPlaying
);

/*
|--------------------------------------------------------------------------
| Selectors mics devices
|--------------------------------------------------------------------------
*/

export const getMicDevice = createSelector(
    [_getMics],
    mics => mics.micDevice
);

export const getMicsList = createSelector(
    [_getMics],
    mics => mics.list || []
);

/*
|--------------------------------------------------------------------------
| Selectors cams devices
|--------------------------------------------------------------------------
*/

export const getCamDevice = createSelector(
    [_getCams],
    cams => cams.camDevice
);

export const getCamsList = createSelector(
    [_getCams],
    cams => cams.list || []
);

/*
|--------------------------------------------------------------------------
| Selectors calls state
|--------------------------------------------------------------------------
*/

export const _getCallState = createSelector(
    [_getCall],
    call => call.callState
);

export const getCallStateType = createSelector(
    [_getCallState],
    callState => callState.type
);

export const getCallStateIsActiveCall = createSelector(
    [_getCallState],
    callState => callState.isActiveCall
);

export const getCallStateIncoming = createSelector(
    [_getCallState],
    callState => callState.incoming
);

export const getCallStateOutgoing = createSelector(
    [_getCallState],
    callState => callState.outgoing
);

export const getCallStateActive = createSelector(
    [_getCallState],
    callState => callState.active
);

// export const getCallStateSubscriber = createSelector(
//     [_getCallState],
//     callState => callState.subscriber
// );