import { createStore, applyMiddleware, combineReducers } from 'redux';
import { withExtraArgument} from 'redux-thunk';
import {reducer as userReducer} from './reducers/user';
import {reducer as streamReducer} from './reducers/stream';

export default function _createStore(services) {
  return createStore(
    combineReducers({
      user: userReducer,
      stream: streamReducer,
    }),
    applyMiddleware(withExtraArgument({services})),
  );
}
