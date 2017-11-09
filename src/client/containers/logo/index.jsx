import React from 'react';
import './logo.less';


class Logo extends React.PureComponent {
  render() {
    return (
      <div className='ant-layout-logo-normal'>
        <div className="ant-layout-logo-text">
          <a href="#">管理系统</a>
        </div>
      </div>
    )
  }
}

export default Logo
