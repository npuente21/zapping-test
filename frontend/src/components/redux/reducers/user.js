import { createReducer } from './utils';
import { LOADING_LOGIN_USER, SUCCESS_LOGIN_USER, ERROR_LOGIN_USER, 
        LOADING_LOGOUT_USER, SUCCESS_LOGOUT_USER, ERROR_LOGOUT_USER,
        LOADING_CREATE_USER, SUCCESS_CREATE_USER, ERROR_CREATE_USER } from './constants';

const defaultState = {
    userData: {},
    error: null,
    loading: false,
    createdUser: false,
};

//reducer
export const reducer = createReducer(defaultState, {
    [LOADING_LOGIN_USER]: handleLoadingLoginUser,
    [SUCCESS_LOGIN_USER]: handleSuccessLoginUser,
    [ERROR_LOGIN_USER]: handleErrorLoginUser,
    [LOADING_LOGOUT_USER]: handleLoadingLogoutUser,
    [SUCCESS_LOGOUT_USER]: handleSuccessLogoutUser,
    [ERROR_LOGOUT_USER]: handleErrorLogoutUser,
    [LOADING_CREATE_USER]: handleLoadingCreateUser,
    [SUCCESS_CREATE_USER]: handleSuccessCreateUser,
    [ERROR_CREATE_USER]: handleErrorCreateUser,
});

//actions

function handleLoadingLoginUser(state, action) {
    return {
        ...state,
        loading: true,
    };
}

function handleSuccessLoginUser(state, { payload }) {
    return {
        ...state,
        loading: false,
        userData: payload,
    };
}

function handleErrorLoginUser(state, { payload }) {
    return {
        ...state,
        loading: false,
        error: payload,
    };
}

function handleLoadingLogoutUser(state, action) {
    return {
        ...state,
        loading: true,
    };
}

function handleSuccessLogoutUser(state, { payload }) {
    return {
        ...state,
        loading: false,
        userData: {},
    };
}

function handleErrorLogoutUser(state, { payload }) {
    return {
        ...state,
        loading: false,
        error: payload,
    };

}

function handleLoadingCreateUser(state, action) {
    return {
        ...state,
        loading: true,
        error: null,
        createdUser: false,
    };
}

function handleSuccessCreateUser(state, {}) {
    return {
        ...state,
        loading: false,
        createdUser: true,
    };

}

function handleErrorCreateUser(state, { payload }) {
    return {
        ...state,
        loading: false,
        error: payload,
    };
}
//actions creators
export function login(email, password){
    return async (dispatch, _, { services: {userService} }) => {
        dispatch({ type: LOADING_LOGIN_USER });
        try{
            const response = await userService.login(email, password);
            dispatch({ type: SUCCESS_LOGIN_USER, payload: response });
        }catch(error){
            dispatch({ type: ERROR_LOGIN_USER, payload: error });
        }
    };
}

export function logout(){
    return async (dispatch, _, { services: {userService} }) => {
        dispatch({ type: LOADING_LOGOUT_USER });
        try{
            await userService.logout();
            dispatch({ type: SUCCESS_LOGOUT_USER });
        }catch(error){
            dispatch({ type: ERROR_LOGOUT_USER, payload: error });
        }
    };
}

export function createUser(first_name, last_name, email, password){
    return async (dispatch, _, { services: {userService} }) => {
        dispatch({ type: LOADING_CREATE_USER });
        try{
            const response = await userService.createUser(first_name, last_name, email, password);
            console.log(response);
            dispatch({ type: SUCCESS_CREATE_USER, payload: response });
        }catch(error){
            dispatch({ type: ERROR_CREATE_USER, payload: error.message });
        }
    };
}