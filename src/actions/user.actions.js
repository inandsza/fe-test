import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

export const userActions = {
    login,
    logout,
    register
};

function login (user) {
    // return the promise using fetch which adds to localstorage on resolve
    return function action(dispatch) {
        dispatch(request(user))
        return userService.login(user)
            .then(user => {
                dispatch(success(user))
                dispatch(alertActions.success('successfully logged in'))
                history.push('/')
            })
            .catch(error => {
                console.log(error)
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            })

        function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
        function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
        function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
    }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return function action(dispatch) {
        dispatch(request(user))
        return userService.register(user)
            .then(p => {
                dispatch(success(user))
                dispatch(alertActions.success('successfully registered'))
                history.push('/')
            })
            .catch(error => {
                dispatch(failure(error))
                dispatch(alertActions.error(error))
            })

        function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
        function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
        function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
    }
}
