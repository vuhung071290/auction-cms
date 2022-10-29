import { Action } from "../helpers/actions";
import * as $ from '../helpers/services';

export const initAuctionList = (list, total, page, size) => ({
    type: Action.AUCTION_LIST_INIT, list, total, page, size
});

export const setAuctionListLoading = (status) => ({
    type: Action.AUCTION_LIST_LOADING, status
});

export const changeAuctionSearch = (search) => ({
    type: Action.AUCTION_SEARCH_CHANGE, search
});

export const changeAuctionDateSearch = (startDateSearch, endDateSearch) => ({
    type: Action.AUCTION_DATE_CHANGE, startDateSearch, endDateSearch
});

export const changeAuctionPage = (page) => ({
    type: Action.AUCTION_PAGE_CHANGE, page
});

export const changeAuctionSize = (size) => ({
    type: Action.AUCTION_SIZE_CHANGE, size
});

export const loadAuctionList = (page, size, search = null, field = null, startDateSearch, endDateSearch) => (async (dispatch) => {
    dispatch(setAuctionListLoading(true));
    try {
        let res = await $.getAuctionList(page, size, search, field, startDateSearch, endDateSearch);
        const { list, total } = res.data.data;
        dispatch(initAuctionList(list, total, page, size));
        dispatch(setAuctionListLoading(false));
    } catch (err) {
        dispatch(setAuctionListLoading(false));
    }
});