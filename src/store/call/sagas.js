import { delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { noty } from 'utils';
import { saveCamsList, saveMicsList, saveSpeakersList, setCallSpeaker, setMicDevice, fetchDevicesList, setCamDevice, saveIsPlayingSpeaker } from './actions';
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

export function getAccessToAudio(videoConstraints = true) {
    if (!navigator.getUserMedia) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
        if (navigator.mozGetUserMedia) {
            noty("error", "Mozilla audio outputs is not supported")
            return;
        }
    }
    if (navigator.getUserMedia) {
        navigator.getUserMedia({ audio: true, video: videoConstraints }, (stream) => {
            const webcam = document.getElementById('webcam-local');
            webcam.srcObject = stream;
            fetchDevices();
        }, () => { })
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

export function* callSaga() {
    yield takeEvery(callTypes.TOGGLE_IS_SHOW_CALL_MODAL, () => { });

    yield takeEvery(callTypes.FETCH_DEVICES_LIST, fetchDevicesListSaga);

    // yield takeLatest(callTypes.SET_CALL_SPEAKER, setCallSpeakerSaga);
    // yield takeLatest(callTypes.SET_MIC_DEVICE, setMicDeviceSaga);
    // yield takeLatest(callTypes.SET_CAM_DEVICE, setCamDeviceSaga);

    yield takeLatest(callTypes.CHECK_CURRENT_SPEAKER, checkCurrentSpeakerSaga);
}
