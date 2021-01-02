import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAuthIsAuthenticated } from 'store/auth/selectors';

import { View } from './view';

function ViewContainer({ isAuth }) {
    return <View isAuth={isAuth} />
}

const mapStateToProps = (state) => {
    return {
        isAuth: getAuthIsAuthenticated(state),
    }
};

const mapDispatchToProps = null;

const Switch = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ViewContainer);

export { Switch };