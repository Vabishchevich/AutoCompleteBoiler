import {FETCH_USERS} from './types'

const initialState = {
    fetchedUsers: []
};

export const usersReducer = (state = initialState, action) => {
    if (action.type === FETCH_USERS) {
        return {...state, fetchedUsers: action.payload};
    } else {
        return state
    }
};