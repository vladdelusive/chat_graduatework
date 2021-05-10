import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Input, Tooltip, Typography, Avatar } from 'antd';
import {
    PlusOutlined, UserOutlined,
} from '@ant-design/icons';
import { getIsCollapsedSider } from 'store/chats/selectors';
import { getAuthProfile } from 'store/auth/selectors';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { SearchChatModal } from 'components/modals';
import { VideoCallButton } from 'components/common/video-call';
import moment from 'moment';

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
    } = props;

    const [isShowNewChatModal, setIsShowNewChatModal] = useState(false)

    const onlineStatus = activeChat?.userInfo?.status;

    const [, setRerender] = useState()

    useEffect(() => {
        let interval;
        if (onlineStatus?.lastTime) {
            interval = setInterval(() => {
                setRerender(Date.now())
            }, 60000);
        }
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [onlineStatus?.lastTime])

    return (
        <React.Fragment>
            <div className="chats-header">
                <div className={`header-line ${isCollapsed ? "collapsed" : ""}`}>
                    <div className="search-chat-btn">
                        <Tooltip title="Чат з новим користувачем">
                            <Button icon={<PlusOutlined />} size="large" onClick={() => setIsShowNewChatModal(true)} />
                        </Tooltip>
                    </div>
                    <Search
                        placeholder="Знайти чат..."
                        className="search-chats"
                        allowClear
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </div>
                <div className="chat-information">
                    <div className="chat-information--container">
                        <div className="box">
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
                        </div>
                        <div className="box">
                            <div>
                                <div style={{ marginTop: 3 }}>
                                    <Title level={3}>
                                        {isSetActiveChat && activeChat?.userInfo?.name ?
                                            <Link to={routes["profiles"].link(activeChat.userInfo.uid)} style={{ color: "#2335a0" }}>
                                                {activeChat.userInfo.name}
                                            </Link>
                                            : profile?.name || "Владислав Товсточуб"}
                                    </Title>
                                </div>
                                <div style={{ marginTop: -7 }}>
                                    {
                                        onlineStatus
                                            ? onlineStatus?.online
                                                ?
                                                <div className="status status-online">
                                                    <div className="status__text status-online__text">В мережі</div>
                                                    <div className="status__icon status-online__icon"></div>
                                                </div>
                                                :
                                                <div className="status status-offline">
                                                    <div className="status__text status-offline__text">Був в мережі {moment(+onlineStatus.lastTime).fromNow()}</div>
                                                    <div className="status__icon status-offline__icon"></div>
                                                </div>
                                            : null
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="box box--video-call">
                            {isSetActiveChat ? <VideoCallButton profile={activeChat.userInfo} /> : null}
                        </div>
                    </div>
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

const mapDispatchToProps = {};

const EnchancedHeaderChats = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(HeaderChats);

export { EnchancedHeaderChats };