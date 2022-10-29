import { Action } from "../helpers/actions";

const initialState = {
    loading: false,
    search: null,
    field: "domainName",
    list: [],
    total: 0,
    page: 1,
    size: 10
}

const activity = (state = initialState, action) => {
    switch (action.type) {
        case Action.ACTIVITY_LIST_INIT:
            const { list, total, page, size } = action;
            return { ...state, list, total, page, size };
        case Action.ACTIVITY_LIST_LOADING:
            return { ...state, loading: action.status };
        case Action.ACTIVITY_SEARCH_CHANGE:
            return { ...state, search: action.search };
        case Action.ACTIVITY_PAGE_CHANGE:
            return { ...state, page: action.page };
        case Action.ACTIVITY_SIZE_CHANGE:
            return { ...state, size: action.size };
        case Action.LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}

export default activity;