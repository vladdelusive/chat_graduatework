import { peer } from 'constants/webrtc'
// ref = document.getElementById("current-call-remote")
// ref.muted = true
// remoteRef = document.getElementById("current-call-local")
// remoteStream = new MediaStream();
// remoteRef.srcObject = remoteStream;

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
        const remoteRef = document.getElementById("current-call-remote")
        remoteRef.srcObject = event.streams[0];
    };
    peer.onicecandidate = (event) => {
        if (!event.candidate) {
            const fromLocalStorage = localStorage.getItem("onicecandidateRemoteX")
            localStorage.setItem("onicecandidateRemote", fromLocalStorage)
            return
        }
        const fromLocalStorage = localStorage.getItem("onicecandidateRemoteX")
        if (fromLocalStorage) {
            let x = [...JSON.parse(fromLocalStorage), event.candidate.toJSON()]
            localStorage.setItem("onicecandidateRemoteX", JSON.stringify(x))
        } else {
            let x = [event.candidate.toJSON()]
            localStorage.setItem("onicecandidateRemoteX", JSON.stringify(x))
        }
    }


    window.addEventListener('storage', async (e) => {
        if (e.key === 'offer') {
            const offer = JSON.parse(localStorage.getItem("offer"))
            await peer.setRemoteDescription(new RTCSessionDescription(offer));
        }
        if(e.key === 'onicecandidateLocal') {
            const onicecandidateLocal = JSON.parse(localStorage.getItem("onicecandidateLocal"))
            onicecandidateLocal.forEach((can) => {
                const candidate = new RTCIceCandidate(can);
                peer.addIceCandidate(candidate);
            })
            const answer = await peer.createAnswer();
            await peer.setLocalDescription(answer);

            localStorage.setItem("answer", JSON.stringify(answer))
        }
    });
}

export const createOffer = (_localVideo) => {
    navigator.getUserMedia({ audio: true, video: true }, async (stream) => {
        !_localVideo && console.log("_localVideo is false");
        const localVideo = _localVideo || {};
        localVideo.srcObject = stream;
        localVideo.srcObject.getTracks().forEach(track => peer.addTrack(track, localVideo.srcObject));
        peer.onicecandidate = (event) => {
            if (!event.candidate) {
                const fromLocalStorage = localStorage.getItem("onicecandidateLocalX")
                localStorage.setItem("onicecandidateLocal", fromLocalStorage)
                return
            }
            const fromLocalStorage = localStorage.getItem("onicecandidateLocalX")
            if (fromLocalStorage) {
                let x = [...JSON.parse(fromLocalStorage), event.candidate.toJSON()]
                localStorage.setItem("onicecandidateLocalX", JSON.stringify(x))
            } else {
                let x = [event.candidate.toJSON()]
                localStorage.setItem("onicecandidateLocalX", JSON.stringify(x))
            }
        }
        peer.ontrack = (event) => {
            document.getElementById("current-call-remote").srcObject = event.streams[0];
        };

        const offerDescription = await peer.createOffer({ offerToReceiveAudio: true });
        await peer.setLocalDescription(offerDescription); // 1

        const offer = {
            sdp: offerDescription.sdp,
            type: offerDescription.type,
        };

        localStorage.setItem("offer", JSON.stringify(offer))

        window.addEventListener('storage', (e) => {
            if (e.key === 'answer') {
                const answer = JSON.parse(localStorage.getItem("answer"))
                const answerDescription = new RTCSessionDescription(answer);
                peer.setRemoteDescription(answerDescription);
            }

            if(e.key === 'onicecandidateRemote') {
                const onicecandidateRemote = JSON.parse(localStorage.getItem("onicecandidateRemote"))
                onicecandidateRemote.forEach((can) => {
                    const candidate = new RTCIceCandidate(can);
                    peer.addIceCandidate(candidate);
                })
            }
        });

    }, (error) => { })
}

export const createAnswer = () => {
    return
}
