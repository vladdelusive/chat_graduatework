import { Col, List, Row, Skeleton, Button, Typography, Tag } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { OpenChatButton } from 'components/common';
import { CLIENT_DATE_HH_MM } from 'constants/time-format';
import moment from 'moment';
import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { routes } from 'routes';
import { getCallStateHistory } from 'store/call/selectors';
import { onMakeCall } from 'store/call/actions'

const CallsHistoryContainer = (props) => {
    const { history, onMakeCall } = props;
    return (
        <>
            <Typography.Title level={2} style={{ textAlign: "center" }}>Історія дзвінків</Typography.Title>
            <Row className="history-calls" style={history.length > 5 ? { overflowY: "scroll" } : {}}>
                <List
                    className="history-list"
                    loading={false}
                    itemLayout="horizontal"
                    locale={{ emptyText: "Історія дзвінків порожня" }}
                    dataSource={history.reverse()}
                    renderItem={item => {
                        const profile = {
                            name: item.name,
                            photo: item.photo,
                            email: item.email,
                            uid: item.uid,
                        }
                        return (
                            <List.Item
                                actions={[
                                    <Button onClick={() => onMakeCall(profile)} type="link">{"Передзвонити"}</Button>,
                                    <OpenChatButton userId={item.uid} text={"Написати"} defaultStyle={false} />,
                                ]}
                            >
                                <Skeleton avatar title={false} active loading={false}>
                                    <List.Item.Meta
                                        avatar={
                                            <Link to={routes["profiles"].link(item.uid)}>
                                                <Avatar src={item.photo} />
                                            </Link>
                                        }
                                        title={
                                            <Link to={routes["profiles"].link(item.uid)}>
                                                {item.name}
                                            </Link>
                                        }
                                        description={(
                                            <Row>
                                                <Col>
                                                    {item.callType === "outgoing"
                                                        ? <Tag color="magenta">Вихідний</Tag>
                                                        : <Tag color="blue">Вхідний</Tag>
                                                    }
                                                    <span className="timestamp">{moment(+item.timestamp).format(CLIENT_DATE_HH_MM)}</span>
                                                </Col>
                                                {
                                                    item.duration ?
                                                        <Col>
                                                            Тривалість <span className="duration">{item.duration}</span>
                                                        </Col>
                                                        : null
                                                }
                                            </Row>
                                        )}

                                    />
                                </Skeleton>
                            </List.Item>
                        )
                    }
                    }
                />
            </Row>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        history: getCallStateHistory(state)
    }
};

const mapDispatchToProps = { onMakeCall };

const CallsHistory = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(CallsHistoryContainer);

export { CallsHistory };