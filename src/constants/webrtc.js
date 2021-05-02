export const configuration = {
    iceServers: [
        {
            urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

export const peer = new RTCPeerConnection(configuration);

window.peer = peer
export const createPeerConnection = () => {
    return new RTCPeerConnection(configuration);
}