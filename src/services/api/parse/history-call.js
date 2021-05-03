import { createTimestamp } from "utils/time"

export const parseNewHistoryCall = (payload) => {
    const { uid, email, photo, duration, callType, name } = payload;
    return {
        uid: uid,
        name: name,
        photo: photo,
        email: email,
        callType: callType,
        duration: duration || null,
        timestamp: createTimestamp(),
    }
}