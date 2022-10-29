import { Action } from "../helpers/actions";

const initialState = null;

const config = (state = initialState, action) => {
    switch (action.type) {
        case Action.CONFIG_INIT:
            return { ...action.config };
        case Action.LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}

export default config;