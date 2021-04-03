import './style.scss';
import React, { useState } from 'react';
import { Button, Col, Modal } from 'antd';
import { GoogleOutlined, LoginOutlined } from '@ant-design/icons';
import { AuthForm } from 'components/forms'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { fetchLogInByGoogle } from 'store/auth/actions';

const HeaderView = ({ fetchLogInByGoogle }) => {
	const [showModal, setShowModal] = useState()
	return (
		<>
			<Col>
				<Button
					type={'link'}
					icon={<LoginOutlined />}
					onClick={() => setShowModal(true)}
					style={{ fontSize: 16 }}
				>
					Войти
				</Button>
			</Col>
			<Modal
				visible={showModal}
				title={
					<Button
						style={{ display: "flex", alignItems: "center" }}
						onClick={() => {
							fetchLogInByGoogle()
							setShowModal(false)
						}}
						icon={<GoogleOutlined style={{ color: "#00a7b7", fontSize: 24 }} />}
						type="link"
					>Зайти через Google</Button>}
				onCancel={() => setShowModal(false)}
				footer={false}
			>
				<AuthForm />
			</Modal>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
	};
};

const mapDispatchToProps = {
	fetchLogInByGoogle,
};

const View = compose(
	connect(mapStateToProps, mapDispatchToProps),
)(HeaderView);

export { View };
