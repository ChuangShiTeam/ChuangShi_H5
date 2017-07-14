import constant from './constant';

const open_id_key = ('open_id_' + constant.version);
const token_key = ('token_' + constant.version);
const product_sku_list_key = ('product_sku_list_' + constant.version);
const member_address_key = ('member_address_' + constant.version);

function getOpenId() {
    return localStorage.getItem(open_id_key);
}

function setOpenId(open_id) {
    localStorage.setItem(open_id_key, open_id);
}

function getToken() {
    let token = localStorage.getItem(token_key);

    if (constant.is_test) {
        token = 'jUCXTzlv8oEQ0t2P7Sl/zol5ee35ge9Vj6WvcRi3HKhErojXtXDsS5J1+eili55vXvadUtpPe7MTaPVvtQwB0rEtUrIObbk47VhO9k3hsBI=';
    }

    if (token === null) {
        return '';
    } else {
        return token;
    }
}

function setToken(token) {
    localStorage.clear();

    localStorage.setItem(token_key, token);
}

function getProductSkuList() {
    let product_sku_list = localStorage.getItem(product_sku_list_key);

    if (product_sku_list === null) {
        return [];
    }

    return JSON.parse(product_sku_list);
}

function setProductSkuList(product_sku_list) {
    localStorage.setItem(product_sku_list_key, JSON.stringify(product_sku_list));
}

function removeProductSkuList() {
    localStorage.removeItem(product_sku_list_key);
}

function getMemberAddress() {
    let member_address = localStorage.getItem(member_address_key);

    if (member_address === null) {
        return {
            member_address_name: '',
            member_address_mobile: '',
            member_address_province: '',
            member_address_city: '',
            member_address_area: '',
            member_address_address: ''
        };
    }

    return JSON.parse(member_address);
}

function setMemberAddress(member_address) {
    localStorage.setItem(member_address_key, JSON.stringify(member_address));
}

function removeMemberAddress() {
    localStorage.removeItem(member_address_key);
}

export default {
    getOpenId: getOpenId,
    setOpenId: setOpenId,
    getToken: getToken,
    setToken: setToken,
    getProductSkuList: getProductSkuList,
    setProductSkuList: setProductSkuList,
    removeProductSkuList: removeProductSkuList,
    getMemberAddress: getMemberAddress,
    setMemberAddress: setMemberAddress,
    removeMemberAddress: removeMemberAddress
};
