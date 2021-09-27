import request from '@/utils/request'

export function getEcsList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/ecs/hosts/',
    method: 'get',
    params: query
  })
}

export function getUpdataEcsList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/ecs/hosts/',
    method: 'get',
    params: query
  })
}


export function getDnsList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/dns/domain/parsing/',
    method: 'get',
    params: query
  })
}

export function getUpdataDnsList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/dns/domain/parsing/',
    method: 'get',
    params: query
  })
}

export function postDnsList(data) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/dnsparsing/index.json',
    method: 'post',
    data
  })
}


export function deleteDnsParsing(data) {
  return request({
    url: `https://op-apis.mumway.com/op-alicloud-api/dnsparsing/index.json`,
    method: 'delete',
    data
  })
}

export function putEditDnsParsing(data) {
  return request({
    url: `https://op-apis.mumway.com/op-alicloud-api/rds/instance/database/`,
    method: 'put',
    data
  })
}

export function getRdsList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/rds/instance/database/',
    method: 'get',
    params: query
  })
}

export function updataRdsList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/rds/instance/database/',
    method: 'get',
    params: query
  })
}




export function postRdsList(data) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/rds/instance/database/',
    method: 'post',
    data
  })
}


export function deleteRdsApp(data) {
  return request({
    url: `https://op-apis.mumway.com/op-alicloud-api/rds/instance/database/`,
    method: 'delete',
    data
  })
}

export function putEditRdsApp(data) {
  return request({
    url: `https://op-apis.mumway.com/op-alicloud-api/rds/instance/database/`,
    method: 'put',
    data
  })
}



export function getPrivateDnsList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/private/domain/parsing/',
    method: 'get',
    params: query
  })
}

export function getUpdataPrivdnsList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/private/domain/parsing/',
    method: 'get',
    params: query
  })
}

export function getUpdataPrivdnsListtwo(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/private/domain/',
    method: 'get',
    params: query
  })
}


export function postPrivateDnsList(data) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/private/domain/parsing/',
    method: 'post',
    data
  })
}

export function deletePrivateDns(data) {
  return request({
    url: `https://op-apis.mumway.com/op-alicloud-api/private/domain/parsing/`,
    method: 'delete',
    data
  })
}

export function putEditPrivateDns(data) {
  return request({
    url: `https://op-apis.mumway.com/op-alicloud-api/private/domain/parsing/`,
    method: 'put',
    data
  })
}

export function getRedisList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/redis/instance/',
    method: 'get',
    params: query
  })
}

export function getupdataRedisList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/redis/instance/',
    method: 'get',
    params: query
  })
}

export function getupdataRedisDatabaseListtwo(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/rds/instance/database/',
    method: 'get',
    params: query
  })
}


export function postRedisList(data) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/redis/instance/',
    method: 'post',
    data
  })
}



export function deleteRedis(data) {
  return request({
    url: `https://op-apis.mumway.com/op-alicloud-api/redis/instance/`,
    method: 'delete',
    data
  })
}

export function putEditRedis(data) {
  return request({
    url: `https://op-apis.mumway.com/op-alicloud-api/redis/instance/`,
    method: 'put',
    data
  })
}


export function getSlbList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/slb/loadbalancer/',
    method: 'get',
    params: query
  })
}
export function getSlbUpdataList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-alicloud-api/slb/loadbalancer/',
    method: 'get',
    params: query
  })
}
