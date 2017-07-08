import reqwest from 'reqwest';
import {Toast} from 'antd-mobile';

import constant from './constant';
import storage from './storage';

function request(config) {
    reqwest({
        url: constant.host + config.url,
        type: 'json',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'app_id': constant.app_id,
            'token': storage.getToken(),
            'platform': constant.platform,
            'version': constant.version
        },
        data: JSON.stringify(config.data),
        success: function (response) {
            if (response.code === 200) {
                config.success(response.data);
            } else {
                Toast.fail(response.message, 1);
            }
        },
        error: function () {
            Toast.fail(constant.error, 1);
        },
        complete: function () {
            config.complete();
        }
    });
}

export default {
    request: request
};
