import './style.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes';
import Logo from 'assets/images/logo.png';

const View = React.memo(() => {
	return (
		<NavLink to={routes['home'].link()} className={'logo'} activeClassName={'is-active'} exact={true}>
			<img className={'logo__img'} src={Logo} alt={'chat_logo'} />
		</NavLink>
	);
});

export { View };
