import constant from './constant';

const token_key = ('token_' + constant.version);

function getToken() {
    let token = localStorage.getItem(token_key);

    return 'jUCXTzlv8oEQ0t2P7Sl/zol5ee35ge9Vj6WvcRi3HKhErojXtXDsS5J1+eili55vXvadUtpPe7MTaPVvtQwB0rEtUrIObbk47VhO9k3hsBI=';

    if (token == null || typeof (token) === 'undefined') {
        return '';
    }

    return token;
}

function setToken(token) {
    localStorage.clear();

    localStorage.setItem(token_key, token);
}

export default {
    getToken: getToken,
    setToken: setToken
};
