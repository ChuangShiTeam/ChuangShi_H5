export default {
    // host: 'http://localhost:8080',
    host: 'http://api.chuangshi.nowui.com',
    platform: 'H5',
    version: '9.9.8',
    name: '星销',
    app_id: 'c1af3f1ae00e4e0da9b20f5bd41b4279',
    wechat_app_id: 'wx26c8db6f1987e4e0',
    index: 'team/index/',
    menu: [{
        key: 'team',
        title: '团队',
        url: '/team/index',
        path: '/team/index',
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
        key: 'my',
        title: '个人',
        url: '/my',
        path: '/my',
        icon: 'my.svg',
        selected_icon: 'my_active.svg'
    }]
    // name: '济颐馆',
    // app_id: 'df2078d6c9eb46babb0df957127273ab',
    // wechat_app_id: 'wx934f793803320ecd',
    // index: 'index/',
    // menu: [{
    //     key: 'index',
    //     title: '首页',
    //     url: '/index',
    //     path: '/index',
    //     icon: 'index.svg',
    //     selected_icon: 'index_active.svg'
    // }, {
    //     key: 'cart',
    //     title: '购物车',
    //     url: '/cart',
    //     path: '/cart',
    //     icon: 'cart.svg',
    //     selected_icon: 'cart_active.svg'
    // }, {
    //     key: 'my',
    //     title: '个人',
    //     url: '/my',
    //     path: '/my',
    //     icon: 'my.svg',
    //     selected_icon: 'my_active.svg'
    // }]
};