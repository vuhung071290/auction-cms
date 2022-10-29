import { Action } from "../helpers/actions";

const initialState = null

const auth = (state = initialState, action) => {
    switch (action.type) {
        case Action.LOGIN:
            const { permissions } = action.authObj;
            return  { ...action.authObj, permissionSet: new Set(permissions.map((e) => e.featureActionId)) };
        case Action.LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default auth;