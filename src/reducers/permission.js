import { Action } from "../helpers/actions";

const initialState = {
    loading: false,
    list: [],
    total: 0,
    page: 1,
    size: 10
}

const permission = (state = initialState, action) => {
    switch (action.type) {
        case Action.PERMISSION_LIST_INIT:
            const { list, total, page, size } = action;
            return { ...state, list, total, page, size };
        case Action.PERMISSION_LIST_LOADING:
            return { ...state, loading: action.status };
        case Action.PERMISSION_PAGE_CHANGE:
            return { ...state, page: action.page };
        case Action.PERMISSION_SIZE_CHANGE:
            return { ...state, size: action.size };
        case Action.LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}

export default permission;