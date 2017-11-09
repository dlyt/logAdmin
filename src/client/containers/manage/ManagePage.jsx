import React from 'react'
import './manage.less'
import { Button, message, Select, Input, Spin } from 'antd'
import { sync } from '../../actions/syncActions'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'

const Option = Select.Option;

class Manage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      type: 'syncHotel',
      disabled: false,
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.startSync = this.startSync.bind(this)
  }

  handleChange(val) {
    this.setState({ type: val })
  }

  startSync() {
    this.setState({ disabled: true, loading: true })
    this.props.sync(this.state.type).then(
      (res) => this.setState({ disabled: false, loading: false }),
      (err) => console.log(err)
    )
  }

  render() {
    const { disabled } = this.state
    let { log } = this.props
    if (isEmpty(log)) {
      log = ''
    }
    return(
      <div>
        <div>
          <Select defaultValue="syncHotel" style={{ width: 120 }} onChange={this.handleChange}>
            <Option value="syncHotel">同步婚宴</Option>
            <Option value="syncRegion">同步区域</Option>
          </Select>
          <Button disabled={disabled} className='sync-btn' onClick={this.startSync}>开始</Button>
        </div>
        <div className='sync-text'>
          <Spin spinning={this.state.loading}>
            <Input type="textarea" placeholder="" value={log} rows={20} />
          </Spin>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    log: state.sync
  }
}

export default connect(mapStateToProps, { sync })(Manage);
