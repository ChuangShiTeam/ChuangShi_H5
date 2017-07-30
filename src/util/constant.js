export default {
    // host: 'http://localhost:8080',
    is_test: true,
    host: 'http://api.chuangshi.nowui.com',
    //is_test: false,
    platform: 'H5',
    version: '9.9.8',
    name: '星销',
    h5Host: 'http://h5.xingxiao.nowui.com/?#/',
    app_id: 'c1af3f1ae00e4e0da9b20f5bd41b4279',
    wechat_app_id: 'wx26c8db6f1987e4e0',
    index: 'team',
    menu: [{
        key: 'team',
        title: '代理',
        url: '/team',
        path: '/team',
        icon: 'friend.svg',
        selected_icon: 'friend_active.svg'
    }, {
        key: 'product',
        title: '进货',
        url: '/product/76537999b6c6428d9a78d47739c08fa5',
        path: '/product/:product_id',
        icon: 'cart.svg',
        selected_icon: 'cart_active.svg'
    }, {
        key: 'read',
        title: '商学院',
        url: '/article/index',
        path: '/article',
        icon: 'read.svg',
        selected_icon: 'read_active.svg'
    }, {
        key: 'manage',
        title: '管理',
        url: '/manage',
        path: '/manage',
        icon: 'my.svg',
        selected_icon: 'my_active.svg'
    }]
};