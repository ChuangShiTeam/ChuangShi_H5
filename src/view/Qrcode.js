import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import http from '../util/http';

class Qrcode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      qrcode: '',
    };
  }

  componentDidMount() {
    document.title = '我的二维码';

    document.body.scrollTop = 0;

    this.handleLoad();
  }

  componentWillUnmount() {

  }

  handleLoad() {
    http.request({
      url: '/member/qrcode/find',
      data: {},
      success: function (data) {
        this.setState({
          qrcode: data,
        });
      }.bind(this),
      complete() {

      },
    });
  }

  handleBack() {
    this.props.dispatch(routerRedux.goBack());
  }

  render() {
    return (
      <div>
          {
              this.state.qrcode === '' ?
                  ''
                  :
                  <img
                      src={this.state.qrcode} style={{
                      width: '100%',
                  }}
                      alt=""
                  />
          }
          {
              this.state.is_load && this.state.qrcode === '' ?
                  <div>
                    <img src={require('../assets/svg/empty.svg')} className="empty-image" alt=""/>
                    <div className="empty-text">没有数据</div>
                  </div>
                  :
                  ''
          }
      </div>
    );
  }
}

Qrcode.propTypes = {};

export default connect(() => ({}))(Qrcode);
