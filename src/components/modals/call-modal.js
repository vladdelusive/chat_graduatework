import { Tabs } from 'antd';
import { ActiveCall } from 'components/calls/active-call';
import { CallsHistory } from 'components/calls/calls-history';
import { SettingsDevices } from 'components/common';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { api } from 'services';
import { getAccessToAudio } from 'store/call/sagas';
import { getIsShowCallModal } from 'store/call/selectors';
import { onSnapshotCallUpdate } from 'store/call/actions';
import { registerPeerConnectionForOffers } from 'utils/webrtc';

const CallModal = (props) => {
    const {
        isShow,
        profileCalls,
        onSnapshotCallUpdate
    } = props;

    const [tab, setTab] = useState('1');

    useEffect(() => {
        getAccessToAudio()
        registerPeerConnectionForOffers()
    }, [])

    useEffect(() => {
        let unsubscribeCallsArray;
        if (profileCalls) {
            unsubscribeCallsArray = profileCalls.map(call => api.calls.subscribeToProfileCalls(call, onSnapshotCallUpdate))
        }
        return () => {
            if (typeof unsubscribeChatsMessagesArray === "object" && profileCalls) {
                unsubscribeCallsArray.forEach(unsub => unsub())
            }
        }
    }, [profileCalls, onSnapshotCallUpdate])

    return (
        <div className={`call-modal ${isShow ? 'call-modal--transform' : ''}`}>
            <div className="call-modal__container">
                <Tabs animated activeKey={tab || 1} onChange={setTab} centered>
                    <Tabs.TabPane key={'1'} tab={'Звонки'}>
                        <ActiveCall />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'2'} tab={'История'}>
                        <CallsHistory />
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'3'} tab={'Настройки'}>
                        <SettingsDevices />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isShow: getIsShowCallModal(state),
        profileCalls: []
    }
};

const mapDispatchToProps = { onSnapshotCallUpdate };

const EnhancedCallModal = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(CallModal);

export { EnhancedCallModal };