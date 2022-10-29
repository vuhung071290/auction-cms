import { Action } from "../helpers/actions";

const initialState = {
    page: 1
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case Action.USERS_SEARCH:
            const { list, page, size, total, search } = action;
            return { ...state, list, page, size, total, search };
        case Action.USERS_LOADING:
            const { loading } = action;
            return {...state, loading }
        default:
            return state;
    }
}

export default users;