import { Card, Col, Row, Typography, Button, Spin } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import CallCancel from 'assets/images/call-cancel.jpg';
import { OpenChatButton } from 'components/common';

const CurrentCall = (props) => {
    const { profile } = props;
    const { name, email, id, image, duration } = profile;
    return (
        <Row className="current-call">
            {/* <div className="current-spin--left"><Spin /></div> */}
            {/* <div className="current-spin--right"><Spin /></div> */}
            <div className="call-duration">
                <Typography.Text type="secondary">Продолжительность: {duration}</Typography.Text>
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
                            <img className={'current-img'} src={image} alt={'profile_image'} />
                        </Col>
                        <Col span={18}>
                            <Row>
                                <Typography.Title level={4} className="call-description">
                                    {email}
                                </Typography.Title>
                            </Row>
                            <Row>
                                <Typography.Title level={4}>
                                    <OpenChatButton />
                                </Typography.Title>
                            </Row>
                            <Row justify="end" typeof="flex" gutter={12} style={{ marginTop: 20 }}>
                                <Col>
                                    <Typography.Title level={4} className="call-description">
                                        <Button type="primary" className="call-cancel" shape="round" icon={<img src={CallCancel} alt={'call-cancel'} />}>
                                            <span style={{ marginLeft: 10 }}>Завершить</span>
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
        profile: {
            id: 1,
            name: "Vladik Tovstiochub",
            image: "https://firebasestorage.googleapis.com/v0/b/electron-chat-test-47c35.appspot.com/o/photos%2Fkmtmza83uft6ocx24chqdefault.jpg?alt=media&token=7d639e60-0006-412a-b2f5-b849bc766cb9",
            email: "mr.tovstochub@mail.ru",
            duration: "5:56",
        }
    }
};

const mapDispatchToProps = {};

const EnchancedCurrentCall = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(CurrentCall);

export { EnchancedCurrentCall };