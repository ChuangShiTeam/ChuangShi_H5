import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Home from './view/Home';
import Main from './view/Main';
import Index from './view/Index';
import Product from './view/Product';
import My from './view/My';
import MemberIndex from './view/MemberIndex';
import MemberTradeIndex from './view/MemberTradeIndex';
import MemberStockIndex from './view/MemberStockIndex';
import MemberLevel from './view/MemberLevel';
import MemberAddressIndex from './view/MemberAddressIndex';
import MemberAddressDetail from './view/MemberAddressDetail';
import StockIndex from './view/StockIndex';
import TradeCheck from './view/TradeCheck';
import TradeIndex from './view/TradeIndex';

function RouterConfig({history}) {

    const handleEnter = function (next, replace, callback) {

        callback();
    };

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to="home"/>
                <Route path="home" component={Home}/>
                <Route component={Main} onEnter={handleEnter}>
                    <Route path="index" component={Index}/>
                    <Route path="product" component={Product}/>
                    <Route path="my" component={My}/>
                </Route>
                <Route path="member/index/:member_id" component={MemberIndex}/>
                <Route path="member/trade/index/:member_id" component={MemberTradeIndex}/>
                <Route path="member/stock/index/:member_id" component={MemberStockIndex}/>
                <Route path="member/level/:member_id" component={MemberLevel}/>
                <Route path="member/address/index/:type" component={MemberAddressIndex}/>
                <Route path="member/address/add" component={MemberAddressDetail}/>
                <Route path="stock/index" component={StockIndex}/>
                <Route path="trade/check" component={TradeCheck}/>
                <Route path="trade/index" component={TradeIndex}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
