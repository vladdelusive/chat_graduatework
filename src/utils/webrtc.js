import { createPeerConnection } from 'constants/webrtc';
import { api } from 'services';
import { store } from 'store';
import { changeRemoteVideoSrc, changeLocalVideoSrc, setNewPeerConnection } from 'store/call/actions';
import { getCallStateActive, getPeerConnection } from 'store/call/selectors';

export const remoteRef = {};
export const localRef = {};

window.remoteRef = remoteRef;
window.localRef = localRef;

export const registerPeerConnectionForOffers = () => {
    const peer = createPeerConnection()
    store.dispatch(setNewPeerConnection(peer))
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
        if (peer.signalingState !== "closed") {
            stream.getTracks().forEach(
                function (track) {
                    peer.addTrack(
                        track,
                        stream
                    );
                }
            );
            store.dispatch(changeLocalVideoSrc(stream))
        }
    }, (error) => { })

    peer.ontrack = (event) => {
        if (remoteRef.srcObject !== event.streams[0]) {
            remoteRef.srcObject = event.streams[0];
            store.dispatch(changeRemoteVideoSrc(event.streams[0]))
        }
    };
    let candidates = [];
    peer.onicecandidate = (event) => {
        const state = store.getState();
        const { uid } = getCallStateActive(state);
        if (event.candidate) {
            candidates.push(event.candidate)
        } else {
            const userCandidatesState = { active: { candidates: JSON.stringify(candidates) } }
            api.calls.updateCallCandidates({ userUid: uid, userCandidatesState })
            candidates = [];
            return;
        }
    }
}

export const createOffer = async ({ userUid }) => {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    })
    const state = store.getState();
    const peer = getPeerConnection(state);
    localRef.srcObject = stream;
    localRef.srcObject.getTracks().forEach(track => peer.addTrack(track, localRef.srcObject));
    store.dispatch(changeLocalVideoSrc(stream))

    let candidates = [];
    peer.onicecandidate = (event) => {
        if (event.candidate) {
            candidates.push(event.candidate)
        } else {
            const userCandidatesState = { incoming: { candidates: JSON.stringify(candidates) } }
            api.calls.updateCallCandidates({ userUid, userCandidatesState })
            candidates = [];
            return;
        }
    }
    const offerDescription = await peer.createOffer({ offerToReceiveAudio: true });
    await peer.setLocalDescription(offerDescription);

    const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
    };

    return JSON.stringify(offer);
}

export const createAnswer = async ({ offer, candidates }) => {
    const state = store.getState();
    const peer = getPeerConnection(state);

    await peer.setRemoteDescription(new RTCSessionDescription(offer));

    candidates.forEach((can) => {
        const candidate = new RTCIceCandidate(can);
        peer.addIceCandidate(candidate);
    })

    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    return JSON.stringify(answer);
}

export const setAnswerToPeer = (answer, candidates) => {
    const state = store.getState();
    const peer = getPeerConnection(state);

    const answerDescription = new RTCSessionDescription(answer);
    peer.setRemoteDescription(answerDescription);
    candidates.forEach((can) => {
        const candidate = new RTCIceCandidate(can);
        peer.addIceCandidate(candidate);
    })
}

