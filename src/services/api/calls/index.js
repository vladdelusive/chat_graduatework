import { db } from 'db'
import firebase from 'firebase'
import 'firebase'

window.db = db;
export const calls = {
    subscribeToProfileCalls: (callUid, onSubsribe) => {
		return db
			.collection('calls')
			.doc(callUid)
			.onSnapshot(snapshot => onSubsribe({ callUid, data: snapshot.data() }))
	},
};
