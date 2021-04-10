import React, { useEffect } from 'react';
import { RoutesSwitch } from 'routes';
import 'antd/dist/antd.css';
import 'assets/styles/index.scss';
import { OfflineModal } from 'components/modals';
import notification from 'utils/notifications'
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationOnlineStatus } from 'store/notifications/selectors';
import { changeOnlineStatus } from 'store/notifications/actions';
import { CallModal } from 'components/modals';

const View = React.memo(() => {
	const statusOnline = useSelector(getNotificationOnlineStatus)
	const dispatch = useDispatch()

	useEffect(() => {
		const changeStatus = () => {
			dispatch(changeOnlineStatus(window.navigator.onLine))
		}

		window.addEventListener("offline", changeStatus)
		window.addEventListener("online", changeStatus)
		notification.init()
		return () => {
			window.removeEventListener("offline", changeStatus)
			window.removeEventListener("online", changeStatus)
		}
	}, [dispatch])

	return (
		<>
			{!statusOnline && <OfflineModal />}
			<CallModal />
			<RoutesSwitch />
		</>
	);
});

export { View };
