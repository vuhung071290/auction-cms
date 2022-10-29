import * as axios from 'axios';
import { message } from 'antd';
import { API } from './config/apiUrlConfig';
import { URL } from './config/urlConfig';

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.log(error.response);
    console.log(error);
    if (error.response) {
        const { status } = error.response;
        
        switch (status) {
            case 401:
                clearStorage();
                window.location.href = URL.LOGIN + "?expired";
                break;
            case 500: case 400: case 503:
                message.error(error.response.data.message);
                break;
            case 403:
                message.error("You don't have enough permission.");
                break;
            default:
                break;
        }
    } else {
        message.error(error.message);
    }
    return Promise.reject(error);
});


export const getAuthentication = () => {
    var auth = JSON.parse(sessionStorage.getItem('user'));
    if (auth == null) {
        return {
            status: false,
            notify: false,
            message: 'No user data'
        }
    }

    if (auth.token === 0) {
        return {
            status: false,
            notify: false,
            message: 'No token'
        }
    }

    if (Date.now() >= auth.expire_time) {
        clearStorage();
        return {
            status: false,
            notify: true,
            message: 'Token was expired. Please login again'
        }
    }

    axios.defaults.headers.common['Authorization'] = "Bearer " + auth.token;
    return {
        status: true,
        notify: false,
        message: 'OK',
        auth
    }
}

export const clearStorage = () => {
    sessionStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
}

export const setStorage = (userObj) => {
    sessionStorage.setItem('user', JSON.stringify(userObj));
    axios.defaults.headers.common['Authorization'] = "Bearer " + userObj.token;
}

/**
 * CHANG LOG
 */

export const wasReadAnnouncement = (version) => {
    let wasRead = localStorage.getItem(version);
    return wasRead != null && wasRead;
}

export const setReadAnnouncement = (version) => {
    localStorage.setItem(version, true);
}


/**
 * AUTHENTICATION
 */

export const auth = (domainName, password) => axios.post(API.AUTH, { domainName, password });
export const getConfig = () => axios.get(API.CONFIG);

/**
 * STORAGE
 */

export const uploadImage = (formData, config) => axios.post(API.STORAGE + "/image", formData, config);
export const uploadFile = (formData, config) => axios.post(API.STORAGE + "/file", formData, config);

/**
 * ACCOUNT MANAGEMENT
 */

export const getAccountList = (page, size, search, field) => axios.get(API.ACCOUNTS, { params: { search, field, page, size } });
export const createNewAccount = (domainName, displayName, email) => axios.post(API.ACCOUNTS, { domainName, displayName, email });
export const editAccount = (domainName, displayName, email, isActive) => axios.put(API.ACCOUNTS + "/" + domainName, { displayName, email, isActive });
export const getAccount = (domain) => axios.get(API.ACCOUNTS + "/" + domain);
export const deleteAccount = (domainName) => axios.delete(API.ACCOUNTS + "/" + domainName);

/**
 * ACCOUNT ACTIVITY
 */

export const getActivityList = (page, size, search, field) => axios.get(API.ACTIVITIES, { params: { search, field, page, size } });

/**
 * PERMISSION MANAGEMENT
 */

export const getFeatureList = (page = null, size = null) => axios.get(API.PERMISSIONS_FEATURES, { params: { page, size } });
export const createNewFeature = (featureId, featureName, description) => axios.post(API.PERMISSIONS_FEATURES, { featureId, featureName, description });
export const editFeature = (featureId, featureName, description) => axios.put(API.PERMISSIONS_FEATURES + "/" + featureId, { featureName, description })
export const deleteFeature = (featureId) => axios.delete(API.PERMISSIONS_FEATURES + "/" + featureId);
export const createNewFeatureAction = (featureId, featureActionId, featureActionName, description) => axios.post(API.PERMISSIONS_ACTIONS, { featureId, featureActionId, featureActionName, description });
export const editFeatureAction = (featureActionId, featureActionName, description) => axios.put(API.PERMISSIONS_ACTIONS + "/" + featureActionId, { featureActionName, description })
export const deleteFeatureAction = (featureActionId) => axios.delete(API.PERMISSIONS_ACTIONS + "/" + featureActionId);
export const getPermissionGranted = (domainName) => axios.get(API.PERMISSIONS_ACCOUNT + "/" + domainName);
export const saveAccountPermission = (domainName, add, remove) => axios.post(API.PERMISSIONS_ACCOUNT + "/" + domainName, { add, remove });

/**
 * USER MANAGEMENT
 */
export const getUserList = (page = null, size = null) => axios.get(API.USERS_LIST, { params: { page, size } });
export const searchUserList = (page = 1, size = 5, query = null) => axios.get(API.USERS_SEARCH_LIST, { params: { page, size, query} });
export const sendOtpSms = (userId) => axios.post(API.USERS_SEND_SMS_OTP(userId));
export const deleteUser = (userId) => axios.post(API.USERS_DELETE(userId));
export const createUser = (displayName, phoneNumber, address, avatar, password, bankAccount, bankName, identity, isActive) => axios.post(API.USERS_CREATE_NEW, {displayName, phoneNumber, address, avatar, password, bankAccount, bankName, identity, isActive});
export const updateUser = (userId, displayName, avatar, identity, address, bankAccount, bankName) => axios.put(API.USERS_UPDATE(userId), { displayName, avatar, identity, address, bankAccount, bankName });

/**
 *  PROPERTY
 */
export const getPropertyList = (page, size, search, field, startDateSearch, endDateSearch) => axios.get(API.PROPERTY_MANAGEMENT, { params: { search, field, startDateSearch, endDateSearch, page, size } });
export const createNewProperty = (name, description, images, registrationForms, auctionMinutes, contracts, createdUser) => axios.post(API.PROPERTY_MANAGEMENT, { name, description, images, registrationForms, auctionMinutes, contracts, createdUser });
export const editProperty = (propertyId, name, description, images, registrationForms, auctionMinutes, contracts) => axios.put(API.PROPERTY_MANAGEMENT + "/" + propertyId, { name, description, images, registrationForms, auctionMinutes, contracts });
export const getProperty = (propertyId) => axios.get(API.PROPERTY_MANAGEMENT + "/" + propertyId);
export const deleteProperty = (propertyId) => axios.delete(API.PROPERTY_MANAGEMENT + "/" + propertyId);

/**
 *  AUCTION
 */
 export const getAuctionList = (page, size, search, field, startDateSearch, endDateSearch) => axios.get(API.AUCTION_MANAGEMENT, { params: { search, field, startDateSearch, endDateSearch, page, size } });
 export const createNewAuction = (propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate, createdUser) => axios.post(API.AUCTION_MANAGEMENT, { propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate, createdUser });
 export const editAuction = (auctionId, propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate) => axios.put(API.AUCTION_MANAGEMENT + "/" + auctionId, { propertyId, name, description, auctionMethod, registerFee, depositFee, startPrice, stepPrice, startRegisterDate, endRegisterDate });
 export const updateStatusAuction = (auctionId, status) => axios.put(API.AUCTION_MANAGEMENT + "/" + auctionId + "/status", { status });
 export const getAuction = (auctionId) => axios.get(API.AUCTION_MANAGEMENT + "/" + auctionId);
 export const deleteAuction = (auctionId) => axios.delete(API.AUCTION_MANAGEMENT + "/" + auctionId);
 export const getAuctionHistoricalList = (auctionId, page, size) => axios.get(API.AUCTION_MANAGEMENT + "/" + auctionId + "/historical", { params: { page, size } });

/**
 *  USER REGISTER AUCTION
 */
 export const getUserRegisterAuction = (auctionId, page, size) => axios.get(API.USER_REGISTER_AUCTION(auctionId), { params: { page, size } });
 export const updateStatusUserRegisterAuction = (auctionId, userId, status) => axios.put(API.USER_REGISTER_AUCTION_UPDATE_STATUS(auctionId, userId), { status });
