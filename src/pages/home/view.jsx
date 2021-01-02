import React from 'react';
import ReactLogo from 'assets/images/react-logo.svg';
import { Tag, Typography } from 'antd';

const { Title, Text } = Typography;

const View = () => {
	return (
		<div className={'page page--home'}>
			<img className={'react-logo'} src={ReactLogo} alt="React Logo" />
			<Title>Курсовая работа - <Text code>Мессенджер</Text></Title>
			<Title level={2}>Разработал: <Text bold={"true"} style={{ fontWeight: 800 }}>Товсточуб Владислав</Text> - 481 группа</Title>
			<Title level={3}>Используемые технологии (библиотеки):</Title>
			<Title level={4}>
				<Tag color="magenta">ELECTRON</Tag>
				<Tag color="red">REACT</Tag>
				<Tag color="volcano">REDUX</Tag>
				<Tag color="orange">FIREBASE</Tag>
				<Tag color="gold">ANTD</Tag>
				<Tag color="green">AXIOS</Tag>
				<Tag color="cyan">REDUX-SAGA</Tag>
				<Tag color="blue">RESELECT</Tag>
				<Tag >и остальные...</Tag>
			</Title>

		</div>
	);
};

export { View };
