import { Action} from "../helpers/actions";

export const login = (authObj) => ({ 
    type: Action.LOGIN, authObj 
});

export const logout = () => ({
    type: Action.LOGOUT
});