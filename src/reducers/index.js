import { combineReducers } from 'redux';
import auth from './auth';
import config from './config';
import account from './account';
import activity from './activity';
import permission from './permission';
import users from './user';
import property from './property';
import auction from './auction';
import userregisterauction from './userregisterauction';
import auctionhistorical from './auctionhistorical';

export default combineReducers({
    auth, config, account, activity, permission, users, property, auction, userregisterauction, auctionhistorical
})