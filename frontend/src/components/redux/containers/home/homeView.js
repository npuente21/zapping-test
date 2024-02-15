import {connect} from 'react-redux';
import HomeView from '../../../home/homeView';


const mapDispatchToProps = {}
const mapStateToProps = (state) => {
    return {
        error: state.user.errorProfile,
        loading: state.user.loadingProfile,
        userData: state.user.userData,
        createdUser: state.user.createdUser,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
