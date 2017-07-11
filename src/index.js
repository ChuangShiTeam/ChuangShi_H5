import dva from 'dva';
import Router from './router';
import FastClick from 'fastclick';

import './view/Style.css';

import index from './model/index';
import product from './model/product';
import my from './model/my';

import wechat from './util/wechat';

let result = wechat.auth();

if (result) {

    FastClick.attach(document.body);

    const app = dva();

    app.model(index);
    app.model(product);
    app.model(my);

    app.router(Router);

    document.getElementById("loading").remove();

    app.start('#root');
}