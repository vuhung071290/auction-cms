import { Action } from "../helpers/actions";
import moment from "moment";

const initialState = {
    loading: false,
    search: null,
    field: "name",
    startDateSearch: moment(moment().add(-90, 'days').startOf("day"), 'DD/MM/YYYY').unix()*1000,
    endDateSearch: moment(moment().endOf("day"), 'DD/MM/YYYY').unix()*1000,
    list: [],
    total: 0,
    page: 1,
    size: 10
}

const auctionhistorical = (state = initialState, action) => {
    switch (action.type) {
        case Action.AUCTION_HISTORICAL_LIST_INIT:
            const { list, total, page, size } = action;
            return { ...state, list, total, page, size };
        case Action.AUCTION_HISTORICAL_LIST_LOADING:
            return { ...state, loading: action.status };
        case Action.AUCTION_HISTORICAL_SEARCH_CHANGE:
            return { ...state, search: action.search };
        case Action.AUCTION_HISTORICAL_DATE_CHANGE:
            return { ...state, startDateSearch: action.startDateSearch, endDateSearch: action.endDateSearch };
        case Action.AUCTION_HISTORICAL_PAGE_CHANGE:
            return { ...state, page: action.page };
        case Action.AUCTION_HISTORICAL_SIZE_CHANGE:
            return { ...state, size: action.size };
        case Action.LOGOUT:
            return { ...initialState };
        default:
            return state;
    }
}

export default auctionhistorical;