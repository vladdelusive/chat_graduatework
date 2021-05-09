import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Layout } from 'antd';
import { api } from 'services';
import 'moment/locale/uk'
import { HeaderChats, MessagesChats, SiderListChats, InputChats } from 'components/chats';
import { setUpdateProfile } from 'store/auth/actions';
import { getAuthProfile } from 'store/auth/selectors';
import { onSnapshotUpdatedChatProfile, setActiveChatId, setUpdatedChatMessages } from 'store/chats/actions';
import { getActiveChatId, getChatsList, getIsCollapsedSider } from 'store/chats/selectors';
import { getChatProfilesUidsList } from 'store/profiles/selectors';

const { Content } = Layout;

function Chats(props) {
    const {
        chats,
        activeChatId,
        isSetActiveChat,
        activeChat,
        setUpdateProfile,
        profileUid,
        profileChats,
        setUpdatedChatMessages,
        onSnapshotUpdatedChatProfile,
        chatProfilesUids,
    } = props;

    const [searchValue, setSearchValue] = useState("")
    const [messageValue, setMessageValue] = useState("")

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
        let unsubscribeToProfiles;
        if (chatProfilesUids) {
            unsubscribeToProfiles = chatProfilesUids.map((uid) => api.profiles.subscribeToProfile(uid, onSnapshotUpdatedChatProfile))
        }
        return () => {
            if (typeof unsubscribeToProfiles === "object") {
                unsubscribeToProfiles.forEach(unsub => unsub())
            }
        }
    }, [chatProfilesUids, onSnapshotUpdatedChatProfile])


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

    // useEffect(() => {
    //     return () => setActiveChatId(null)
    // }, [setActiveChatId])

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
        <div className="page page--chats">
            <HeaderChats
                isSetActiveChat={isSetActiveChat}
                activeChat={activeChat}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
            />
            <Layout className="chats-list">
                <SiderListChats searchValue={searchValue} />
                <Layout className="chat-content">
                    <Content>
                        {
                            isSetActiveChat ?
                                <>
                                    <div className="messages-container">
                                        <MessagesChats
                                            activeChat={activeChat}
                                        />
                                    </div>
                                    <div className="input-container">
                                        <InputChats
                                            messageValue={messageValue}
                                            setMessageValue={setMessageValue}
                                            activeChat={activeChat}
                                        />
                                    </div>
                                </>
                                // : <img src={ChatBack} alt="back img" className="fit-template"></img>
                                : <div className="chat_info">Будь ласка, виберіть чат, щоб почати обмін повідомленнями</div>
                        }
                    </Content>
                </Layout>
            </Layout>
        </div>
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
        profileUid: profile && profile.uid ? profile.uid : null,
        profileChats: profile && profile.chats?.length ? profile.chats : null,
        isCollapsed: getIsCollapsedSider(state),
        chatProfilesUids: getChatProfilesUidsList(state)
    };
};

const mapDispatchToProps = {
    setActiveChatId, setUpdateProfile, setUpdatedChatMessages, onSnapshotUpdatedChatProfile
};

const PageChats = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(Chats);

export { PageChats };