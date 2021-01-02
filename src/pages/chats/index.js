import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Col, Input, Layout, Menu, Row, Tooltip, Typography, Avatar, Upload } from 'antd';
import
Icon,
{
    PlusOutlined, UploadOutlined, UserOutlined,
} from '@ant-design/icons';
import { MessageCard } from 'components/cards/message'
import { setActiveChatId, setUpdatedChatMessages, sendNewMessage } from 'store/chats/actions';
import { setUpdateProfile } from 'store/auth/actions';
import { getActiveChatId, getChatsList } from 'store/chats/selectors';
import { getAuthProfile } from 'store/auth/selectors';
import { SearchChatModal } from 'components/modals';
import { api } from 'services';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import { checkValue } from 'utils/validation'

import { Scrollbars } from 'react-custom-scrollbars';
import { noty } from 'utils';
import { generateUid } from 'utils/uid-generator';
// import ChatBack from 'assets/images/chat-template.jpg';

import { createStorageRef } from 'db'
import Modal from 'antd/lib/modal/Modal';
const { Content, Sider } = Layout;
const { Search } = Input;
const { Title } = Typography;

function Chats(props) {
    const {
        chats,
        setActiveChatId,
        activeChatId,
        isSetActiveChat,
        activeChat,
        profile,
        setUpdateProfile,
        profileUid,
        profileChats,
        setUpdatedChatMessages,
        sendNewMessage,
    } = props;

    const [isCollapsed, setIsCollapsed] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [isShowNewChatModal, setIsShowNewChatModal] = useState(false)
    const [messageValue, setMessageValue] = useState("")
    const [showImage, onShowImage] = useState({ show: false, src: null })
    useEffect(() => {
        setMessageValue("")
    }, [activeChatId])

    useEffect(() => {
        let unsubscribeToProfileChats;
        if (profileUid) {
            unsubscribeToProfileChats = api.auth.subscribeToProfileChats(profileUid, setUpdateProfile)
        }
        return () => {
            if (typeof unsubscribeToProfileChats === "function" && profileUid) {
                unsubscribeToProfileChats()
            }
        }
    }, [profileUid, setUpdateProfile])

    useEffect(() => {
        let unsubscribeChatsMessagesArray;
        if (profileChats) {
            unsubscribeChatsMessagesArray = profileChats.map(chat => api.auth.subscribeToChatsMessages(chat, setUpdatedChatMessages))
        }
        return () => {
            if (typeof unsubscribeChatsMessagesArray === "object" && profileChats) {
                unsubscribeChatsMessagesArray.forEach(unsub => unsub())
            }
        }
    }, [profileChats, setUpdatedChatMessages])

    const filteredChats = (searchValue?.toString().trim().length && chats.filter(({ userInfo }) => {
        return userInfo.name?.toString().toLowerCase().trim().includes(searchValue.toString().toLowerCase().trim())
    })) || chats;

    useEffect(() => {
        return () => setActiveChatId(null)
    }, [setActiveChatId])

    const submitMessage = (e) => {
        if (!messageValue.trim()) {
            return;
        }
        if (e.key === "Enter") {
            sendNewMessage({ chatUid: activeChatId, message: messageValue, isImage: false })
            setMessageValue("")
        }
    }

    useEffect(() => {
        let timeout;
        const scrollBlockContainer = document.querySelector(".simplebar-content")
        if (scrollBlockContainer) {
            scrollBlockContainer.scrollTo({
                top: scrollBlockContainer.scrollHeight,
                behavior: "smooth"
            });
            timeout = setTimeout(() => {
                scrollBlockContainer.scrollTo({
                    top: scrollBlockContainer.scrollHeight,
                    behavior: "smooth"
                });
            }, 500)
        }
        return () => clearTimeout(timeout)
    }, [chats])

    useEffect(() => {
        let timeout;

        const scrollBlockContainer = document.querySelector(".simplebar-content")
        if (scrollBlockContainer) {
            scrollBlockContainer.scrollTo({
                top: scrollBlockContainer.scrollHeight,
            });
            timeout = setTimeout(() => {
                scrollBlockContainer.scrollTo({
                    top: scrollBlockContainer.scrollHeight,
                    behavior: "smooth"
                });
            }, 500)
        }
        return () => clearTimeout(timeout)
    }, [activeChatId])

    return (
        <>
            <div className="page page--chats">
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
                        </Row>
                    </div>
                </div>
                <Layout className="chats-list">
                    <Sider
                        width={300}
                        theme={'light'}
                        collapsible={true}
                        collapsed={isCollapsed}
                        onCollapse={() => setIsCollapsed(!isCollapsed)}
                    >
                        <Menu mode="inline" selectedKeys={[activeChatId]}>
                            {filteredChats.map((chat) => {
                                const { userInfo, id } = chat;
                                const { name, photo } = userInfo;
                                return (
                                    <Menu.Item
                                        key={id}
                                        onClick={() => setActiveChatId(id)}
                                        icon={<Icon component={() => (<img src={photo} alt="logo" />)} />}>
                                        {name}
                                    </Menu.Item>
                                )
                            }
                            )}
                        </Menu>
                    </Sider>
                    <Layout className="chat-content">
                        <Content>
                            {
                                activeChatId ?
                                    <>
                                        <div className="messages-container">
                                            <Scrollbars style={{ width: "100%", height: "100%" }}
                                                renderView={props => <div {...props} className="simplebar-content" />}
                                            >
                                                {activeChat.messages.map((item, index) => {
                                                    return <MessageCard key={index} item={item} onShowImage={onShowImage} />
                                                })}
                                            </Scrollbars>

                                        </div>
                                        <div className="input-container">
                                            <Row className="input-message" typeof="flex" justify="center" gutter={24} >
                                                <Col style={{ alignItems: "center", display: "flex", cursor: "pointer" }}>
                                                    <Upload
                                                        beforeUpload={() => false}
                                                        onChange={async (info) => {
                                                            const error = checkValue([info.file], {
                                                                fileTypes: 'png, jpg, jpeg',
                                                                fileSize: 8 * 1024
                                                            });
                                                            if (!error) {
                                                                const fileNamePath = generateUid() + info.file.name;
                                                                createStorageRef(info.file, fileNamePath).then((url) => {
                                                                    sendNewMessage({ chatUid: activeChatId, message: url, isImage: true })
                                                                })
                                                            } else {
                                                                noty('error', error);
                                                            }
                                                        }}
                                                        showUploadList={false}
                                                        multiple={true}
                                                    >
                                                        <Tooltip placement="topRight" title="Загрузить картинку">
                                                            <Button className="btn-upload">
                                                                <UploadOutlined style={{ fontSize: 30 }} />
                                                            </Button>
                                                        </Tooltip>
                                                    </Upload>

                                                </Col>
                                                <Col span={22}>
                                                    <Input
                                                        className="input"
                                                        placeholder={activeChat?.messages?.length ? "Напишите сообщение" : "Напишите сообщение первым"}
                                                        size="large"
                                                        onChange={(e) => setMessageValue(e.target.value)}
                                                        value={messageValue}
                                                        onKeyPress={submitMessage}
                                                    />
                                                </Col>
                                            </Row>
                                        </div>
                                    </>
                                    // : <img src={ChatBack} alt="back img" className="fit-template"></img>
                                    : null
                            }
                            <>
                            </>

                        </Content>
                    </Layout>
                </Layout>
            </div>
            {
                isShowNewChatModal
                    ?
                    <SearchChatModal setIsShowNewChatModal={setIsShowNewChatModal} />
                    : null
            }
            <Modal
                visible={showImage.show}
                title={"Просмотр картинки"}
                footer={null}
                width={800}
                onCancel={() => onShowImage({ src: null, show: false })}
            >
                <img alt="Sent img" style={{ width: '100%' }} src={showImage.src} />
            </Modal>
            {/* <UploadImage /> */}
        </>
    )
}

const mapStateToProps = (state) => {
    const activeChatId = getActiveChatId(state)
    const chats = getChatsList(state);
    const activeChat = activeChatId && chats?.length ? chats.find(chat => chat.id === activeChatId) : null;
    const profile = getAuthProfile(state)
    return {
        chats,
        isSetActiveChat: !!activeChat,
        activeChat,
        activeChatId,
        profile,
        profileUid: profile && profile.uid ? profile.uid : null,
        profileChats: profile && profile.chats?.length ? profile.chats : null,
    };
};

const mapDispatchToProps = {
    setActiveChatId, setUpdateProfile, setUpdatedChatMessages, sendNewMessage
};

const PageChats = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Chats);

export { PageChats };