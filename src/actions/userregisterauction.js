import { Action } from "../helpers/actions";
import * as $ from '../helpers/services';

export const initUserRegisterAuction = (page, size, list, total) => ({
    type: Action.USER_REGISTER_AUCTION_LIST, page, size, list, total
});

export const userRegisterAuctionLoading = (loading) => ({
    type: Action.USER_REGISTER_AUCTION_LOADING, loading
});

export const loadUserRegisterAuction = (auctionId, page, size,) => (async (dispatch) => {
    dispatch(userRegisterAuctionLoading(true));
    try {
        let res = await $.getUserRegisterAuction(auctionId, page, size);
        const { list, total} = res.data.data;
        dispatch(initUserRegisterAuction(page, size, list, total));
        dispatch(userRegisterAuctionLoading(false));
    } catch (err) {
        dispatch(userRegisterAuctionLoading(false));
    }
});