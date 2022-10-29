import { Action} from "../helpers/actions";
import * as $ from "../helpers/services";
import { URL } from "../helpers/config/urlConfig";

export const initConfig = (config) => ({
    type: Action.CONFIG_INIT, config
});

export const loadConfig = () => (async (dispatch) => {
    try {
        let res = await $.getConfig();
        dispatch(initConfig(res.data.data));
    } catch (err) {
        if (!window.location.href.includes(URL.LOGIN)) {
            window.location.href = URL.LOGIN + "?configFailed";
        }
        
        $.clearStorage();
    }
});