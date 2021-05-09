import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd'
import { OpenChatButton, Spin } from 'components/common';
import { VideoCallButton } from 'components/common/video-call';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

export const ProfileCard = React.memo((props) => {
    const {
        img,
        nameTitle,
        email,
        title,
        returnBtn,
        isDataExist,
        isToChat,
        id,
        onlineInfo,
    } = props;

    const [, setRerender] = useState()

    useEffect(() => {
        let interval;
        if (onlineInfo?.lastTime) {
            interval = setInterval(() => {
                setRerender(Date.now())
            }, 60000);
        }
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [onlineInfo?.lastTime])

    return (
        <div className="page--profile">
            <Row type={"flex"} justify="center">
                <Col>
                    <Title>{title}</Title>
                </Col>
            </Row>
            <Row gutter={16} type={"flex"} justify="center" >
                <Spin isDataExist={isDataExist} style={{ margin: "60px auto 100px" }} >
                    <Col className="avatar" style={{ marginBottom: 20 }}>
                        <img alt="avatar" src={img} />
                    </Col>
                    <Col>
                        <Title level={3}>{nameTitle}&nbsp;</Title>
                        <Divider dashed />
                        <Row typeof="flex" gutter={4} style={{ height: 16 }}>
                            <Col><Paragraph copyable={{ text: email }} /></Col>
                            <Col><a href={`mailto:${email}`}>{email}</a></Col>
                        </Row>
                        {isToChat &&
                            (
                                <>
                                    <Row typeof="flex" gutter={4}>
                                        <Divider dashed />
                                        <OpenChatButton userId={id} />
                                        {/* isDataExist -> profile user info (TS, I need you) */}
                                        <div style={{ marginLeft: 10 }}>
                                            <VideoCallButton profile={isDataExist} />
                                        </div>
                                    </Row>
                                    <Row typeof="flex" gutter={4}>
                                        <Divider dashed />
                                        {
                                            onlineInfo.online
                                                ?
                                                (
                                                    <div className="status status-online">
                                                        <div className="status__text status-online__text">В мережі</div>
                                                        <div className="status__icon status-online__icon"></div>
                                                    </div>
                                                )
                                                : (
                                                    <div className="status status-offline">
                                                        <div className="status__text status-offline__text">Був в мережі {moment(+onlineInfo.lastTime).fromNow()}</div>
                                                        <div className="status__icon status-offline__icon"></div>
                                                    </div>
                                                )
                                        }
                                    </Row>
                                </>
                            )
                        }
                        <Divider dashed />
                    </Col>
                </Spin>
            </Row>
            {returnBtn ? <Row type={"flex"} justify="center">
                <Col>
                    <Link to="/chats" >
                        <Button icon={<DoubleLeftOutlined />} type="primary">Назад</Button>
                    </Link>
                </Col>
            </Row> : null}
        </div>
    )
})
