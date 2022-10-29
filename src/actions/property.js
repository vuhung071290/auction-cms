import { Action } from "../helpers/actions";
import * as $ from '../helpers/services';

export const initPropertyList = (list, total, page, size) => ({
    type: Action.PROPERTY_LIST_INIT, list, total, page, size
});

export const setPropertyListLoading = (status) => ({
    type: Action.PROPERTY_LIST_LOADING, status
});

export const changePropertySearch = (search) => ({
    type: Action.PROPERTY_SEARCH_CHANGE, search
});

export const changePropertyDateSearch = (startDateSearch, endDateSearch) => ({
    type: Action.PROPERTY_DATE_CHANGE, startDateSearch, endDateSearch
});

export const changePropertyPage = (page) => ({
    type: Action.PROPERTY_PAGE_CHANGE, page
});

export const changePropertySize = (size) => ({
    type: Action.PROPERTY_SIZE_CHANGE, size
});

export const loadPropertyList = (page, size, search = null, field = null, startDateSearch, endDateSearch) => (async (dispatch) => {
    dispatch(setPropertyListLoading(true));
    try {
        let res = await $.getPropertyList(page, size, search, field, startDateSearch, endDateSearch);
        const { list, total } = res.data.data;
        dispatch(initPropertyList(list, total, page, size));
        dispatch(setPropertyListLoading(false));
    } catch (err) {
        dispatch(setPropertyListLoading(false));
    }
});