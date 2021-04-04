// import React from 'react'
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { ActiveCall } from './active-call';
// import { CallsHistory } from './calls-history';

// const CallsContainer = (props) => {
//     const { isActiveCall } = props;
//     return isActiveCall
//         ? <ActiveCall />
//         : <CallsHistory />
// }

// const mapStateToProps = (state) => {
//     return {
//         isActiveCall: false
//     }
// };

// const mapDispatchToProps = {};

// const Calls = compose(
//     connect(mapStateToProps, mapDispatchToProps),
// )(CallsContainer);

// export { Calls };