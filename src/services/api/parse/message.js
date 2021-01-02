import { createTimestamp } from "utils/time"

export const parseNewMessage = (payload) => {
    const { uid, message, isImage = false } = payload;
    return {
        from: uid,
        message: message,
        timestamp: createTimestamp(),
        isImage: isImage,
    }
}