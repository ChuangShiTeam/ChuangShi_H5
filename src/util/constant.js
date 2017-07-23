export default {
    // host: 'http://localhost:8080',
    // is_test: true,
    host: 'http://api.chuangshi.nowui.com',
    is_test: false,
    platform: 'H5',
    version: '9.9.8',
    name: '星销',
    h5Host: 'http://h5.xingxiao.nowui.com/#/',
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
    }],
    // name: '济颐馆',
    // h5Host: 'http://h5.jiyiguan.nowui.com/#/',
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
    // }],
    // category: [{
    //     category_id: '0',
    //     category_name: '所有商品',
    //     category_color: '#fd666b',
    //     category_image: 'apps.svg',
    // }, {
    //     category_id: '146474b15ba545d9b9717cf8b5a6c3f5',
    //     category_name: '肠内营养',
    //     category_color: '#73b4ef',
    //     category_image: 'discover.svg',
    // }, {
    //     category_id: '9ed6cb3551fb4bfaabfeee89cc63f9b4',
    //     category_name: '快康系列',
    //     category_color: '#e78ab0',
    //     category_image: 'ticket.svg',
    // }, {
    //     category_id: '34fb354194e0409e8a80a4382a7fa18d',
    //     category_name: '特殊奶粉',
    //     category_color: '#7acfa6',
    //     category_image: 'present.svg',
    // }, {
    //     category_id: '26ef74aa1bb242479df5305478f31b08',
    //     category_name: '理疗辅助',
    //     category_color: '#ffcb63',
    //     category_image: 'punch.svg',
    // }, {
    //     category_id: '45ac41e5c3334439a6ac45abdea31a30',
    //     category_name: '补血系列',
    //     category_color: '#9f8bea',
    //     category_image: 'taoxiaopu.svg',
    // }],
};