import { connect } from 'react-redux';
import AppHeader from './AppHeader';
import { UserSignIn_logOut } from '../../redux/actions/UserSignIn/UserSignInActions';

const mapStateToProps = state => ({
  googleUser: state.UserSignInReducer.googleUser
});

const mapDispatchToProps = dispatch => ({
  UserSignIn_logOut: () => {
    dispatch(UserSignIn_logOut());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader);
