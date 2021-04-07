import { Tabs } from 'antd';
import { ActiveCall } from 'components/calls/active-call';
import { CallsHistory } from 'components/calls/calls-history';
import { SettingsDevices } from 'components/common';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getIsShowCallModal } from 'store/call/selectors';

const CallModal = (props) => {
    const {
        isShow,
    } = props;

    const [tab, setTab] = useState('1');

    return (
        <div className={`call-modal ${!isShow ? 'call-modal--transform' : ''}`}>
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
    }
};

const mapDispatchToProps = {};

const EnhancedCallModal = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(CallModal);

export { EnhancedCallModal };