const { env } = window;

console.log("Env: ", env);

const url = {
    sandbox: "http://116.118.49.152:8080",
    production: "https://backend.dgtc.vn"
}

const baseUrl = url[env] ? `${url[env]}/api` : "http://116.118.49.152:8080/api";

console.log("Backend: ", baseUrl);

export const API = {
    BASE_URL: baseUrl,
    AUTH: baseUrl + "/auth",
    STORAGE:  baseUrl + "/storage",
    CONFIG: baseUrl + "/config",
    ACCOUNTS: baseUrl + "/accounts",
    ACTIVITIES: baseUrl + "/activities",
    PERMISSIONS_FEATURES: baseUrl + "/permissions/features",
    PERMISSIONS_ACTIONS: baseUrl + "/permissions/actions",
    PERMISSIONS_ACCOUNT: baseUrl + "/permissions/account",
    USERS_LIST: baseUrl + "/user-management/users",
    USERS_SEARCH_LIST: baseUrl + "/user-management/users/search",
    USERS_SEND_SMS_OTP: (userId) => {return baseUrl + "/user-management/users/" + userId + "/otp-activate"},
    USERS_DELETE: (userId) => {return baseUrl + "/user-management/users/" + userId + "/delete"},
    USERS_UPDATE: (userId) => {return baseUrl + "/user-management/users/" + userId + "/update"},
    USERS_CREATE_NEW:  baseUrl + "/user-management/users/create",
    USER_REGISTER_AUCTION:(auctionId) => {return baseUrl + "/auction-management/" + auctionId + "/user-register"},
    USER_REGISTER_AUCTION_UPDATE_STATUS:(auctionId, userId) => {return baseUrl + "/auction-management/" + auctionId + "/status-register/" + userId},
    PROPERTY_MANAGEMENT: baseUrl + "/property-management",
    AUCTION_MANAGEMENT: baseUrl + "/auction-management",
}
