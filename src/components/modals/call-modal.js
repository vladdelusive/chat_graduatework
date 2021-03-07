import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getIsShowCallModal } from 'store/call/selectors';

const CallModal = (props) => {
    const {
        isShow,
    } = props;
    return isShow ? (
        <div className={`call-modal`}>
            <div className="call-modal__container"></div>
        </div>
    ) : null;
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