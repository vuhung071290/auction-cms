import { Action } from "../helpers/actions";

const initialState = {
    page: 1
}

const userregisterauction = (state = initialState, action) => {
    switch (action.type) {
        case Action.USER_REGISTER_AUCTION_LIST:
            const { list, page, size, total } = action;
            return { ...state, list, page, size, total };
        case Action.USER_REGISTER_AUCTION_LOADING:
            const { loading } = action;
            return {...state, loading }
        default:
            return state;
    }
}

export default userregisterauction;