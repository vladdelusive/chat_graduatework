import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { noty } from 'utils';
import {
    saveCamsList,
    saveMicsList,
    saveSpeakersList,
    setCallSpeaker,
    setMicDevice,
    fetchDevicesList,
    setCamDevice,
    saveIsPlayingSpeaker,
    changeCallState,
    setIsShowCallModal,
} from './actions';
import * as callTypes from './types';
import { testAudios } from 'audio'

// const setCallDeviceLS = (speaker) => window.localStorage.setItem("callSpeaker", JSON.stringify(speaker))
// const setBellDeviceLS = (speaker) => window.localStorage.setItem("bellSpeaker", JSON.stringify(speaker))
// const setMicDeviceLS = (mic) => window.localStorage.setItem("micDevice", JSON.stringify(mic))

// export const getCallDeviceLS = () => JSON.parse(window.localStorage.getItem("callSpeaker"))
// export const getBellDeviceLS = () => JSON.parse(window.localStorage.getItem("bellSpeaker"))
// export const getMicDeviceLS = () => JSON.parse(window.localStorage.getItem("micDevice"))

import { store } from 'store';
import { getCallStateIncoming, getCurrentCallDevice, getPeerConnection } from './selectors';
import { createAnswer, createOffer, registerPeerConnectionForOffers, setAnswerToPeer } from 'utils/webrtc';
import { api } from 'services';
import { getAuthProfile } from 'store/auth/selectors';
import { isEmpty } from 'utils/isEmptyObject';


const fetchDevices = () => {
    store.dispatch(fetchDevicesList());
};

export async function getAccessToAudio() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        fetchDevices();
        return stream
    } catch (exception) {
        noty("error", exception?.message)
        try {
            await navigator.mediaDevices.getUserMedia({
                audio: true
            })
            fetchDevices()
        } catch (err) {
            noty("error", err)
        }
    }
}

export async function getStreamWithNewCam(deviceId, webcamRef, isShowNoty) {
    if (webcamRef) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: deviceId ? ({ deviceId: { exact: deviceId } }) : true
            })
            webcamRef.srcObject = stream;
        } catch (error) {
            webcamRef.srcObject = null;
            isShowNoty && noty("error", `${error}`)
        }
    }
}


function* fetchDevicesListSaga() {
    const devices = yield navigator.mediaDevices.enumerateDevices();

    const audiooutputDevices = [];
    const audioinputDevices = [];
    const videoinputDevices = [];
    devices.forEach((device) => {
        if (device.kind === 'audiooutput') {
            audiooutputDevices.push(device)
        } else if (device.kind === 'audioinput') {
            audioinputDevices.push(device)
        } else if (device.kind === 'videoinput') {
            videoinputDevices.push(device)
        }
    })
    yield put(saveSpeakersList(audiooutputDevices));
    yield put(saveMicsList(audioinputDevices));
    yield put(saveCamsList(videoinputDevices));

    if (audioinputDevices.length) yield put(setMicDevice(audioinputDevices[0]));

    if (audiooutputDevices.length) yield put(setCallSpeaker(audiooutputDevices[0]));

    if (videoinputDevices.length) yield put(setCamDevice(videoinputDevices[0]));
}

// function* setCallSpeakerSaga(action) {
//     const { payload } = action
//     yield setCallDeviceLS(payload)
// }

// function* setMicDeviceSaga(action) {
//     const { payload } = action
//     yield setMicDeviceLS(payload)
//     yield changeMicDevice()
// }

function* setCamDeviceSaga(action) {
    const { payload } = action;
    const { deviceId } = payload
    yield getStreamWithNewCam(deviceId)
}

function* checkCurrentSpeakerSaga() {
    const audio = document.getElementById('speaker-test');
    if (audio.src) audio.src = null;
    const { src, duration } = testAudios[Math.floor(Math.random() * testAudios.length)]
    audio.src = src

    let currentCheckDevice = yield select(getCurrentCallDevice)
    yield put(saveIsPlayingSpeaker(true))
    yield audio.setSinkId(currentCheckDevice.deviceId);

    // the check device sound goes -> duration * 1000
    yield delay(duration * 1000)
    audio.src = null
    yield put(saveIsPlayingSpeaker(false))
}

// function* fetchOutgoingCallSaga(action) {
//     // const { payload } = action;
// }

function* makeCallSaga(action) {
    const { payload } = action;

    yield put(setIsShowCallModal(true))
    // const localVideo = document.getElementById("current-call-local");
    const { name, photo, email, uid } = yield select(getAuthProfile);
    const offer = yield createOffer({ userUid: payload.uid })
    yield call(
        api.calls.createOffer,
        {
            myUid: uid,
            userUid: payload.uid,
            incoming: { name, photo, email, uid, offer },
            outgoing: { ...payload }
        }
    )
}

function* cancelCallSaga(action) {
    const { payload } = action;
    const { profile, statusCall } = payload;

    let myState = {}
    let userState = {}

    switch (statusCall) {
        case "outgoing":
            myState = { outgoing: {} }
            userState = { incoming: {} }
            break;
        case "incoming":
            myState = { incoming: {} }
            userState = { outgoing: {} }
            break;
        case "active":
            myState = { active: {} }
            userState = { active: {} }
            break;
        default:
            break;
    }

    const peer = yield select(getPeerConnection)
    peer.close()
    yield registerPeerConnectionForOffers()

    const callState = {
        type: null,
        isActiveCall: false,
    }

    const { uid } = yield select(getAuthProfile);
    yield call(
        api.calls.cancelCall,
        {
            myUid: uid,
            userUid: profile.uid,
            myState,
            userState,
        }
    )
    yield put(changeCallState(callState))
}

function* answerCallSaga(action) {
    const { payload } = action;
    // const { name, photo, email, uid } = payload;
    const { name, photo, email, uid } = yield select(getAuthProfile);
    const { candidates, offer } = yield select(getCallStateIncoming);

    const answer = yield createAnswer({ candidates: JSON.parse(candidates), offer: JSON.parse(offer) })

    let myState = {
        incoming: {},
        active: { name: payload.name, photo: payload.photo, email: payload.email, uid: payload.uid }
    }
    let userState = {
        outgoing: {},
        active: { name, photo, email, uid, answer }
    }
    yield call(
        api.calls.answerCall,
        {
            myUid: uid,
            userUid: payload.uid,
            myState,
            userState,
        }
    )
    const callState = {
        type: null,
        isActiveCall: false,
    }
    yield put(changeCallState(callState))

}

function* onSnapshotCallUpdateSaga(action) {
    const { payload } = action;
    const { data } = yield payload;
    let type = ""
    if (!isEmpty(data.active)) {
        type = "active";
        if (data.active?.answer && data.active?.candidates) {
            const answer = JSON.parse(data.active.answer);
            const candidates = JSON.parse(data.active.candidates);
            setAnswerToPeer(answer, candidates);
        }
    } else if (!isEmpty(data.outgoing)) {
        type = "outgoing";
    } else if (!isEmpty(data.incoming)) {
        type = "incoming";
    } else {
        const peer = yield select(getPeerConnection)
        peer.close()
        yield registerPeerConnectionForOffers()
    }
    const callState = {
        outgoing: data.outgoing,
        incoming: data.incoming,
        history: data.history,
        active: data.active,
        type,
        isActiveCall: type === "active",
    }
    yield put(changeCallState(callState))
}

export function* callSaga() {
    // call settings state
    yield takeEvery(callTypes.TOGGLE_IS_SHOW_CALL_MODAL, () => { });
    yield takeEvery(callTypes.FETCH_DEVICES_LIST, fetchDevicesListSaga);
    // yield takeLatest(callTypes.SET_CALL_SPEAKER, setCallSpeakerSaga);
    // yield takeLatest(callTypes.SET_MIC_DEVICE, setMicDeviceSaga);
    yield takeLatest(callTypes.SET_CAM_DEVICE, setCamDeviceSaga);
    yield takeLatest(callTypes.CHECK_CURRENT_SPEAKER, checkCurrentSpeakerSaga);

    // outgoing/incoming state
    // yield takeEvery(callTypes.FETCH_OUTGOING_CALL, fetchOutgoingCallSaga);
    yield takeEvery(callTypes.ON_MAKE_CALL, makeCallSaga);
    yield takeEvery(callTypes.ON_CANCEL_CALL, cancelCallSaga);
    yield takeEvery(callTypes.ON_ANSWER_CALL, answerCallSaga);
    yield takeEvery(callTypes.ON_SNAPSHOT_CALL_UPDATE, onSnapshotCallUpdateSaga);
}
