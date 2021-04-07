import React, { useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Input, Row, Tooltip, Typography, Avatar } from 'antd';
import {
    PlusOutlined, UserOutlined, VideoCameraOutlined,
} from '@ant-design/icons';
import { getIsCollapsedSider } from 'store/chats/selectors';
import { getAuthProfile } from 'store/auth/selectors';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { SearchChatModal } from 'components/modals';
import { onMakeCall } from 'store/call/actions';

const { Search } = Input;
const { Title } = Typography;

function HeaderChats(props) {
    const {
        isSetActiveChat,
        activeChat,
        profile,
        isCollapsed,
        setSearchValue,
        searchValue,
        onMakeCall,
    } = props;

    const [isShowNewChatModal, setIsShowNewChatModal] = useState(false)

    return (
        <React.Fragment>
            <div className="chats-header">
                <div className={`header-line ${isCollapsed ? "collapsed" : ""}`}>
                    <div className="search-chat-btn">
                        <Tooltip title="Чат с новым пользователем">
                            <Button icon={<PlusOutlined />} size="large" onClick={() => setIsShowNewChatModal(true)} />
                        </Tooltip>
                    </div>
                    <Search
                        placeholder="Найти чат..."
                        className="search-chats"
                        allowClear
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <div className="chat-information">
                    <Row typeof="flex" justify="space-between" align="middle" style={{ height: "100%", padding: "0px 10px" }}>
                        <Col span={8}>
                            <Row align="middle" gutter={10}>
                                <Col>
                                    <Avatar
                                        src={isSetActiveChat && activeChat?.userInfo?.photo ? activeChat.userInfo.photo : profile?.photo}
                                        icon={<UserOutlined />}
                                        size="large"
                                        style={{
                                            color: "white",
                                            background: "#5d86e8",
                                            fontSize: 40, width: 60,
                                            height: 60, lineHeight: "55px"
                                        }}
                                    />
                                </Col>
                                <Col>
                                    <Title level={3}>
                                        {isSetActiveChat && activeChat?.userInfo?.name ?
                                            <Link to={routes["profiles"].link(activeChat.userInfo.uid)} style={{ color: "#2335a0" }}>
                                                {activeChat.userInfo.name}
                                            </Link>
                                            : profile?.name || "Владислав Товсточуб"}
                                    </Title>
                                </Col>
                            </Row>
                        </Col>
                        {isSetActiveChat ? <Col>
                            <Row>
                                <Tooltip title="Видео звонок">
                                    <VideoCameraOutlined className="video-call" onClick={() => {
                                        onMakeCall(activeChat.userInfo.uid)
                                    }} />
                                </Tooltip>
                            </Row>
                        </Col> : null}
                    </Row>
                </div>
            </div>
            { isShowNewChatModal ? <SearchChatModal setIsShowNewChatModal={setIsShowNewChatModal} /> : null}
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        profile: getAuthProfile(state),
        isCollapsed: getIsCollapsedSider(state),
    };
};

const mapDispatchToProps = { onMakeCall };

const EnchancedHeaderChats = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(HeaderChats);

export { EnchancedHeaderChats };