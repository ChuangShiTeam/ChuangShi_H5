import dva from 'dva';
import Router from './router';

import './view/Style.css';

import index from './model/index';
import my from './model/my';


import FastClick from 'fastclick';
FastClick.attach(document.body);

const app = dva();

app.model(index);
app.model(my);

app.router(Router);

app.start('#root');

document.getElementById("loading").remove();