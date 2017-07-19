import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Home from './view/Home';
import Main from './view/Main';
import Index from './view/Index';
import TeamIndex from './view/TeamIndex';
import Cart from './view/Cart';
import ProductDetail from './view/ProductDetail';
import Article from './view/Article';
import My from './view/My';
import Manage from './view/Manage';
import Category from './view/Category';
import MemberIndex from './view/MemberIndex';
import MemberTradeIndex from './view/MemberTradeIndex';
import MemberStockIndex from './view/MemberStockIndex';
import MemberBillIndex from './view/MemberBillIndex';
import MemberLevel from './view/MemberLevel';
import MemberAddressIndex from './view/MemberAddressIndex';
import MemberAddressDetail from './view/MemberAddressDetail';
import StockIndex from './view/StockIndex';
import StockDetail from './view/StockDetail';
import TradeCheck from './view/TradeCheck';
import TradeIndex from './view/TradeIndex';
import TradeDetail from './view/TradeDetail';
import TradeConfirm from './view/TradeConfirm';
import Qrcode from './view/Qrcode';
import Certificate from './view/Certificate';

import constant from './util/constant';

function RouterConfig({history}) {

    const handleEnter = function (next, replace, callback) {
           callback();
    };

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to={constant.index}/>
                <Route path="home" component={Home}/>
                <Route component={Main} onEnter={handleEnter}>
                    <Route path="index" component={Index}/>
                    <Route path="team" component={TeamIndex}/>
                    <Route path="cart" component={Cart}/>
                    <Route path="product/:product_id" component={ProductDetail}/>
                    <Route path="article" component={Article}/>
                    <Route path="my" component={My}/>
                    <Route path="manage" component={Manage}/>
                </Route>
                <Route path="product/detail/:product_id" component={ProductDetail}/>
                <Route path="category/:category_id" component={Category} />
                <Route path="member/index/:member_id" component={MemberIndex}/>
                <Route path="member/trade/index/:member_id" component={MemberTradeIndex}/>
                <Route path="member/stock/index/:member_id" component={MemberStockIndex}/>
                <Route path="member/bill/index/:member_id" component={MemberBillIndex}/>
                <Route path="member/level/:member_id" component={MemberLevel}/>
                <Route path="member/address/index/:type" component={MemberAddressIndex}/>
                <Route path="member/address/add" component={MemberAddressDetail}/>
                <Route path="member/address/edit/:member_address_id" component={MemberAddressDetail}/>
                <Route path="stock/index" component={StockIndex}/>
                <Route path="stock/add" component={StockDetail}/>
                <Route path="stock/edit/:stock_id" component={StockDetail}/>
                <Route path="trade/check" component={TradeCheck}/>
                <Route path="trade/index/:trade_flow" component={TradeIndex}/>
                <Route path="trade/edit/:trade_id" component={TradeDetail}/>
                <Route path="trade/confirm/:trade_id" component={TradeConfirm}/>
                <Route path="qrcode" component={Qrcode}/>
                <Route path="certificate" component={Certificate}/>
                <Route path="team/index" component={TeamIndex}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
