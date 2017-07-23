import dva from 'dva';
import Router from './router';
import FastClick from 'fastclick';

import './view/Style.css';

import index from './model/index';
import category from './model/category';
import team_index from './model/team_index';
import product_detail from './model/product_detail';
import cart from './model/cart';
import my from './model/my';

import wechat from './util/wechat';

let result = wechat.auth();

if (result) {

    FastClick.attach(document.body);

    const app = dva();

    app.model(index);
    app.model(category);
    app.model(team_index);
    app.model(product_detail);
    app.model(cart);
    app.model(my);

    app.router(Router);

    document.getElementById("loading").remove();

    app.start('#root');
}