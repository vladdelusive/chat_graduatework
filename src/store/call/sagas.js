import { delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { noty } from 'utils';
import { saveCamsList, saveMicsList, saveSpeakersList, setCallSpeaker, setMicDevice, fetchDevicesList, setCamDevice, saveIsPlayingSpeaker } from './actions';
import * as callTypes from './types';

import cok_cok from 'audio/cok_cok.mp3';
import cuvak_idi_ty from 'audio/cok_cok.mp3';
import ea_sports_its_in_the_game from 'audio/ea_sports_its_in_the_game.mp3';
import elektro_tango from 'audio/elektro_tango.mp3';
import gluhaa_gitara from 'audio/gluhaa_gitara.mp3';
import gornyj_or from 'audio/gornyj_or.mp3';
import kghm_kghm from 'audio/kghm_kghm.mp3';
import liquid_tune from 'audio/liquid_tune.mp3';
import long_string from 'audio/long_string.mp3';
import na_slucaj_vaznyh_peregovorov from 'audio/na_slucaj_vaznyh_peregovorov.mp3';
import o_set from 'audio/o_set.mp3';
import rozok from 'audio/rozok.mp3';
import tebedebede_plam from 'audio/tebedebede_plam.mp3';

// const setCallDeviceLS = (speaker) => window.localStorage.setItem("callSpeaker", JSON.stringify(speaker))
// const setBellDeviceLS = (speaker) => window.localStorage.setItem("bellSpeaker", JSON.stringify(speaker))
// const setMicDeviceLS = (mic) => window.localStorage.setItem("micDevice", JSON.stringify(mic))

// export const getCallDeviceLS = () => JSON.parse(window.localStorage.getItem("callSpeaker"))
// export const getBellDeviceLS = () => JSON.parse(window.localStorage.getItem("bellSpeaker"))
// export const getMicDeviceLS = () => JSON.parse(window.localStorage.getItem("micDevice"))

import { store } from 'store';
import { getCurrentCallDevice } from './selectors';

const testAudios = [
    { src: cok_cok, duration: 1.2 },
    { src: cuvak_idi_ty, duration: 1 },
    { src: ea_sports_its_in_the_game, duration: 2.2 },
    { src: elektro_tango, duration: 4 },
    { src: gluhaa_gitara, duration: 2.2 },
    { src: gornyj_or, duration: 6.2 },
    { src: kghm_kghm, duration: 1.2 },
    { src: liquid_tune, duration: 4.2 },
    { src: long_string, duration: 2.2 },
    { src: na_slucaj_vaznyh_peregovorov, duration: 4.2 },
    { src: o_set, duration: 1.2 },
    { src: rozok, duration: 2.2 },
    { src: tebedebede_plam, duration: 2.2 },
]


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

// function* setCamDeviceSaga(action) {
//     const { payload } = action
//     yield setCamDeviceLS(payload)
//     yield changeCamDevice()
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

// function* newOrderCreatedSaga() {
//     const audio = document.getElementById('new-order-audio');
//     if (audio.src) audio.src = null
//     audio.src = newOrder
//     // the new order audio sound goes 2.9 sec
//     yield delay(3000)
//     audio.src = null
// }

export function* callSaga() {
    yield takeEvery(callTypes.TOGGLE_IS_SHOW_CALL_MODAL, () => { });

    yield takeEvery(callTypes.FETCH_DEVICES_LIST, fetchDevicesListSaga);

    // yield takeLatest(callTypes.SET_CALL_SPEAKER, setCallSpeakerSaga);
    // yield takeLatest(callTypes.SET_MIC_DEVICE, setMicDeviceSaga);
    // yield takeLatest(callTypes.SET_CAM_DEVICE, setCamDeviceSaga);

    yield takeLatest(callTypes.CHECK_CURRENT_SPEAKER, checkCurrentSpeakerSaga);
    // yield takeLatest(callTypes.NEW_ORDER_CREATED, newOrderCreatedSaga);
}
