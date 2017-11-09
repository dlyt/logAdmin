import axios from 'axios'
import * as types from './types'

export function startSync(log) {
  return {
    type: types.START_SYNC,
    log
  }
}

export function sync(type) {
  return dispatch => {
    return axios.get(`/api/sync?type=${type}`).then(res => {
      dispatch(startSync(res.data.data))
    })
  }
}

