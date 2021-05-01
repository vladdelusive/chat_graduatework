import './style.scss';
import { compose } from 'redux';
import React from 'react';
import { connect } from 'react-redux';
import { View } from './view';
import { getAuthIsAuthenticated } from 'store/auth/selectors';
import { NavBar } from '../navbar';
import { Button, Col, Row } from 'antd';
import { Logo } from '../logo';
import { Profile } from '../profile';
import { WhatsAppOutlined } from '@ant-design/icons';
import { toggleIsShowCallModal } from 'store/call/actions';
import { getCallStateType } from 'store/call/selectors';

const CallBtn = (toggleIsShowCallModal, isActiveCallStatus) => (
	<Col>
		<Button
			type={'link'}
			onClick={toggleIsShowCallModal}
		>
			<WhatsAppOutlined className={isActiveCallStatus ? "ant-icon--call-active" : "ant-icon--call-unactive"} size={6} />
		</Button>
	</Col>
)

const HeaderContainer = (props) => {
	const { isAuth, toggleIsShowCallModal, isActiveCallStatus } = props;

	const correctNavbar = isAuth ? <Profile /> : <View isAuth={isAuth} />

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
					{isAuth ? CallBtn(toggleIsShowCallModal, isActiveCallStatus) : null}
					{correctNavbar}
				</Row>
			</Col>
		</Row>
	</div>
}

const mapStateToProps = (state) => {
	// const auth = window.localStorage.getItem("auth")
	return {
		isAuth: getAuthIsAuthenticated(state),
		isActiveCallStatus: !!getCallStateType(state)
	};
};

const mapDispatchToProps = {
	toggleIsShowCallModal
};

const Header = compose(
	connect(mapStateToProps, mapDispatchToProps),
)(HeaderContainer);

export { Header };
