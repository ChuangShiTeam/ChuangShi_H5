import constant from "./constant";
import http from "./http";
import storage from "./storage";

function getQueryString(name) {
    let url = document.location.href;
    let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    let r = url.substr(url.indexOf('?') + 1).match(reg);
    if (r !== null) {
        return unescape(r[2]);
    }
    return '';
}

function auth() {
    let open_id = getQueryString('open_id');
    if (open_id === '') {
        let token = storage.getToken();
        if (token === '') {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + constant.wechat_app_id + '&redirect_uri=http%3A%2F%2Fapi.chuangshi.nowui.com%2Fwechat%2Fauth%3Furl%3D' + encodeURIComponent(encodeURIComponent(constant.h5Host + constant.index)) + '%26platform%3D' + constant.platform + '%26version%3D' + constant.version + '%26app_id%3D' + constant.app_id + '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';

            return false;
        }
    } else {
        let token = getQueryString('token');

        storage.setToken(token);
        storage.setOpenId(open_id);
    }

    if (!constant.is_test) {
        http.request({
            // url: '/wechat/config?app_id=' + constant.app_id + '&url=http://h5.xingxiao.nowui.com/#/index',
            url: '/wechat/config?app_id=' + constant.app_id + '&url=' + document.location.href,
            data: {},
            success: function (data) {
                window.wx.config({
                    debug: false,
                    appId: constant.wechat_app_id,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'chooseWXPay'
                    ]
                });

                window.share_config = {
                    "share": {
                        "imgUrl": "",
                        "title": "",
                        "desc": "",
                        "link": "",
                        "success": function () {

                        },
                        'cancel': function () {

                        }
                    }
                };
                window.wx.ready(function () {
                    window.wx.onMenuShareAppMessage(window.share_config.share);
                    window.wx.onMenuShareTimeline(window.share_config.share);
                    window.wx.onMenuShareQQ(window.share_config.share);
                });
            },
            complete: function () {

            }
        });
    }

    return true;
}

export default {
    auth: auth
};
