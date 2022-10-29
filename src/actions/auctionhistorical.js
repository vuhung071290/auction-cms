import { Action } from "../helpers/actions";
import * as $ from '../helpers/services';

export const initAuctionHistoricalList = (list, total, page, size) => ({
    type: Action.AUCTION_HISTORICAL_LIST_INIT, list, total, page, size
});

export const setAuctionHistoricalListLoading = (status) => ({
    type: Action.AUCTION_HISTORICAL_LIST_LOADING, status
});

export const changeAuctionHistoricalSearch = (search) => ({
    type: Action.AUCTION_HISTORICAL_SEARCH_CHANGE, search
});

export const changeAuctionHistoricalDateSearch = (startDateSearch, endDateSearch) => ({
    type: Action.AUCTION_HISTORICAL_DATE_CHANGE, startDateSearch, endDateSearch
});

export const changeAuctionHistoricalPage = (page) => ({
    type: Action.AUCTION_HISTORICAL_PAGE_CHANGE, page
});

export const changeAuctionHistoricalSize = (size) => ({
    type: Action.AUCTION_HISTORICAL_SIZE_CHANGE, size
});

export const loadAuctionHistoricalList = (auctionId, page, size, search = null, field = null, startDateSearch, endDateSearch) => (async (dispatch) => {
    dispatch(setAuctionHistoricalListLoading(true));
    try {
        let res = await $.getAuctionHistoricalList(auctionId, page, size, search, field, startDateSearch, endDateSearch);
        const { list, total } = res.data.data;
        dispatch(initAuctionHistoricalList(list, total, page, size));
        dispatch(setAuctionHistoricalListLoading(false));
    } catch (err) {
        dispatch(setAuctionHistoricalListLoading(false));
    }
});