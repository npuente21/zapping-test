import {connect} from 'react-redux';
import HomeView from '../../../home/homeView';


const mapDispatchToProps = {}
const mapStateToProps = (state) => {
    return {
        error: state.user.error,
        loading: state.user.loading,
        userData: state.user.userData,
        createdUser: state.user.createdUser,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
