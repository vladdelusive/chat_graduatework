import { history } from 'routes/history';

export const redirect = (link, replace = false) => {
	if (replace) {
		history.replace(link);
	}
	history.push(link);
};
