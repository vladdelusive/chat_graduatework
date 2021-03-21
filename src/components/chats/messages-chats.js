import React, { useState } from 'react'
import { MessageCard } from 'components/cards/message'
import { Scrollbars } from 'react-custom-scrollbars';
import moment from "moment"
import { CLIENT_DATE_FORMAT } from 'constants/time-format'
import Modal from 'antd/lib/modal/Modal';

export const MessagesChats = React.memo((props) => {
    const {
        activeChat,
    } = props;

    const [showImage, onShowImage] = useState({ show: false, src: null })

    return (
        <React.Fragment>
            <Scrollbars style={{ width: "100%", height: "100%" }}
                renderView={props => <div {...props} className="simplebar-content" />}
            >
                {activeChat.messages.length
                    ?
                    Object.entries(
                        activeChat.messages
                            .reduce((a, m) => {
                                const timeDate = moment(m.timestamp).format(CLIENT_DATE_FORMAT)
                                if (a.hasOwnProperty(timeDate)) {
                                    a[timeDate].push(m);
                                } else {
                                    a[timeDate] = [m];
                                }
                                return a;
                            }, {})
                    ).map(([k, e]) => {
                        const isToday = moment(k, CLIENT_DATE_FORMAT).isSame(moment(), 'day');
                        const date = isToday ? `Сегодня (${moment(k, CLIENT_DATE_FORMAT).format("LLLL").split(",").slice(0, -1).join()})` : k;
                        return (
                            <React.Fragment key={k}>
                                <div className={`date-messages ${isToday ? "today-date" : ""}`}>{date}</div>
                                {e.map((item, index) => <MessageCard key={index} item={item} onShowImage={onShowImage} />)}
                            </React.Fragment>
                        )
                    })
                    : <div className="chat_info">Сообщений в чате пока нет...</div>
                }
            </Scrollbars>
            <Modal
                visible={showImage.show}
                title={"Просмотр картинки"}
                footer={null}
                width={800}
                onCancel={() => onShowImage({ src: null, show: false })}
            >
                <img alt="Sent img" style={{ width: '100%' }} src={showImage.src} />
            </Modal>
        </React.Fragment>

    )
})