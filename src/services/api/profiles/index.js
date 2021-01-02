import { db } from 'db';

export const profiles = {
	fetchProfileId: async (payload) => {
		return (await db.doc(`profiles/${payload}`).get()).data()
	},
};
