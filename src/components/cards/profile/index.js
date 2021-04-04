import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Typography } from 'antd'
import { OpenChatButton, Spin } from 'components/common';
import React from 'react'
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
    } = props

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
                        <Row typeof="flex" gutter={4}>
                            <Col><Paragraph copyable={{ text: email }} /></Col>
                            <Col><a href={`mailto:${email}`}>{email}</a></Col>
                        </Row>
                        {isToChat &&
                            (
                                <Row typeof="flex" gutter={4}>
                                    <Divider dashed />
                                    <OpenChatButton userId={id} />
                                </Row>
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
