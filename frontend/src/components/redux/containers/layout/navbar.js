import {connect} from 'react-redux';
import Navbar from '../../../layout/navbar';
import { logout } from '../../reducers/user';

const mapDispatchToProps = {logout,}
const mapStateToProps = (state) => {
    return {
        error: state.user.error,
        loading: state.user.loading,
        userData: state.user.userData,
        authenticated: state.user.authenticated,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
