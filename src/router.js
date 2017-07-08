import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Main from './view/Main';
import Index from './view/Index';
import Product from './view/Product';
import My from './view/My';
import Team from './view/Team';
import StockIndex from './view/StockIndex';
import AddressIndex from './view/AddressIndex';
import AddressDetail from './view/AddressDetail';

import wechat from './util/wechat';

function RouterConfig({history}) {

    const handleEnter = function (next, replace, callback) {
        wechat.auth();

        callback();
    };

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to="index"/>
                <Route component={Main} onEnter={handleEnter}>
                    <Route path="index" component={Index}/>
                    <Route path="product" component={Product}/>
                    <Route path="my" component={My}/>
                </Route>
                <Route path="team" component={Team}/>
                <Route path="stock/index" component={StockIndex}/>
                <Route path="address/index" component={AddressIndex}/>
                <Route path="address/detail" component={AddressDetail}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
