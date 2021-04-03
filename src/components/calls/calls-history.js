import { Col, List, Row, Skeleton, Button, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';

const CallsHistoryContainer = (props) => {
    // const { activeCall } = props;
    // const { } = activeCall;

    const list = [
        {
            id: 1,
            name: "Vladik Tovstiochub",
            image: "https://firebasestorage.googleapis.com/v0/b/electron-chat-test-47c35.appspot.com/o/photos%2Fkmtmza83uft6ocx24chqdefault.jpg?alt=media&token=7d639e60-0006-412a-b2f5-b849bc766cb9",
            email: "mr.tovstochub@mail.ru",
            callType: "outgoing", // incoming
            duration: "5 минут, 32 секунды", // incoming
            timeDate: "03.04.2021 14:56",
        },
        {
            id: 2,
            name: "Vladik Tovstiochub",
            image: "https://firebasestorage.googleapis.com/v0/b/electron-chat-test-47c35.appspot.com/o/photos%2Fkmtmza83uft6ocx24chqdefault.jpg?alt=media&token=7d639e60-0006-412a-b2f5-b849bc766cb9",
            email: "mr.tovstochub@mail.ru",
            callType: "outgoing", // incoming
            duration: "5 минут, 32 секунды", // incoming
            timeDate: "03.04.2021 14:56",
        },
    ]
    return (
        <>
            <Typography.Title level={2} style={{ textAlign: "center" }}>История звонков</Typography.Title>
            <Row className="history-calls">
                <List
                    className="history-list"
                    loading={false}
                    itemLayout="horizontal"
                    // loadMore={loadMore}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item
                            actions={[<Button onClick={() => { }} type="link">Перезвонить</Button>, <Button onClick={() => { }} type="link">Написать</Button>]}
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src={item.image} />
                                    }
                                    title={<a href="https://ant.design">{item.name}</a>}
                                    description={(
                                        <Row>
                                            <Col>
                                                {`${item.callType === "outgoing" ? "Исходящий" : "Входящий"} (${item.timeDate})`}
                                            </Col>
                                            <Col>
                                                Продолжительность {item.duration}
                                            </Col>
                                        </Row>
                                    )}

                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
            </Row>
        </>
    )
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = {};

const CallsHistory = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(CallsHistoryContainer);

export { CallsHistory };