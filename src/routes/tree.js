import {
	PageHome,
	PageProfile,
	NotFound,
	PageChats,
	PageProfiles,
} from 'pages';

const routes = {
	'home': {
		path: '/',
		exact: true,
		page: PageHome,
		name: 'Home',
		link() {
			return this.path;
		},
		isNeedAuth: false,
	},
	'profile': {
		path: '/profile',
		page: PageProfile,
		name: 'profile',
		link() {
			return this.path;
		},
		exact: true,
		isNeedAuth: true,
	},
	'chats': {
		path: '/chats',
		page: PageChats,
		name: 'chats',
		link() {
			return this.path;
		},
		exact: true,
		isNeedAuth: true,
	},
	'profiles': {
		path: '/profile/:id',
		page: PageProfiles,
		name: 'profiles',
		link(id) {
			return this.path.replace(":id", id);
		},
		isNeedAuth: true,
	},
	'not-found': {
		path: "*",
		page: NotFound,
		isNeedAuth: false,
	}
};

const __ROOT_ROUTE__ = routes.home.link();

export { routes, __ROOT_ROUTE__ };
