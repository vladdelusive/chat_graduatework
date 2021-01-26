import { call, put, select, takeEvery } from 'redux-saga/effects';
import * as chats from './types';
import { api } from 'services';
import { saveChats, saveUsersForChat } from './actions';
import { getAuthProfileUid } from 'store/auth/selectors';
import { getChatsList } from './selectors';
import { parseChatsList, parseNewMessage } from 'services/api/parse';
import { noty } from 'utils';
import React from 'react';

function* createNewChatSaga(action) {
    try {
        const { payload } = action;
        const { chatWithUserUid, callback } = payload;
        const userUid = yield select(getAuthProfileUid)
        const chat = {
            messages: [],
            users: [userUid, chatWithUserUid]
        }
        const newChatId = yield call(api.chats.createNewChat, chat);
        if (typeof callback === "function") {
            callback(newChatId)
        }
    } catch (error) {
        console.warn(error);
    }
}

function* fetchUsersForChatSaga() {
    try {
        const response = yield call(api.chats.fetchProfiles);
        if (!response) return;
        const userUid = yield select(getAuthProfileUid)
        const chats = yield select(getChatsList)
        const profiles = response.filter(profile => profile.id !== userUid && !chats.find(chat => chat.userInfo.uid === profile.id))
        yield put(saveUsersForChat(profiles))
    } catch (error) {
        console.warn(error);
    }
}

function* setUpdateChatMessageSaga(action) {
    try {
        const { payload } = action;
        const { chatUid, data } = payload;

        const chats = yield select(getChatsList)
        const updatedChats = [...chats].map(chat => {
            if (chat.id === chatUid) return { ...chat, messages: data.messages }
            return chat
        })
        const userUid = yield select(getAuthProfileUid)
        const parsedUpdatedChats = parseChatsList(updatedChats, userUid)

        const updatedMessagesChatBefore = chats.find(e => e["id"] === chatUid)
        const updatedMessagesChatAfter = parsedUpdatedChats.find(e => e["id"] === chatUid)
        if (updatedMessagesChatBefore?.messages?.length < updatedMessagesChatAfter?.messages?.length) {
            const newMessage = updatedMessagesChatAfter.messages[updatedMessagesChatAfter.messages.length - 1];
            if (!newMessage.me) {
                noty("icon", (`${newMessage.isImage
                    ? "Отправлена картинка"
                    : `${newMessage.message.length > 20 ? `${newMessage.message.slice(0, 15)}...` : newMessage.message}`}`),
                    (<div>Новое сообщение от <b>{updatedMessagesChatAfter.userInfo.name}</b></div>),
                    { placement: "bottomRight", icon: <img alt="userImage" src={updatedMessagesChatAfter.userInfo.photo} />, className: "message-noty" },
                )
            }
        }

        yield put(saveChats(parsedUpdatedChats))
    } catch (error) {
        console.log(error);
    }
}

function* sendMessageSaga(action) {
    try {
        const { payload } = action;
        const { chatUid, message, isImage } = payload;
        const profileUid = yield select(getAuthProfileUid)
        const preparedNewMessage = parseNewMessage({ uid: profileUid, message, isImage })
        yield call(api.chats.sendMessage, { chatUid, message: preparedNewMessage })
    } catch (error) {
        console.log(error);
    }
}

export function* chatsSaga() {
    yield takeEvery(chats.CREATE_NEW_CHAT, createNewChatSaga);
    yield takeEvery(chats.FETCH_USERS_FOR_CHAT, fetchUsersForChatSaga);
    yield takeEvery(chats.SET_UPDATED_CHAT_MESSAGES, setUpdateChatMessageSaga);
    yield takeEvery(chats.SEND_MESSAGE, sendMessageSaga);
}
