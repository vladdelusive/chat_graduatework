import React from 'react'
import ToChats from 'assets/images/to-chats.png';
import { Button } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getChatsList } from 'store/chats/selectors';
import { createNewChat, setActiveChatId } from 'store/chats/actions';
import { push } from 'connected-react-router';
import { routes } from 'routes';

const OpenChatBtn = React.memo((props) => {
    const { text = "Відкрити чат", userId, chatList, createNewChat, push, setActiveChatId } = props;
    const openChat = () => {
        if (userId) {
            const userInFriends = chatList.find(({ userInfo }) => userInfo.uid === userId)
            if (userInFriends) {
                push(routes.chats.link())
                setActiveChatId(userInFriends.id)
            } else {
                createNewChat({
                    chatWithUserUid: userId, callback: (chatId) => {
                        push(routes.chats.link())
                        setActiveChatId(chatId)
                    }
                })
            }
        }
    }
    return <Button onClick={openChat} className="to-chats-btn" icon={<img src={ToChats} alt={'to-chat'} />}>{text}</Button>
})


const mapStateToProps = (state, props) => {
    return {
        chatList: getChatsList(state)
    }
};

const mapDispatchToProps = { createNewChat, setActiveChatId, push };

const OpenChatButton = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(OpenChatBtn);

export { OpenChatButton };

