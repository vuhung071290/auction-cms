import { Action } from "../helpers/actions";
import * as $ from '../helpers/services';

export const initActivityList = (list, total, page, size) => ({
    type: Action.ACTIVITY_LIST_INIT, list, total, page, size
});

export const setActivityListLoading = (status) => ({
    type: Action.ACTIVITY_LIST_LOADING, status
});

export const changeActivitySearch = (search) => ({
    type: Action.ACTIVITY_SEARCH_CHANGE, search
});

export const changeActivityPage = (page) => ({
    type: Action.ACTIVITY_PAGE_CHANGE, page
});

export const changeActivitySize = (size) => ({
    type: Action.ACTIVITY_SIZE_CHANGE, size
});

export const loadActivityList = (page, size, search, field) => (async (dispatch) => {
    dispatch(setActivityListLoading(true));
    try {
        let res = await $.getActivityList(page, size, search, field);
        const { list, total } = res.data.data;
        dispatch(initActivityList(list, total, page, size));
        dispatch(setActivityListLoading(false));
    } catch (err) {
        dispatch(setActivityListLoading(false));
    }
});