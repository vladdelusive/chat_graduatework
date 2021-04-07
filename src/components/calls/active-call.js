import { CurrentCall, IncomingCall, OutgoingCall } from 'components/cards/calls';
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getCallStateType } from 'store/call/selectors';
import { NoCalls } from './no-calls';

const ActiveCallContainer = (props) => {
    const { type } = props;
    switch (type) {
        case "offer":
            return <IncomingCall />

        case "answer":
            return <OutgoingCall />

        case "active":
            return <CurrentCall />

        default:
            return <NoCalls />
    }
}

const mapStateToProps = (state) => {
    return {
        type: getCallStateType(state),
    }
};

const mapDispatchToProps = {};

const ActiveCall = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ActiveCallContainer);

export { ActiveCall };