import { Card, Col, Row, Typography, Button, Spin } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import CallDisconnect from 'assets/images/disconnect.jpg';
import ToChats from 'assets/images/to-chats.png';

const OutgoingCall = (props) => {
    const { profile } = props;
    const { name, email, id, image } = profile;
    return (
        <Row className="outgoing-call">
            <div className="outgoing-spin--left"><Spin /></div>
            <div className="outgoing-spin--right"><Spin /></div>
            <Col span={24}>
                <Card title="ИСХОДЯЩИЙ">
                    <Row>
                        <Typography.Title level={3}>
                            {name}
                        </Typography.Title>
                    </Row>
                    <Row typeof="flex" justify="space-between" gutter={12}>
                        <Col span={6}>
                            <img className={'outgoing-img'} src={image} alt={'profile_image'} />
                        </Col>
                        <Col span={18}>
                            <Row>
                                <Typography.Title level={4} className="call-description">
                                    {email}
                                </Typography.Title>
                            </Row>
                            <Row>
                                <Typography.Title level={4} className="call-description">
                                    <Button className="to-chats" icon={<img src={ToChats} alt={'to-chats'} />}>Открыть чат</Button>
                                </Typography.Title>
                            </Row>
                            <Row justify="end" typeof="flex">
                                <Col>
                                    <Typography.Title level={4} className="call-description">
                                        <Button type="primary" className="call-disconnect" shape="round" icon={<img src={CallDisconnect} alt={'call-disconnect'} />}>
                                            <span style={{ marginLeft: 10 }}>Завершить</span>
                                        </Button>
                                    </Typography.Title>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row typeof="flex">
                        <Col>
                            <video id="outgoing-call-video" autoPlay></video>
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
        }
    }
};

const mapDispatchToProps = {};

const EnchancedOutgoingCall = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(OutgoingCall);

export { EnchancedOutgoingCall };

// {
//     id: 1,
//     name: "Vladik Tovstiochub",
//     image: "https://firebasestorage.googleapis.com/v0/b/electron-chat-test-47c35.appspot.com/o/photos%2Fkmtmza83uft6ocx24chqdefault.jpg?alt=media&token=7d639e60-0006-412a-b2f5-b849bc766cb9",
//     email: "mr.tovstochub@mail.ru",
//     callType: "outgoing", // incoming
//     duration: "5 минут, 32 секунды", // incoming
//     timeDate: "03.04.2021 14:56",
// },