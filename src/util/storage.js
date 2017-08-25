import constant from './constant';

const open_id_key = ('open_id_' + constant.version);
const token_key = ('token_' + constant.version);
const product_sku_list_key = ('product_sku_list_' + constant.version);
const member_address_key = ('member_address_' + constant.version);
const trade_flow_key = ('trade_flow_' + constant.version);
const member_purchase_order_flow_key = ('member_purchase_order_flow_' + constant.version);
const member_delivery_order_flow_key = ('member_delivery_order_flow_' + constant.version);

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
            // token = 'gygLszl85cPD1c1AlprNZ/yZdlQtt3pF+BdCDPMzM9fPGHmzIsQ6dIzlS2wsn8lJfebepk0PIxJGZXWWcSiCPRE3uCVSOrsqQynDzzuuCH8=';
            // token = 'jrm+riL6g6CN+wYxFfeuOqof7FRyU9UPU9BupigvBENYS+cAJweOLwOKsfC3NtrA/0yKhg3ARlxntdZeK6jJcYslLxfUHluhCWZPXozYBLc=';
            // token = '8sJgFZkMMgLUPfF9dvJB0kqou5YYz7OBpHBnSIz7y/fMLJQYUAbBFzXE9GlYFHOo/0yKhg3ARlxntdZeK6jJcReT7cqlJ1bmRxZ56PFGm7s=';
            // token = 'nFxzCTlV1fxElyp3FIozxYrXQzjt2PDgdsL9TyOf2eLAQbXeWTjoS1ssJaGnGm9L/0yKhg3ARlxntdZeK6jJcXuOgWQ+lxYFgxubIzOMbpo=';
            // token = 'RWzhq4xTwjksOwclm+nOg6dp3n/8mCbZ9c7OolUXYaYLkIec0V6ZXZrV2Izavob1febepk0PIxJGZXWWcSiCPfXeh4XW7B3fYM10OdcyYkQ=';
            // token = 'Py/GFsyNdHVuLPSXgmHtvW4yScYlgT0f7idl0PPTC3CUTsuGQsiVBzbV5G4sEgOCKtEuDb5qbUHFuI3SOyq8hAGiEFe8C+e8mviebHJgfWI=';
            token = 'KQcW4/AnvfpjgNWWAeYfG8ENfiadTcC9P6qYKVNXilVJwwafaHodFtvadr2OkXsaKtEuDb5qbUHFuI3SOyq8hMp1yQ0m2WE0SuAJKmzIuQk=';
            // token = 'MiLWWS++tIWN5zCF253Ho8pDx6c39/KMTYuKJQeV7VndoFVSqq+Ou0czrhKu2ObhKtEuDb5qbUHFuI3SOyq8hLhIWUilDjJTo0v9rOnobCg=';
        } else {
            // token = 'eGxQXLg8tF6pnkrWKDZtQYx66pZZVT7coqSE1UnwrdFaSxYn7vSUK0gatjD0XDdAfebepk0PIxJGZXWWcSiCPTEW98BsEe3j8pce1qW012o=';
            // token = 'EglfmyoSgHXR35+iLGQRZCplzzJlPGVSzoBIrlBSR0au3n2ga4z5NC3zl7rhN4Pafebepk0PIxJGZXWWcSiCPS0ZRoDJqbk6DTHKn+l/SWE=';
            // token = 'qo/dW5e3iwB0g+CmSJdAgPzazkmeUyIF9UZxj3vu2B2OZI64/+qOkj63ggR0bA7Ffebepk0PIxJGZXWWcSiCPagrz+Ffgk1F3MSEhHHrcFg=';
            // token = 'lix+goOvFaVxAyzwvo4jwz9eEYXlr6wKOpZuYHcxuGPMCxBwXL8VIEpDgZxhfvrQfebepk0PIxJGZXWWcSiCPbSf6zzJ7AE8kk6PS8VEqqU=';
            // token = 'azG3VW20EKR3+bgOJMZYizsKkMqA10GJJmdQRPrJYwGMZAqeRdBL0aMVabZy2sCHfebepk0PIxJGZXWWcSiCPeNGSMqVl1UlPVa6H9vbSts=';
            //token = 'ujZ5LbWo3CcDW2Nzzf4W/WZnhV4dWs7WtVS2L4M8HRQnhKI+ZS2+xx22K9PzVfA1KtEuDb5qbUHFuI3SOyq8hIz9hhJNX5+0wjJB0OZkj0I=';
            token = 'z89babxuOgyUGTj1c9g+nfQpjdJ5fu3g7V5aE80HGwu/XgFbPmdlBK0MDE7F8K32ciyFtzYixml/u7aG6UXOXLx1pxP+A7DO+rX1q5FvvOo=';
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

function getMemberPurchaseOrderFlow() {
    return JSON.parse(localStorage.getItem(member_purchase_order_flow_key));
}

function setMemberPurchaseOrderFlow(member_purchase_order_flow) {
    localStorage.setItem(member_purchase_order_flow_key, JSON.stringify(member_purchase_order_flow));
}

function removeMemberPurchaseOrderFlow() {
    localStorage.removeItem(member_purchase_order_flow_key);
}

function getMemberDeliveryOrderFlow() {
    return JSON.parse(localStorage.getItem(member_delivery_order_flow_key));
}

function setMemberDeliveryOrderFlow(member_delivery_order_flow) {
    localStorage.setItem(member_delivery_order_flow_key, JSON.stringify(member_delivery_order_flow));
}

function removeMemberDeliveryOrderFlow() {
    localStorage.removeItem(member_delivery_order_flow_key);
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
    removeTradeFlow: removeTradeFlow,
    getMemberPurchaseOrderFlow: getMemberPurchaseOrderFlow,
    setMemberPurchaseOrderFlow: setMemberPurchaseOrderFlow,
    removeMemberPurchaseOrderFlow: removeMemberPurchaseOrderFlow,
    getMemberDeliveryOrderFlow: getMemberDeliveryOrderFlow,
    setMemberDeliveryOrderFlow: setMemberDeliveryOrderFlow,
    removeMemberDeliveryOrderFlow: removeMemberDeliveryOrderFlow
};
