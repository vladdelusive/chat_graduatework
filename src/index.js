import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter as ConnectedRouterProvider } from 'connected-react-router';
import { Root } from 'components';
import { history } from 'routes/history';
import { store } from 'store';

const root = document.getElementById('root');
const render = (Component, root, done = () => { }) => {
	ReactDOM.render(
		<ReduxProvider store={store}>
			<ConnectedRouterProvider history={history}>
				<Component />
			</ConnectedRouterProvider>
		</ReduxProvider>,
		root,
		done,
	);
};

render(Root, root);