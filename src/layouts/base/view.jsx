import './style.scss';
import React, { useMemo } from 'react';
import { Layout } from 'antd';
import { APP_NAME, CREATER_GITHUB, CREATER_NICKNAME } from 'constants/env';
import { Header } from 'components';
import { style } from './style';

const View = React.memo((props) => {
	const { children } = props;

	const currentYear = useMemo(() => new Date().getFullYear(), []);

	return (
		<Layout className={'layout layout--base'}>
			<Layout.Header className={'layout__header'}><Header /></Layout.Header>
			<Layout.Content className={'layout__content'} style={style.content}>{children}</Layout.Content>
			<Layout.Footer className={'layout__footer'}>
				{currentYear} &copy; {APP_NAME}&nbsp;-&nbsp;
				<a href={CREATER_GITHUB} target="_blank" rel="noopener noreferrer">{CREATER_NICKNAME}</a>
			</Layout.Footer>
		</Layout>
	);
});

export { View };
