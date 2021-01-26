import { db } from 'db'
import firebase from 'firebase'
import 'firebase'

export const chats = {
    fetchChats: async () => {
        return db.collection('chats').get().then(snapshot => {
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        })
    },
    fetchProfiles: async () => {
        return db.collection('profiles').get().then(snapshot => {
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        })
    },
    createNewChat: async (payload) => {
        let chatId = null;
        await db.collection('chats').add(payload).then((docRef) => {
            chatId = docRef.id;
            payload.users.forEach((user) => {
                return db.collection(`profiles`).doc(user).update({
                    chats: firebase.firestore.FieldValue.arrayUnion(docRef.id)
                })
            })
        })
        return chatId;
    },
    sendMessage: async (payload) => {
        const { chatUid, message } = payload;
        return db.collection(`chats`).doc(chatUid).update({
            messages: firebase.firestore.FieldValue.arrayUnion(message)
        })
    },
};
