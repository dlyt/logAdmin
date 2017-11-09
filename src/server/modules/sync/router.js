import * as sync from './controller'

export const baseUrl = '/sync'

export default [
  {
    method: 'GET',
    route: '/',
    handlers: [
      sync.start
    ]
  }
]
