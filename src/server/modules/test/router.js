import * as test from './controller'

export const baseUrl = '/test'

export default [
  {
    method: 'POST',
    route: '/',
    handlers: [
      test.index
    ]
  },
  {
    method: 'GET',
    route: '/img',
    handlers: [
      test.getImgs
    ]
  },
]
