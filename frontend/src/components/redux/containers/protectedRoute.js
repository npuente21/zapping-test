import {connect} from 'react-redux';
import ProtectedRoute from '../../protectedRoute';
import { getUserProfile } from '../reducers/user';

const mapDispatchToProps = {getUserProfile, }
const mapStateToProps = (state) => {
    return {
        error: state.user.error,
        loading: state.user.loading,
        userData: state.user.userData,
        authenticated: state.user.authenticated,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
