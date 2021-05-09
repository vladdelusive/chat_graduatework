import { db } from 'db';

export const profiles = {
	fetchProfileId: async (payload) => {
		return (await db.doc(`profiles/${payload}`).get()).data()
	},
	subscribeToProfile: (profileUid, onSubsribe) => {
		return db
			.collection('profiles')
			.doc(profileUid)
			.onSnapshot(snapshot => onSubsribe({ data: snapshot.data() }))
	},
};
