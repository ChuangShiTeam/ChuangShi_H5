import constant from './constant';

const open_id_key = ('open_id_' + constant.version);
const token_key = ('token_' + constant.version);
const product_sku_list_key = ('product_sku_list_' + constant.version);
const member_address_key = ('member_address_' + constant.version);
const trade_flow_key = ('trade_flow_' + constant.version);

function getOpenId() {
    if (constant.is_test) {
        if (constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279') {
            return 'oqvzXv4c-FY2-cGh9U-RA4JIrZoc';
        } else {
            return 'oXxTjwoBVyBquUAAx3RaFow62zjA';
        }
    }
    return localStorage.getItem(open_id_key);
}

function setOpenId(open_id) {
    localStorage.setItem(open_id_key, open_id);
}

function getToken() {
    let token = localStorage.getItem(token_key);

    if (constant.is_test) {
        if (constant.app_id === 'c1af3f1ae00e4e0da9b20f5bd41b4279') {
            token = 'gygLszl85cPD1c1AlprNZ/yZdlQtt3pF+BdCDPMzM9fPGHmzIsQ6dIzlS2wsn8lJfebepk0PIxJGZXWWcSiCPRE3uCVSOrsqQynDzzuuCH8=';
        } else {
            token = 'eGxQXLg8tF6pnkrWKDZtQYx66pZZVT7coqSE1UnwrdFaSxYn7vSUK0gatjD0XDdAfebepk0PIxJGZXWWcSiCPTEW98BsEe3j8pce1qW012o=';
        }
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

function getTradeFlow() {
    return JSON.parse(localStorage.getItem(trade_flow_key));
}

function setTradeFlow(trade_flow) {
    localStorage.setItem(trade_flow_key, JSON.stringify(trade_flow));
}

function removeTradeFlow() {
    localStorage.removeItem(trade_flow_key);
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
    removeMemberAddress: removeMemberAddress,
    getTradeFlow: getTradeFlow,
    setTradeFlow: setTradeFlow,
    removeTradeFlow: removeTradeFlow
};
