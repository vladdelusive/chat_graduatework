// import { http } from 'services';
// import { parseContactsList } from '../parse';
import { createStorageRef, db } from 'db'
import firebase from 'firebase'
import 'firebase'
import { noty } from 'utils/noty'
import { parseChatsList } from '../parse'
import { generateUid } from 'utils/uid-generator'

const createUserProfile = (profile) => db.collection("profiles").doc(profile.uid).set(profile)

export const auth = {

	subscribeToProfileChats: (uid, onSubsribe) => {
		return db
			.collection('profiles')
			.doc(uid)
			.onSnapshot(snapshot => onSubsribe(snapshot.data()))
	},

	subscribeToChatsMessages: (chatUid, onSubsribe) => {
		return db
			.collection('chats')
			.doc(chatUid)
			.onSnapshot(snapshot => onSubsribe({ chatUid, data: snapshot.data() }))
	},

	preparedUpdatedProfileData: async (profile) => {
		try {
			const chatsWithRefs = await Promise.all(profile.chats.map(chatUid => db.doc(`chats/${chatUid}`).get()))
			const chats = await Promise.all(chatsWithRefs.map(e => e.data()))
			const usersInfoRefs = await Promise.all(chats.map(({ users }) => {
				const chatWithPersonUid = users.find(userUid => profile.uid !== userUid)
				return db.doc(`profiles/${chatWithPersonUid}`).get()
			}))
			const usersInfo = await Promise.all(usersInfoRefs.map(e => e.data()))

			const preparedChats = chats.reduce((acc, chat, index) => {
				const userValues = usersInfo[index];
				const chatId = profile.chats[index];
				return [...acc, { userInfo: { name: userValues.name, photo: userValues.photo, email: userValues.email, uid: userValues.uid }, id: chatId, ...chat }]
			}, [])

			return { profile: profile, chats: parseChatsList(preparedChats, profile.uid) }
		} catch (e) {
			return Promise.reject(e)
		}
	},

	googleLogin: () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		return firebase.auth().signInWithPopup(provider).then(async (result) => {
			const profile = {}
			profile.name = result.additionalUserInfo.profile.name;
			profile.email = result.additionalUserInfo.profile.email;
			profile.photo = result.additionalUserInfo.profile.picture;
			profile.uid = result.user.uid;
			if (result.additionalUserInfo.isNewUser) {
				createUserProfile({ ...profile, chats: [] })
				return { profile, chats: [] }
			} else {
				const existedProfile = (await db.doc(`profiles/${profile.uid}`).get()).data()
				const data = await auth.preparedUpdatedProfileData(existedProfile)
				return data
			}
		}).catch((error) => {
			if (error.message) {
				noty('error', error.message);
			}
			return Promise.reject(error)
		});
	},

	registerByMailAndPassword: async (payload) => {
		const { email, password, photo, name } = payload;
		try {
			const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
			const fileNamePath = generateUid() + photo.name;
			const photoUrl = await createStorageRef(photo, fileNamePath);
			const profile = {
				name,
				email,
				photo: photoUrl,
				uid: user.uid,
				chats: []
			}
			createUserProfile(profile)
			return profile
		} catch (error) {
			if (error.message) {
				noty('error', error.message);
			}
			return Promise.reject(error)
		}
	},

	logInByMailAndPassword: async (payload) => {
		const { email, password } = payload
		try {
			const { user: { uid } } = await firebase.auth().signInWithEmailAndPassword(email, password);
			const existedProfile = (await db.doc(`profiles/${uid}`).get()).data()
			const data = await auth.preparedUpdatedProfileData(existedProfile)
			return data
		} catch (error) {
			if (error.message) {
				noty('error', error.message);
			}
			return Promise.reject(error)
		}
	}
};
