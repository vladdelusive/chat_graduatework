import { Card, Col, Row, Typography, Button, Spin } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import CallCancel from 'assets/images/call-cancel.jpg';
import CallAnswer from 'assets/images/call-answer.jpg';
import ToChats from 'assets/images/to-chats.png';

const IncomingCall = (props) => {
    const { profile } = props;
    const { name, email, id, image } = profile;
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
                            <img className={'incoming-img'} src={image} alt={'profile_image'} />
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
                            <Row justify="end" typeof="flex" gutter={12} style={{ marginTop: 20 }}>
                                <Col>
                                    <Typography.Title level={4} className="call-description">
                                        <Button type="primary" className="call-answer" shape="round" icon={<img src={CallAnswer} alt={'call-answer'} />}>
                                            <span style={{ marginLeft: 10 }}>Ответить</span>
                                        </Button>
                                    </Typography.Title>
                                </Col>
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

const EnchancedIncomingCall = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(IncomingCall);

export { EnchancedIncomingCall };