import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Home from './view/Home';
import Main from './view/Main';
import Index from './view/Index';
import TeamIndex from './view/team/TeamIndex';
import Cart from './view/Cart';
import ProductDetail from './view/ProductDetail';
import ArticleIndex from './view/article/ArticleIndex';
import My from './view/My';
import Manage from './view/Manage';
import Category from './view/Category';
import MemberIndex from './view/member/MemberIndex';
import MemberTradeIndex from './view/member/MemberTradeIndex';
import MemberStockIndex from './view/member/MemberDeliveryOrderIndex';
import MemberBillIndex from './view/member/MemberBillIndex';
import MemberLevel from './view/member/MemberLevel';
import MemberAddressIndex from './view/member/MemberAddressIndex';
import MemberAddressDetail from './view/member/MemberAddressDetail';
import DeliveryOrderIndex from './view/delivery_order/DeliveryOrderIndex';
import DeliveryOrderDetail from './view/delivery_order/DeliveryOrderDetail';
import TradeCheck from './view/trade/TradeCheck';
import TradeIndex from './view/trade/TradeIndex';
import TradeDetail from './view/trade/TradeDetail';
import TradeConfirm from './view/trade/TradeConfirm';
import ExpressIndex from './view/ExpressIndex';
import Qrcode from './view/Qrcode';
import CertificateIndex from './view/certificate/CertificateIndex';
import CertificateWechatAdd from './view/certificate/CertificateWechatAdd';
import CertificateOtherAdd from './view/certificate/CertificateOtherAdd';

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
                    <Route path="article/index" component={ArticleIndex}/>
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
                <Route path="delivery/order/index" component={DeliveryOrderIndex}/>
                <Route path="delivery/order/add" component={DeliveryOrderDetail}/>
                <Route path="delivery/order/edit/:delivery_order_id" component={DeliveryOrderDetail}/>
                <Route path="trade/check" component={TradeCheck}/>
                <Route path="trade/index/:trade_flow" component={TradeIndex}/>
                <Route path="trade/edit/:trade_id" component={TradeDetail}/>
                <Route path="trade/confirm/:trade_id" component={TradeConfirm}/>
                <Route path="express/index/:express_id" component={ExpressIndex}/>
                <Route path="qrcode" component={Qrcode}/>
                <Route path="certificate/index" component={CertificateIndex}/>
                <Route path="certificate/wechat/add" component={CertificateWechatAdd}/>
                <Route path="certificate/other/add" component={CertificateOtherAdd}/>
                <Route path="team/index" component={TeamIndex}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
