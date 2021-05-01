import { Card, Col, Row, Typography, Button } from 'antd';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import CallCancel from 'assets/images/call-cancel.jpg';
import { OpenChatButton } from 'components/common';
import { onCancelCall } from 'store/call/actions';
import moment from 'moment';
import { getCallStateActive } from 'store/call/selectors';

const CurrentCall = (props) => {
    const { profile, onCancelCall } = props;
    const { name, email, uid, photo } = profile;
    const [duration, setDuration] = useState(moment().startOf("day"))
    useEffect(() => {
        let intervalId = setInterval(function () {
            setDuration(time => moment(time).add(1, 'second'))
        }, 1000);
        return () => { clearInterval(intervalId) }
    }, [])
    return (
        <Row className="current-call">
            {/* <div className="current-spin--left"><Spin /></div> */}
            {/* <div className="current-spin--right"><Spin /></div> */}
            <div className="call-duration">
                <Typography.Text type="secondary">Тривалість: {duration.format('HH:mm:ss')}</Typography.Text>
            </div>
            <Col span={24}>
                <Card title="АКТИВНЫЙ ЗВОНОК">
                    <Row>
                        <Typography.Title level={3}>
                            {name}
                        </Typography.Title>
                    </Row>
                    <Row typeof="flex" justify="space-between" gutter={12}>
                        <Col span={6}>
                            <img className={'current-img'} src={photo} alt={'profile_image'} />
                        </Col>
                        <Col span={18}>
                            <Row>
                                <Typography.Title level={4} className="call-description">
                                    {email}
                                </Typography.Title>
                            </Row>
                            <Row>
                                <Typography.Title level={4}>
                                    <OpenChatButton userId={uid} />
                                </Typography.Title>
                            </Row>
                            <Row justify="end" typeof="flex" gutter={12} style={{ marginTop: 20 }}>
                                <Col>
                                    <Typography.Title level={4} className="call-description">
                                        <Button
                                            type="primary"
                                            className="call-cancel"
                                            shape="round"
                                            icon={<img src={CallCancel} alt={'call-cancel'} />}
                                            onClick={() => {
                                                onCancelCall({ profile, statusCall: "active" })
                                            }}
                                        >
                                            <span style={{ marginLeft: 10 }}>Завершити</span>
                                        </Button>
                                    </Typography.Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row typeof="flex" gutter={24} justify="space-between">
                        <Col span={12}>
                            <video id="current-call-local" className="current-call current-call__my-camera" autoPlay></video>
                        </Col>
                        <Col span={12}>
                            <video id="current-call-remote" className="current-call current-call__person-camera" autoPlay></video>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: getCallStateActive(state)
    }
};

const mapDispatchToProps = { onCancelCall };

const EnchancedCurrentCall = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(CurrentCall);

export { EnchancedCurrentCall };