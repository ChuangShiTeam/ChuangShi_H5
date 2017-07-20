import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {WhiteSpace, List, Checkbox, Toast} from 'antd-mobile';

import constant from '../util/constant';
import http from '../util/http';

class MemberLevel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_load: false,
            member_level_id: '',
            member_level_list: []
        }
    }

    componentDidMount() {
        document.title = '重设等级';

        document.body.scrollTop = 0;

        this.handleLoad();
    }

    componentWillUnmount() {

    }

    handleLoad() {
        http.request({
            url: '/member/team/member/level/list',
            data: {
                member_id: this.props.params.member_id
            },
            success: function (data) {
                let member_level_id = '';
                for (let i = 0; i < data.length; i++) {
                    if (data[i].is_select) {
                        member_level_id = data[i].member_level_id;
                    }
                }

                this.setState({
                    member_level_id: member_level_id,
                    member_level_list: data
                });
            }.bind(this),
            complete: function () {
                this.setState({
                    is_load: true
                });
            }.bind(this),
        });
    }

    handleChange(member_level_id) {
        this.setState({
            member_level_id: member_level_id
        });
    }


    handleBack() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleSubmit() {
        if (this.state.member_level_id === '') {
            Toast.fail('请选择会员等级', constant.duration);

            return;
        }

        http.request({
            url: '/member/team/member/level/update',
            data: {
                member_id: this.props.params.member_id,
                member_level_id: this.state.member_level_id
            },
            success: function (data) {
                this.handleBack();
            }.bind(this),
            complete: function () {

            }
        });
    }

    render() {
        const CheckboxItem = Checkbox.CheckboxItem;

        return (
            <div>
                <WhiteSpace size="lg"/>
                {
                    this.state.member_level_list.length > 0 ?
                        <List>
                            {
                                this.state.member_level_list.map((item) => {
                                    return (
                                        <CheckboxItem key={item.member_level_id}
                                                   checked={item.member_level_id === this.state.member_level_id}
                                                   onChange={this.handleChange.bind(this, item.member_level_id)}>
                                            {item.member_level_name}
                                        </CheckboxItem>
                                    );
                                })
                            }
                        </List>
                        :
                        ''
                }
                {
                    this.state.is_load && this.state.member_level_list.length === 0 ?
                        <view>
                            <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                            <view className="empty-text">没有数据</view>
                        </view>
                        :
                        ''
                }
                <WhiteSpace size="lg"/>
                <div style={{height: '200px'}}></div>
                <div className="footer">
                    <div className="footer-buttom" onClick={this.handleSubmit.bind(this)}>提交</div>
                </div>
            </div>
        );
    }
}

export default connect(() => ({}))(MemberLevel);
