import React from 'react';
// import ReactLogo from 'assets/images/react-logo.svg';
import CollegeLogo from 'assets/images/college-logo.png';
import { Tag, Typography } from 'antd';

const { Title, Text } = Typography;

const View = () => {
	return (
		<div className={'page page--home'}>
			<img className={'react-logo'} src={CollegeLogo} alt="React Logo" />
			<Title>Дипломний проект - <Text code>Мессенджер</Text></Title>
			<Title level={2}>Розробив: <Text bold={"true"} style={{ fontWeight: 800 }}>Товсточуб Владислав</Text> - 481 група</Title>
			<Title level={3}>Технології, що використовуються (бібліотеки):</Title>
			<Title level={4}>
				<Tag color="magenta">ELECTRON</Tag>
				<Tag color="red">REACT</Tag>
				<Tag color="volcano">REDUX</Tag>
				<Tag color="orange">FIREBASE</Tag>
				<Tag color="gold">ANTD</Tag>
				<Tag color="green">AXIOS</Tag>
				<Tag color="cyan">REDUX-SAGA</Tag>
				<Tag color="blue">RESELECT</Tag>
				<Tag >та інші...</Tag>
			</Title>

		</div>
	);
};

export { View };
