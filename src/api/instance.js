import request from '@/utils/request'

export function getInstanceList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/instance/api/v1',
    method: 'get',
    params: query
  })
}

export function getAppnameList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/app/api/v1',
    method: 'get',
    params: query
  })
}


export function postInstance(data) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/instance/api/v1',
    method: 'post',
    data
  })
}

export function deleteInstance(data) {
  return request({
    url: `https://op-apis.mumway.com/op-cicd-api/instance/api/v1`,
    method: 'delete',
    data
  })
}

export function putEditInstance(data) {
  return request({
    url: `https://op-apis.mumway.com/op-cicd-api/instance/api/v1`,
    method: 'put',
    data
  })
}