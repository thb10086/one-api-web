import request from '@/utils/request'

export function batchTestApiKey(data) {
  return request({
    url: '/channel/batchTestApiKey',
    method: 'post',
    data
  })
}

export function createChannel(data) {
  return request({
    url: '/channel/create',
    method: 'post',
    data
  })
}

export function testApiKey(data) {
  return request({
    url: '/channel/testApiKey',
    method: 'post',
    data
  })
}

export function queryChannel(parmes) {
  return request({
    url: '/channel/queryChannel',
    method: 'get',
    params:parmes
  })
}
