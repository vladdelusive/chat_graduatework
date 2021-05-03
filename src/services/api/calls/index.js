import { db } from 'db'
import 'firebase'
import firebase from 'firebase'

window.db = db;
export const calls = {
	subscribeToProfileCalls: (profileUid, onSubsribe) => {
		return db
			.collection('profiles')
			.doc(`${profileUid}/calls/${profileUid}`)
			.onSnapshot(snapshot => onSubsribe({ data: snapshot.data() }))
	},

	createOffer: ({ myUid, outgoing, userUid, incoming }) => {
		db.collection('profiles').doc(`${myUid}/calls/${myUid}`).update({
			outgoing
		})

		db.collection('profiles').doc(`${userUid}/calls/${userUid}`).update({
			incoming
		});
	},

	cancelCall: ({ myUid, userUid, myState, userState }) => {
		db.collection('profiles').doc(`${myUid}/calls/${myUid}`).update({
			...myState
		})

		db.collection('profiles').doc(`${userUid}/calls/${userUid}`).update({
			...userState
		});
	},

	answerCall: ({ myUid, userUid, myState, userState }) => {
		db.collection('profiles').doc(`${myUid}/calls/${myUid}`).update({
			...myState
		})

		db.collection('profiles').doc(`${userUid}/calls/${userUid}`).update({
			...userState
		});
	},

	updateCallCandidates: ({ userUid, userCandidatesState }) => {
		db.collection('profiles').doc(`${userUid}/calls/${userUid}`).set({ ...userCandidatesState }, { merge: true });
	},

	addHistoryCall: ({ myUid, userUid, myState, userState }) => {
		db.collection('profiles').doc(`${myUid}/calls/${myUid}`).update({
			history: firebase.firestore.FieldValue.arrayUnion(myState)
		})

		db.collection('profiles').doc(`${userUid}/calls/${userUid}`).update({
			history: firebase.firestore.FieldValue.arrayUnion(userState)
		})
	},
};
