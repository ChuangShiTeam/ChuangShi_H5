import dva from 'dva';
import Router from './router';
import {useRouterHistory} from 'dva/router';
import {createHashHistory} from 'history';
import FastClick from 'fastclick';

import './view/Style.css';

import index from './model/index';
import category from './model/category';
import team_index from './model/team_index';
import product_brand from './model/product_brand';
import product_detail from './model/product_detail';
import article_index from './model/article_index';
import cart from './model/cart';
import my from './model/my';
import story from './model/story';
import science from './model/science';
import member_delivery_order from './model/member_delivery_order';
import member_purchase_order from './model/member_purchase_order';
import shop from './model/shop';

import wechat from './util/wechat';

let result = true;

if (document.location.href.indexOf('/story/') > -1 || document.location.href.indexOf('/science/') > -1) {

} else {
    result = wechat.auth();
}

if (result) {

    FastClick.attach(document.body);

    const app = dva({
        history: useRouterHistory(createHashHistory)({queryKey: false}),
    });

    app.model(index);
    app.model(category);
    app.model(team_index);
    app.model(product_brand);
    app.model(product_detail);
    app.model(article_index);
    app.model(cart);
    app.model(my);
    app.model(story);
    app.model(science);
    app.model(member_delivery_order);
    app.model(member_purchase_order);
    app.model(shop);

    app.router(Router);

    document.getElementById("loading").remove();

    app.start('#root');
}