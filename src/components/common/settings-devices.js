import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Select, Divider, Typography, Button } from 'antd';
import { StepForwardOutlined } from '@ant-design/icons';
const { Text } = Typography;

const SettingsDevices = (props) => {
    const {
        // setBellSpeaker,
        // setCallSpeaker,
        // speakersList,
        // currentCallDevice,
        // currentBellDevice,
        // checkCurrentSpeaker,
        // isPlayingState,
        micsList,
        currentMicDevice,
        setMicDevice,
    } = props;

    const go = () => {
        const webcam = document.getElementById('webcam-local');
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(
            stream => webcam.srcObject = stream,
            err => console.log(err)
        );
    }

    return (
        <Row className="settings">
            <Divider />
            <Col span={24}>
                <Row>
                    <Text type="secondary" className={'device-text'}>Микрофон</Text>
                </Row>
                <Row>
                    <Col span={24}>
                        <Select
                            className="device-select"
                            placeholder={'Выберите микрофон'}
                            size={'large'}
                        // onChange={(value) => setMicDevice(micsList.find(device => device.deviceId === value))}
                        // value={currentMicDevice?.deviceId}
                        // disabled={!micsList.length}
                        >
                            {/* {obj2options(micsList, { value: 'deviceId', text: 'label' })} */}
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Divider />
            <Col span={24}>
                <Row>
                    <Text type="secondary" className={'device-text'}>Динамик</Text>
                </Row>
                <Row>
                    <Col span={24}>
                        <Select
                            className="device-select"
                            placeholder={'Выберите динамик'}
                            size={'large'}
                        >
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={24} className="check-speaker">
                <Row>
                    <Button
                        type={'primary'}
                        block={true}
                        // onClick={() => checkCurrentSpeaker("bell")}
                        // loading={isPlayingState.device === "bell" && isPlayingState.isPlaying}
                        // disabled={(isPlayingState.device === "call" && isPlayingState.isPlaying) || !speakersList.length}
                        style={{ borderRadius: 10 }}
                        size="large"
                        icon={<StepForwardOutlined />}
                        onClick={go}
                    >
                        Проверить динамик
					</Button>
                </Row>
            </Col>
            <Divider />
            <Col span={24}>
                <Row>
                    <Text type="secondary" className={'device-text'}>Камера</Text>
                </Row>
                <Row typeof="flex" justify={'center'}>
                    <Col span={24}>
                        <video id="webcam-local" autoPlay></video>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

const mapStateToProps = (state) => {
    return {
        // speakersList: getSpeakersList(state),
        // currentCallDevice: getCurrentCallDevice(state),
        // currentBellDevice: getCurrentBellDevice(state),
        // isPlayingState: getIsPlayingSpeaker(state),
        // micsList: getMicsList(state),
        // currentMicDevice: getMicDevice(state),
    }
};

const mapDispatchToProps = {
    // setCallSpeaker,
    // setBellSpeaker,
    // checkCurrentSpeaker,
    // setMicDevice,
};

const EnhancedSettingsDevices = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SettingsDevices);

export { EnhancedSettingsDevices };
