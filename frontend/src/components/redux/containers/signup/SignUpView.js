import {connect} from 'react-redux';
import SignUpView from '../../../../components/signUp/signUpView';
import { createUser } from '../../reducers/user';

const mapDispatchToProps = {createUser, }
const mapStateToProps = (state) => {
    return {
        error: state.user.errorCreateUser,
        loading: state.user.loadingCreateUser,
        userData: state.user.userData,
        createdUser: state.user.createdUser,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
