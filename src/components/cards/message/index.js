import React from 'react'
import moment from 'moment'
import { CLIENT_TIME_FORMAT } from 'constants/time-format';

export const MessageCard = (props) => {
    const { item, onShowImage } = props;
    const {
        message,
        me,
        timestamp,
        // id,
        isImage,
    } = item;

    return (
        <div className={`message ${me ? "from-me--message" : "to-me--message"}`} style={{ opacity: message?.length === 0 ? 0 : 1, maxWidth: isImage ? "40%" : "70%" }}>
            <div className="message__content">
                {
                    isImage ?
                        <img src={message} alt="message img" style={{ width: "100%", height: "100%" }} onClick={() => onShowImage({ src: message, show: true })}></img>
                        : message
                }
            </div>
            <span className="message__time">{moment(timestamp).format(CLIENT_TIME_FORMAT)}</span>
        </div>
    )
}
