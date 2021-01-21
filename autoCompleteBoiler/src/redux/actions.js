import axios from 'axios'
import {FETCH_USERS, HIDE_ALERT, HIDE_LOADER, SHOW_ALERT, SHOW_LOADER} from './types';

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function showAlert(text) {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: text
        });
        setTimeout(() => {
            dispatch(hideAlert())
        }, 3000)
    }
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    }
}

export function fetchUsers() {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setTimeout(() => {
                dispatch({type: FETCH_USERS, payload: response.data});
                dispatch(hideLoader())
            }, 500)
        } catch (e) {
            dispatch(showAlert('Data acquisition error'));
            dispatch(hideLoader())
        }
    }
}