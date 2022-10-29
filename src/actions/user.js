import { Action } from "../helpers/actions";
import * as $ from '../helpers/services';

export const initListUser = (page, size, list, total, search) => ({
    type: Action.USERS_SEARCH, page, size, list, total, search
});

export const smsOtp = (resultOtp) => ({
    type: Action.USERS_OTP_SMS, resultOtp
});

export const userLoading = (loading) => ({
    type: Action.USERS_LOADING, loading
});

export const loadListUser = (page, size, search) => (async (dispatch) => {
    dispatch(userLoading(true));
    try {
        let res = await $.searchUserList(page, size, search);
        const { list, total} = res.data.data;
        dispatch(initListUser(page, size, list, total, search));
        dispatch(userLoading(false));
    } catch (err) {
        dispatch(userLoading(false));
    }
});