import {connect} from 'react-redux';
import HomeView from '../../../home/homeView';
import { getStreamData } from '../../reducers/stream';

const mapDispatchToProps = {getStreamData, }
const mapStateToProps = (state) => {
    return {
        error: state.user.errorProfile,
        loading: state.user.loadingProfile,
        userData: state.user.userData,
        createdUser: state.user.createdUser,
        errorGetStream: state.stream.error,
        loadingGetStream: state.stream.loading,
        streamData: state.stream.streamData,

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
