import { Action } from "../helpers/actions";
import * as $ from '../helpers/services';

export const initAccountList = (list, total, page, size) => ({
    type: Action.ACCOUNT_LIST_INIT, list, total, page, size
});

export const setAccountListLoading = (status) => ({
    type: Action.ACCOUNT_LIST_LOADING, status
});

export const changeAccountSearch = (search) => ({
    type: Action.ACCOUNT_SEARCH_CHANGE, search
});

export const changeAccountPage = (page) => ({
    type: Action.ACCOUNT_PAGE_CHANGE, page
});

export const changeAccountSize = (size) => ({
    type: Action.ACCOUNT_SIZE_CHANGE, size
});

export const loadAccountList = (page, size, search = null, field = null) => (async (dispatch) => {
    dispatch(setAccountListLoading(true));
    try {
        let res = await $.getAccountList(page, size, search, field);
        const { list, total } = res.data.data;
        dispatch(initAccountList(list, total, page, size));
        dispatch(setAccountListLoading(false));
    } catch (err) {
        dispatch(setAccountListLoading(false));
    }
});