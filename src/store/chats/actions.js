import * as chats from './types';

export const createNewChat = (payload) => ({ type: chats.CREATE_NEW_CHAT, payload });

export const saveChats = (payload) => ({ type: chats.SAVE_CHATS, payload });

export const setActiveChatId = (payload) => ({ type: chats.SET_ACTIVE_CHAT_ID, payload });

export const fetchUsersForChat = () => ({ type: chats.FETCH_USERS_FOR_CHAT });
export const saveUsersForChat = (payload) => ({ type: chats.SAVE_USERS_FOR_CHAT, payload });

export const setUpdatedChatMessages = (payload) => ({ type: chats.SET_UPDATED_CHAT_MESSAGES, payload });

export const sendNewMessage = (payload) => ({ type: chats.SEND_MESSAGE, payload });

export const toggleCollapseSiderChat = () => ({ type: chats.TOGGLE_COLLAPSE_SIDER_CHAT });

export const onSnapshotUpdatedChatProfile = (payload) => ({ type: chats.ON_SNAPSHOT_UPDATED_CHAT_PROFILE, payload });



