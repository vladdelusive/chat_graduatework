import { compose } from 'redux';
import { connect } from 'react-redux';
import { View } from './view';
import { getAuthIsAuthenticated } from 'store/auth/selectors';

const mapStateToProps = (state) => {
	return { 
		isAuth: getAuthIsAuthenticated(state)
	};
};

const mapDispatchToProps = null;

const NavBar = compose(
	connect(mapStateToProps, mapDispatchToProps),
)(View);

export { NavBar };
