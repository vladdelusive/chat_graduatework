import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Select, Divider, Typography, Button } from 'antd';
import { StepForwardOutlined } from '@ant-design/icons';
import { obj2options } from 'utils/obj-to-options';
import { getAccessToAudio } from 'store/call/sagas';
import { getCurrentCallDevice, getMicDevice, getMicsList, getSpeakersList, getSpeakersIsTestPlaying, getCamDevice, getCamsList } from 'store/call/selectors';
import { setMicDevice, setCallSpeaker, checkCurrentSpeaker, setCamDevice } from 'store/call/actions';
const { Text } = Typography;

const SettingsDevices = (props) => {
    const {
        micsList,
        currentMicDevice,
        setMicDevice,

        speakersList,
        currentSpeakerDevice,
        setCallSpeaker,

        isPlayingState,
        checkCurrentSpeaker,

        currentCamDevice,
        camsList,
        setCamDevice,
    } = props;

    useEffect(() => {
        getAccessToAudio()
    }, [])

    return (
        <Row className="settings">
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
                            onChange={(value) => setMicDevice(micsList.find(device => device.deviceId === value))}
                            value={currentMicDevice?.deviceId}
                            disabled={!micsList.length}
                        >
                            {obj2options(micsList, { value: 'deviceId', text: 'label' })}
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
                            onChange={(value) => setCallSpeaker(speakersList.find(device => device.deviceId === value))}
                            value={currentSpeakerDevice?.deviceId}
                            disabled={isPlayingState || !speakersList.length}
                            loading={isPlayingState}
                        >
                            {obj2options(speakersList, { value: 'deviceId', text: 'label' })}
                        </Select>
                    </Col>
                </Row>
            </Col>
            <Col span={24} className="check-speaker">
                <Row>
                    <Button
                        type={'primary'}
                        block={true}
                        onClick={checkCurrentSpeaker}
                        loading={isPlayingState}
                        disabled={isPlayingState || !speakersList.length}
                        style={{ borderRadius: 10 }}
                        size="large"
                        icon={<StepForwardOutlined />}
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
                <Row>
                    <Col span={24}>
                        <Select
                            className="device-select"
                            placeholder={'Выберите камеру'}
                            size={'large'}
                            onChange={(value) => {
                                setCamDevice(camsList.find(device => device.deviceId === value))
                                if (value) getAccessToAudio({ deviceId: { exact: value } }); // videoConstraints
                            }}
                            value={currentCamDevice?.deviceId}
                            disabled={!camsList.length}
                        >
                            {obj2options(camsList, { value: 'deviceId', text: 'label' })}
                        </Select>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
};

const mapStateToProps = (state) => {
    return {
        micsList: getMicsList(state),
        currentMicDevice: getMicDevice(state),
        speakersList: getSpeakersList(state),
        currentSpeakerDevice: getCurrentCallDevice(state),
        isPlayingState: getSpeakersIsTestPlaying(state),
        currentCamDevice: getCamDevice(state),
        camsList: getCamsList(state),
    }
};

const mapDispatchToProps = {
    setCallSpeaker,
    checkCurrentSpeaker,
    setMicDevice,
    setCamDevice,
};

const EnhancedSettingsDevices = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(SettingsDevices);

export { EnhancedSettingsDevices };
