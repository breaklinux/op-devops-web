import request from '@/utils/request'

export function getProjectList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/app/api/v1',
    method: 'get',
    params: query
  })
}

export function getEnvList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/app/envlist/v1',
    method: 'get',
    params: query
  })
}



export function getReleaseList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/app/release/v1',
    method: 'get',
    params: query
  })
}

export function getDevelopmentLanguageList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/app/langlist/v1',
    method: 'get',
    params: query
  })
}


export function postSoftpackage(data) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/app/searchpack/v1',
    method: 'post',
    data
  })
}

export function postDeployCicdPushData(data) {
  return request({
    url:'https://op-apis.mumway.com/op-cicd-api/jenkins/api/v1',
    method: 'post',
    data
  })
}

export function postApiList(data) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/app/api/v1',
    method: 'post',
    data
  })
}

export function deleteHost(data) {
  return request({
    url: `https://op-apis.mumway.com/op-cicd-api/app/api/v1`,
    method: 'delete',
    data
  })
}

export function putEditHost(data) {
  return request({
    url: `https://op-apis.mumway.com/op-cicd-api/app/api/v1`,
    method: 'put',
    data
  })
}

export function getInstanceIP(name,dev) {
  return request({
    url: `https://op-apis.mumway.com/op-cicd-api/instance/api/v1?appname=${name}&env=${dev}`,
    method: 'get',

  })
}