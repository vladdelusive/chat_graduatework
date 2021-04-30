import './style.scss';
import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes';

const View = ({ isAuth }) => {
	const navbarRoutes = useMemo(() => [
		{ name: 'Головна', key: 'home', inAuth: false },
		{ name: 'Чати', key: 'chats', inAuth: true },
	], []);

	const bars = []
	navbarRoutes.forEach((route) => {
		if (route.inAuth === isAuth || !route.inAuth) {
			bars.push(<li key={route.key} className={'navbar__item'}>
				<NavLink to={routes[route.key].link()} className={'navbar__link'}>{route.name}</NavLink>
			</li>)
		}
	})
	return (
		<div className={'navbar'}>
			<ul className={'navbar__list'}>
				{bars}
			</ul>
		</div>
	);
};

export { View };
