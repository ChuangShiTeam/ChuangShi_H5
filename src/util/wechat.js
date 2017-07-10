import constant from './constant';
import storage from './storage';

function getQueryString(name) {
  let url = document.location.href;
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  let r = url.substr(url.indexOf('?') + 1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return '';
}

function auth() {
  let token = getQueryString('token');

  if (token === '') {
      token = storage.getToken();

      if (token === '') {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + constant.wechat_app_id + '&redirect_uri=http%3A%2F%2Fapi.chuangshi.nowui.com%2Fwechat%2Fapi%2Fauth%3Furl%3Dhome%26app_id%3D' + constant.app_id + '%26platform%3D' + constant.platform + '%26version%3D' + constant.version + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
      }
  } else {
      storage.setToken(token);
  }

}

export default {
  auth: auth
};
