import * as types from '../actions/types'

export default (state = {}, action = { log: []}) => {
  switch(action.type) {
    case types.START_SYNC:
      return action.log
    default: return state
  }
}
