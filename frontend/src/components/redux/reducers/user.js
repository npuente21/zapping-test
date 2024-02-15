import { createReducer } from './utils';
import { LOADING_LOGIN_USER, SUCCESS_LOGIN_USER, ERROR_LOGIN_USER, 
        LOADING_LOGOUT_USER, SUCCESS_LOGOUT_USER, ERROR_LOGOUT_USER,
        LOADING_CREATE_USER, SUCCESS_CREATE_USER, ERROR_CREATE_USER,
        LOADING_PROFILE, SUCCESS_PROFILE, ERROR_PROFILE } from './constants';

const defaultState = {
    userData: {},
    error: null,
    loading: false,
    createdUser: false,
    authenticated: false,
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
    [LOADING_PROFILE]: handleLoadingProfile,
    [SUCCESS_PROFILE]: handleSuccessProfile,
    [ERROR_PROFILE]: handleErrorProfile,
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
        authenticated: true,
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
        authenticated: false,
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

function handleSuccessCreateUser(state, _) {
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

function handleLoadingProfile(state, action) {
    return {
        ...state,
        loading: true,
    };
}

function handleSuccessProfile(state, { payload }) {
    return {
        ...state,
        loading: false,
        userData: payload,
        authenticated: true,
    };
}

function handleErrorProfile(state, { payload }) {
    return {
        ...state,
        loading: false,
        error: payload,
        authenticated: false,
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
            dispatch({ type: ERROR_LOGIN_USER, payload: error.message });
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
            dispatch({ type: ERROR_LOGOUT_USER, payload: error.message });
        }
    };
}

export function createUser(first_name, last_name, email, password){
    return async (dispatch, _, { services: {userService} }) => {
        dispatch({ type: LOADING_CREATE_USER });
        try{
            const response = await userService.createUser(first_name, last_name, email, password);
            dispatch({ type: SUCCESS_CREATE_USER, payload: response });
        }catch(error){
            dispatch({ type: ERROR_CREATE_USER, payload: error.message });
        }
    };
}

export function getUserProfile(){
    return async (dispatch, _, { services: {userService} }) => {
        dispatch({ type: LOADING_PROFILE });
        try{
            const response = await userService.getProfile();
            dispatch({ type: SUCCESS_PROFILE, payload: response });
        }catch(error){
            dispatch({ type: ERROR_PROFILE, payload: error.message });
        }
    };
}