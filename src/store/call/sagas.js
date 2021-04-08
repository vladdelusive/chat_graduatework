import { delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
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
    setIsShowCallModal
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
import { getCurrentCallDevice } from './selectors';


const fetchDevices = () => {
    store.dispatch(fetchDevicesList());
};

export function getAccessToAudio() {
    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
        if (navigator.mozGetUserMedia) {
            noty("error", "Mozilla audio outputs is not supported")
            return;
        }
    }
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: true }, (stream) => {
            fetchDevices();
        }, (err) => {
            noty("error", err?.message)
            navigator.getUserMedia({ audio: true }, (stream) => fetchDevices(), (err) => {
                noty("error", err)
            })
        })
    }
}

export function getStreamWithNewCam(deviceId, webcamRef, isShowNoty) {
    // without additional check becouse we did it before
    if (navigator.getUserMedia && webcamRef) {
        navigator.getUserMedia({ audio: true, video: deviceId ? ({ deviceId: { exact: deviceId } }) : true }, (stream) => {
            webcamRef.srcObject = stream;
        }, (error) => {
            webcamRef.srcObject = null;
            isShowNoty && noty("error", `${error}`)
        })
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

    // the check device sound goes duration * 1000
    yield delay(duration * 1000)
    audio.src = null
    yield put(saveIsPlayingSpeaker(false))
}

// function* fetchOutgoingCallSaga(action) {
//     // const { payload } = action;
// }

function* makeCallSaga(action) {
    const { payload } = action;
    // const { name, photo, email, uid } = payload;

    const callState = {
        type: "outgoing",
        subscriber: payload,
        isActiveCall: false,
    }
    yield put(changeCallState(callState))
    yield put(setIsShowCallModal(true))
}

function* cancelCallSaga(action) {
    // const { payload } = action;
    // const { name, photo, email, uid } = payload;

    const callState = {
        type: null,
        subscriber: null,
        isActiveCall: false,
    }
    yield put(changeCallState(callState))
}

function* answerCallSaga(action) {
    const { payload } = action;
    // const { name, photo, email, uid } = payload;

    const callState = {
        type: "active",
        subscriber: payload,
        isActiveCall: true,
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
}
