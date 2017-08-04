import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {ActivityIndicator, List, WhiteSpace} from 'antd-mobile';

import http from '../../util/http';

class EnchashmentIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            bill_amount: 0,
            list: '',
        };
    }

    componentDidMount() {
        document.title = '我要提现';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/mobile/enchashment/list',
            data: {},
            success: function (data) {
                this.setState({
                    bill_amount: data.bill_amount,
                    list: data.list,
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this)
        });
    }

    handleAdd() {
        this.props.dispatch(routerRedux.push({
            pathname: '/enchashment/add',
            query: {}
        }));
    }

    render() {
        return (
            <div>
                <WhiteSpace size="lg"/>
                {
                    this.state.list.length > 0 ?
                        <List>
                            {
                                this.state.list.map((item) => {
                                    return (
                                        <div></div>
                                    );
                                })
                            }
                        </List>
                        :
                        ''
                }
                {
                    this.state.is_load && this.state.list.length === 0 ?
                        <div>
                            <img src={require('../../assets/svg/empty.svg')} className="empty-image" alt=""/>
                            <div className="empty-text">没有数据</div>
                        </div>
                        :
                        ''
                }
                <WhiteSpace size="lg"/>
                <div style={{height: '200px'}}></div>
                {
                    this.state.bill_amount > 0 ?
                        <div className="footer">
                            <div className="footer-buttom" onClick={this.handleAdd.bind(this)}>
                                新增
                            </div>
                        </div>
                        :
                        ''
                }
                <div className={'loading-mask ' + (this.state.is_load ? 'loading-mask-hide' : '')}>
                    <div className="loading"><ActivityIndicator/></div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(EnchashmentIndex);
