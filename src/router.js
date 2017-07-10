import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Main from './view/Main';
import Index from './view/Index';
import Product from './view/Product';
import My from './view/My';
import MemberIndex from './view/MemberIndex';
import MemberLevel from './view/MemberLevel';
import MemberAddressIndex from './view/MemberAddressIndex';
import MemberAddressDetail from './view/MemberAddressDetail';
import StockIndex from './view/StockIndex';
import TradeCheck from './view/TradeCheck';

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
                <Route path="member/index/:member_id" component={MemberIndex}/>
                <Route path="member/level/:member_id" component={MemberLevel}/>
                <Route path="member/address/index/:type" component={MemberAddressIndex}/>
                <Route path="member/address/add" component={MemberAddressDetail}/>
                <Route path="stock/index" component={StockIndex}/>
                <Route path="trade/check" component={TradeCheck}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
