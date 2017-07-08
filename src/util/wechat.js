import storage from './storage';

function getQueryString(name) {
  var url = document.location.href;
  var reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  var r = url.substr(url.indexOf('?') + 1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return '';
}

function auth() {
  var token = getQueryString('token');

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
