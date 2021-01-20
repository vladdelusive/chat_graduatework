export const parseChatsList = (chats, userUid) => {
    const chatsList = chats.map((chat) => {
        const { messages } = chat;
        const filteredMessages = messages.map(m => {
            return { ...m, me: userUid === m.from, timestamp: parseInt(m.timestamp) }
        })
        return { ...chat, messages: filteredMessages, }
    })
    return chatsList
}