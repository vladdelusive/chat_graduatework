import { peer } from 'constants/webrtc'
import { api } from 'services';
import { store } from 'store';
import { getCallStateActive } from 'store/call/selectors';
// ref = document.getElementById("current-call-remote")
// ref.muted = true
// remoteRef = document.getElementById("current-call-local")
// remoteStream = new MediaStream();
// remoteRef.srcObject = remoteStream;

export const remoteRef = {};
export const localRef = {};

window.remoteRef = remoteRef;
window.localRef = localRef;

export const registerPeerConnectionForOffers = () => {
    navigator.getUserMedia({ audio: true, video: true }, (stream) => {
        stream.getTracks().forEach(
            function (track) {
                peer.addTrack(
                    track,
                    stream
                );
            }
        );
    }, (error) => { })
    peer.ontrack = (event) => {
        remoteRef.srcObject = event.streams[0];
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
    localRef.srcObject = stream;
    localRef.srcObject.getTracks().forEach(track => peer.addTrack(track, localRef.srcObject));
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
    const answerDescription = new RTCSessionDescription(answer);
    peer.setRemoteDescription(answerDescription);
    candidates.forEach((can) => {
        const candidate = new RTCIceCandidate(can);
        peer.addIceCandidate(candidate);
    })
}

