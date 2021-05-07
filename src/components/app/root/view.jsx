import React, { useEffect } from 'react';
import { RoutesSwitch } from 'routes';
import 'antd/dist/antd.css';
import 'assets/styles/index.scss';
import 'webrtc-adapter'
import { OfflineModal } from 'components/modals';
// import notification from 'utils/notifications'
import { useDispatch, useSelector } from 'react-redux';
import { getNotificationOnlineStatus } from 'store/notifications/selectors';
import { changeOnlineStatus } from 'store/notifications/actions';
import { CallModal } from 'components/modals';
import { getAuthIsAuthenticated, getAuthProfileUid } from 'store/auth/selectors';
import { clearAuth } from 'store/auth/actions';

const View = React.memo(() => {
	const statusOnline = useSelector(getNotificationOnlineStatus)
	const isAuth = useSelector(getAuthIsAuthenticated)
	const uid = useSelector(getAuthProfileUid)
	const dispatch = useDispatch()

	useEffect(() => {
		const changeStatus = () => {
			dispatch(changeOnlineStatus(window.navigator.onLine))
		}
		const changeToOffline = () => {
			if (uid) {
				dispatch(clearAuth(uid))
			}
		}

		window.addEventListener("offline", changeStatus)
		window.addEventListener("online", changeStatus)
		window.addEventListener("beforeunload", changeToOffline)
		// notification.init()
		return () => {
			window.removeEventListener("offline", changeStatus)
			window.removeEventListener("online", changeStatus)
			window.removeEventListener("beforeunload", changeToOffline)
		}
	}, [dispatch, uid])

	return (
		<>
			{!statusOnline && <OfflineModal />}
			{isAuth && <CallModal />}
			<RoutesSwitch />
		</>
	);
});

export { View };
