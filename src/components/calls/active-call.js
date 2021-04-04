import { CurrentCall, IncomingCall, OutgoingCall } from 'components/cards/calls';
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';

const ActiveCallContainer = (props) => {
    const { activeCall } = props;
    // const { } = activeCall;
    // return <OutgoingCall />
    return <CurrentCall />
}

const mapStateToProps = (state) => {
    return {
        activeCall: false
    }
};

const mapDispatchToProps = {};

const ActiveCall = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ActiveCallContainer);

export { ActiveCall };