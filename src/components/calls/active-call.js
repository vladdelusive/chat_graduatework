import { Col, Row } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import { compose } from 'redux';

const ActiveCallContainer = (props) => {
    // const { activeCall } = props;
    // const { } = activeCall;
    return (
        <Row>
            <Col>
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = {};

const ActiveCall = compose(
    connect(mapStateToProps, mapDispatchToProps),
)(ActiveCallContainer);

export { ActiveCall };