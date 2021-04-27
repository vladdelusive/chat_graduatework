import { Card, Col, Row, Typography, Button, Spin } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import CallCancel from 'assets/images/call-cancel.jpg';
import CallAnswer from 'assets/images/call-answer.jpg';
import { OpenChatButton } from 'components/common';
import { onAnswerCall, onCancelCall } from 'store/call/actions';
import { getCallStateIncoming } from 'store/call/selectors';

const IncomingCall = (props) => {
    const { profile, onCancelCall, onAnswerCall } = props;
    const { name, email, uid, photo } = profile;
    return (
        <Row className="incoming-call">
            <div className="incoming-spin--left"><Spin /></div>
            <div className="incoming-spin--right"><Spin /></div>
            <Col span={24}>
                <Card title="ВХОДЯЩИЙ">
                    <Row>
                        <Typography.Title level={3}>
                            {name}
                        </Typography.Title>
                    </Row>
                    <Row typeof="flex" justify="space-between" gutter={12}>
                        <Col span={6}>
                            <img className={'incoming-img'} src={photo} alt={'profile_image'} />
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
                                            className="call-answer"
                                            shape="round"
                                            icon={<img src={CallAnswer} alt={'call-answer'} />}
                                            onClick={() => {
                                                onAnswerCall(profile)
                                            }}
                                        >
                                            <span style={{ marginLeft: 10 }}>Ответить</span>
                                        </Button>
                                    </Typography.Title>
                                </Col>
                                <Col>
                                    <Typography.Title level={4} className="call-description">
                                        <Button
                                            type="primary"
                                            className="call-cancel"
                                            shape="round"
                                            icon={<img src={CallCancel} alt={'call-cancel'} />}
                                            onClick={() => {
                                                onCancelCall({ profile, statusCall: "incoming" })
                                            }}
                                        >
                                            <span style={{ marginLeft: 10 }}>Завершить</span>
                                        </Button>
                                    </Typography.Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: getCallStateIncoming(state)
    }
};

const mapDispatchToProps = { onCancelCall, onAnswerCall };

const EnchancedIncomingCall = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(IncomingCall);

export { EnchancedIncomingCall };