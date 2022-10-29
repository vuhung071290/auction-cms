import { Action } from "../helpers/actions";
import * as $ from '../helpers/services';

export const initFeatureList = (list, total, page, size) => ({
    type: Action.PERMISSION_LIST_INIT, list, total, page, size
});

export const setFeatureListLoading = (status) => ({
    type: Action.PERMISSION_LIST_LOADING, status
});

export const changeFeaturePage = (page) => ({
    type: Action.PERMISSION_PAGE_CHANGE, page
});

export const changeFeatureSize = (size) => ({
    type: Action.PERMISSION_SIZE_CHANGE, size
});

export const loadFeatureList = (page, size) => (async (dispatch) => {
    dispatch(setFeatureListLoading(true));
    try {
        let res = await $.getFeatureList(page, size);
        const { list, total } = res.data.data;
        dispatch(initFeatureList(list, total, page, size));
        dispatch(setFeatureListLoading(false));
    } catch (err) {
        dispatch(setFeatureListLoading(false));
    }
});