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
        alert(123);
      }
  } else {
      storage.setToken(token);
  }

}

export default {
  auth: auth
};
