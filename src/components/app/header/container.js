import './style.scss';
import { compose } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { View } from './view';
import { getAuthIsAuthenticated } from 'store/auth/selectors';
import { fetchLogInByGoogle } from 'store/auth/actions';
import { NavBar } from '../navbar';
import { Col, Row } from 'antd';
import { Logo } from '../logo';
import { Profile } from '../profile';

const HeaderContainer = (props) => {
	const { isAuth, fetchLogInByGoogle } = props;

	const correctNavbar = isAuth ? <Profile /> : <View logInByGoogle={fetchLogInByGoogle} />

	return <div className={'header'}>
		<Row type={'flex'} gutter={36} align={'middle'}>
			<Col>
				<Logo />
			</Col>
			<Col className={'_flex-grow'}>
				<Row type={'flex'} gutter={16} align={'middle'}>
					<Col className={'_flex-grow'}>
						<NavBar />
					</Col>
					{correctNavbar}
				</Row>
			</Col>
		</Row>
	</div>
}

const mapStateToProps = (state) => {
	// const auth = window.localStorage.getItem("auth")
	return {
		isAuth: getAuthIsAuthenticated(state)
	};
};

const mapDispatchToProps = {
	fetchLogInByGoogle,
};

const Header = compose(
	connect(mapStateToProps, mapDispatchToProps),
)(HeaderContainer);

export { Header };
