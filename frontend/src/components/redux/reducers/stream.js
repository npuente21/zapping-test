import { createReducer } from './utils';
import { LOADING_STREAM, SUCCESS_STREAM, ERROR_STREAM } from './constants';

const defaultState = {
    streamData: {},
    error: null,
    loading: false,
};

//reducer

export const reducer = createReducer(defaultState, {
    [LOADING_STREAM]: handleLoadingStream,
    [SUCCESS_STREAM]: handleSuccessStream,
    [ERROR_STREAM]: handleErrorStream,
});

function handleLoadingStream (state, action) {
    return {
        ...state,
        loading: true,
    };
};

function handleSuccessStream (state, { payload }) {
    return {
        ...state,
        loading: false,
        streamData: payload,
    };
};

function handleErrorStream (state, { payload }) {
    return {
        ...state,
        loading: false,
        error: payload,
    };
};

export function getStreamData(id){
    return async (dispatch, _, { services: {streamService} }) => {
        dispatch({ type: LOADING_STREAM });
        try{
            const response = await streamService.getStreamData(id);
            dispatch({ type: SUCCESS_STREAM, payload: response });
        }catch(error){
            dispatch({ type: ERROR_STREAM, payload: error.message });
        }
    };
}
