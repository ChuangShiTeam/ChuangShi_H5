import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import Home from './view/Home';
import Main from './view/Main';
import Index from './view/Index';
import TeamIndex from './view/team/TeamIndex';
import ProductBrandIndex from './view/product_brand/ProductBrandIndex';
import ProductBrandDetail from './view/product_brand/ProductBrandDetail';
import Cart from './view/Cart';
import ProductDetail from './view/ProductDetail';
import KnowledgeIndex from './view/knowledge/KnowledgeIndex';
import KnowledgeBrandIndex from './view/knowledge/KnowledgeBrandIndex';
import KnowledgeBrandDetail from './view/knowledge/KnowledgeBrandDetail';
import KnowledgeBeginnerIndex from './view/knowledge/KnowledgeBeginnerIndex';
import KnowledgeVideoIndex from './view/knowledge/KnowledgeVideoIndex';
import KnowledgeActivityIndex from './view/knowledge/KnowledgeActivityIndex';
import KnowledgeElitenIndex from './view/knowledge/KnowledgeElitenIndex';
import KnowledgeIecturerIndex from './view/knowledge/KnowledgeIecturerIndex';
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
import MemberChildrenPurchaseOrderIndex from './view/member/MemberChildrenPurchaseOrderIndex';
import MemberPurchaseOrderCheck from './view/member_purchase_order/MemberPurchaseOrderCheck';
import MemberPurchaseOrderIndex from './view/member_purchase_order/MemberPurchaseOrderIndex';
import MemberPurchaseOrderDetail from './view/member_purchase_order/MemberPurchaseOrderDetail';
import MemberPurchaseOrderConfirm from './view/member_purchase_order/MemberPurchaseOrderConfirm';
import MemberDeliveryOrderIndex from './view/member_delivery_order/MemberDeliveryOrderIndex';
import MemberDeliveryOrderDetail from './view/member_delivery_order/MemberDeliveryOrderDetail';
import MemberDeliveryOrderWarehouseReplaceDeliver from './view/member_delivery_order/MemberDeliveryOrderWarehouseReplaceDeliver';
import TradeCheck from './view/trade/TradeCheck';
import TradeIndex from './view/trade/TradeIndex';
import TradeDetail from './view/trade/TradeDetail';
import TradeConfirm from './view/trade/TradeConfirm';
import ExpressIndex from './view/ExpressIndex';
import Qrcode from './view/Qrcode';
import CertificateIndex from './view/certificate/CertificateIndex';
import CertificateWechatAdd from './view/certificate/CertificateWechatAdd';
import CertificateOtherAdd from './view/certificate/CertificateOtherAdd';
import CertificateConfirm from './view/certificate/CertificateConfirm';
import EnchashmentIndex from './view/enchashment/EnchashmentIndex';
import EnchashmentDetail from './view/enchashment/EnchashmentDetail';
import MemberChildrenAddressIndex from './view/member/MemberChildrenAddressIndex';

import constant from './util/constant';
import notification from './util/notification';

function RouterConfig({history}) {

    const handleEnter = function (next, replace, callback) {
        callback();
    };

    const handleChange = function (next, replace, callback) {
        notification.emit('notification_main_load', {
            path: replace.location.pathname
        });

        callback();
    };

    return (
        <Router history={history}>
            <Route path="/">
                <IndexRedirect to={constant.index}/>
                <Route path="home" component={Home}/>
                <Route component={Main} onEnter={handleEnter} onChange={handleChange}>
                    <Route path="/index" component={Index}/>
                    <Route path="/team" component={TeamIndex}/>
                    <Route path="/product/brand/index" component={ProductBrandIndex}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/product/:product_id" component={ProductDetail}/>
                    <Route path="/knowledge/index" component={KnowledgeIndex}/>
                    <Route path="/my" component={My}/>
                    <Route path="/manage" component={Manage}/>

                    <Route path="/member/index/:member_id" component={MemberIndex}/>
                    <Route path="/member/children/purchase/order/index/:member_id" component={MemberChildrenPurchaseOrderIndex}/>
                </Route>
                <Route path="/product/detail/:product_id" component={ProductDetail}/>
                <Route path="/category/:category_id" component={Category}/>
                <Route path="/member/trade/index/:member_id" component={MemberTradeIndex}/>
                <Route path="/member/stock/index/:member_id" component={MemberStockIndex}/>
                <Route path="/member/bill/index/:member_id" component={MemberBillIndex}/>
                <Route path="/member/level/:member_id" component={MemberLevel}/>
                <Route path="/member/address/index/:type" component={MemberAddressIndex}/>
                <Route path="/member/address/add" component={MemberAddressDetail}/>
                <Route path="/member/address/edit/:member_address_id" component={MemberAddressDetail}/>
                <Route path="/member/purchase/order/check" component={MemberPurchaseOrderCheck}/>
                <Route path="/member/purchase/order/index/:member_purchase_order_flow" component={MemberPurchaseOrderIndex}/>
                <Route path="/member/purchase/order/edit/:member_purchase_order_id" component={MemberPurchaseOrderDetail}/>
                <Route path="/member/purchase/order/confirm/:member_purchase_order_id" component={MemberPurchaseOrderConfirm}/>
                <Route path="/member/delivery/order/index" component={MemberDeliveryOrderIndex}/>
                <Route path="/member/delivery/order/view/:member_delivery_order_id" component={MemberDeliveryOrderDetail}/>
                <Route path="/member/delivery/order/warehouse/replace/deliver" component={MemberDeliveryOrderWarehouseReplaceDeliver}/>
                <Route path="/member/children/address/:member_id" component={MemberChildrenAddressIndex}/>
                <Route path="/trade/check" component={TradeCheck}/>
                <Route path="/trade/index/:trade_flow" component={TradeIndex}/>
                <Route path="/trade/edit/:trade_id" component={TradeDetail}/>
                <Route path="/trade/confirm/:trade_id" component={TradeConfirm}/>
                <Route path="/express/index/:express_id" component={ExpressIndex}/>
                <Route path="/qrcode" component={Qrcode}/>
                <Route path="/certificate/index" component={CertificateIndex}/>
                <Route path="/certificate/wechat/add" component={CertificateWechatAdd}/>
                <Route path="/certificate/other/add" component={CertificateOtherAdd}/>
                <Route path="/certificate/confirm/:certificate_id" component={CertificateConfirm}/>
                <Route path="/team/index" component={TeamIndex}/>
                <Route path="/team/first/index" component={TeamIndex}/>
                <Route path="/product/brand/detail/:product_brand_id" component={ProductBrandDetail}/>
                <Route path="/knowledge/brand/index" component={KnowledgeBrandIndex}/>
                <Route path="/knowledge/brand/detail" component={KnowledgeBrandDetail}/>
                <Route path="/knowledge/beginner/index" component={KnowledgeBeginnerIndex}/>
                <Route path="/knowledge/video/index" component={KnowledgeVideoIndex}/>
                <Route path="/knowledge/activity/index" component={KnowledgeActivityIndex}/>
                <Route path="/knowledge/eliten/index" component={KnowledgeElitenIndex}/>
                <Route path="/knowledge/iecturer/index" component={KnowledgeIecturerIndex}/>
                <Route path="/enchashment/index" component={EnchashmentIndex}/>
                <Route path="/enchashment/add" component={EnchashmentDetail}/>
                <Route path="/enchashment/edit/:enchashment_id" component={EnchashmentDetail}/>
            </Route>
        </Router>
    );
}

export default RouterConfig;
