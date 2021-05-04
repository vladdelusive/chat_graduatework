import React, { useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Input, Row, Tooltip, Upload } from 'antd';
import { HighlightOutlined, UploadOutlined } from '@ant-design/icons';
import { sendNewMessage } from 'store/chats/actions';
import { getActiveChatId } from 'store/chats/selectors';
import { checkValue } from 'utils/validation'
import { noty } from 'utils';
import { generateUid } from 'utils/uid-generator';
import { createStorageRef } from 'db'
import Modal from 'antd/lib/modal/Modal';
import { PixelPaint } from 'components/common';

function InputChats(props) {
    const {
        activeChatId,
        activeChat,
        sendNewMessage,
        setMessageValue,
        messageValue,
    } = props;

    const [showModal, setShowModal] = useState(false)

    const submitMessage = (e) => {
        if (!messageValue.trim()) {
            return;
        }
        if (e.key === "Enter") {
            sendNewMessage({ chatUid: activeChatId, message: messageValue, isImage: false })
            setMessageValue("")
        }
    }

    const sendCanvasImage = (blob, callback) => {
        const fileNamePath = generateUid();
        createStorageRef(blob, fileNamePath).then((url) => {
            sendNewMessage({ chatUid: activeChatId, message: url, isImage: true })
            callback()
        })
    }

    return (
        <>
            <Row className="input-message" typeof="flex" justify="center" gutter={24} >
                <Col style={{ alignItems: "center", display: "flex", cursor: "pointer" }}>
                    <Upload
                        beforeUpload={() => false}
                        onChange={async (info) => {
                            const error = checkValue([info.file], {
                                fileTypes: 'png, jpg, jpeg',
                                fileSize: 8 * 1024
                            });
                            if (!error) {
                                const fileNamePath = generateUid() + info.file.name;
                                createStorageRef(info.file, fileNamePath).then((url) => {
                                    sendNewMessage({ chatUid: activeChatId, message: url, isImage: true })
                                })
                            } else {
                                noty('error', error);
                            }
                        }}
                        showUploadList={false}
                        multiple={true}
                    >
                        <Tooltip placement="topRight" title="Завантажити картинку">
                            <Button className="btn-upload">
                                <UploadOutlined style={{ fontSize: 30 }} />
                            </Button>
                        </Tooltip>
                    </Upload>
                </Col>
                <Col style={{ alignItems: "center", display: "flex", cursor: "pointer" }}>
                    <Tooltip placement="topRight" title="Намалювати на полотні">
                        <Button className="btn-draw" onClick={() => setShowModal(true)}>
                            <HighlightOutlined style={{ fontSize: 30 }} />
                        </Button>
                    </Tooltip>
                </Col>
                <Col span={21}>
                    <Input
                        className="input"
                        placeholder={activeChat?.messages?.length ? "Напишіть повідомлення" : "Напишіть повідомлення першим"}
                        size="large"
                        onChange={(e) => setMessageValue(e.target.value)}
                        value={messageValue}
                        onKeyPress={submitMessage}
                    />
                </Col>
            </Row>
            <Modal
                visible={showModal}
                title={"Полотно"}
                width={1220}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                {showModal && <PixelPaint sendCanvasImage={sendCanvasImage} closeModal={() => setShowModal(false)} />}
            </Modal>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        activeChatId: getActiveChatId(state),
    };
};

const mapDispatchToProps = {
    sendNewMessage
};

const EnchancedInputChats = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(InputChats);

export { EnchancedInputChats };