import {connect} from 'react-redux';
import LoginView from '../../../login/loginView.js';
import { login } from '../../reducers/user';

const mapDispatchToProps = {login, }
const mapStateToProps = (state) => {
    return {
        error: state.user.error,
        loading: state.user.loading,
        userData: state.user.userData,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
