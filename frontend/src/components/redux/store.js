import { createStore, applyMiddleware, combineReducers } from 'redux';
import { withExtraArgument} from 'redux-thunk';
import {reducer as userReducer} from './reducers/user';

export default function _createStore(services) {
  return createStore(
    combineReducers({
      user: userReducer,
    }),
    applyMiddleware(withExtraArgument({services})),
  );
}
