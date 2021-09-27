import request from '@/utils/request'

export function getList(query) {
  return request({
    url: 'https://op-apis.breaklinux.com/op-ansible-api/ansible/host/v1',
    method: 'get',
    params: query
  })
}

export function getEnvList(query) {
  return request({
    url: 'https://op-apis.breaklinux.com/op-ansible-api/ansible/module/v1',
    method: 'get',
    params: query
  })
}



export function postHostApiList(data) {
  return request({
    url: 'https://op-apis.breaklinux.com/op-ansible-api/ansible/host/v1',
    method: 'post',
    data
  })
}

export function deleteHost(data) {
  return request({
    url: `https://op-apis.breaklinux.com/op-ansible-api/ansible/host/v1`,
    method: 'delete',
    data
  })
}

export function putEditHost(data) {
  return request({
    url: `https://op-apis.breaklinux.com/op-ansible-api/ansible/host/v1`,
    method: 'put',
    data
  })
}

export function getInstanceIP(query) {
  return request({
    url: `https://op-apis.breaklinux.com/op-alicloud-api/ecs/hosts/`,
    method: 'get',
    params: query
  })
}



export function getChannelUuid(query) {
  return request({
    url: 'https://op-apis.breaklinux.com/op-ansible-api/channel/uuid/v1',
    method: 'get',
    params: query
  })
}
export function postChannelUuid(data) {
  return request({
    url: 'https://op-apis.breaklinux.com/op-ansible-api/channel/uuid/v1',
    method: 'post',
    data
  })
}

export function deleteChannelUuid(data) {
  return request({
    url: `https://op-apis.breaklinux.com/op-ansible-api/channel/uuid/v1`,
    method: 'delete',
    data
  })
}

export function putChannelUuid(data) {
  return request({
    url: `https://op-apis.breaklinux.com/op-ansible-api/channel/uuid/v1`,
    method: 'put',
    data
  })
}


export function getChannelIp(query) {
  return request({
    url: 'https://op-apis.breaklinux.com/op-ansible-api/channel/ip/v1',
    method: 'get',
    params: query
  })
}
export function postChannelIp(data) {
  return request({
    url: 'https://op-apis.breaklinux.com/op-ansible-api/channel/ip/v1',
    method: 'post',
    data
  })
}

export function deleteChannelIp(data) {
  return request({
    url: `https://op-apis.breaklinux.com/op-ansible-api/channel/ip/v1`,
    method: 'delete',
    data
  })
}

export function putChannelIp(data) {
  return request({
    url: `https://op-apis.breaklinux.com/op-ansible-api/channel/ip/v1`,
    method: 'put',
    data
  })
}

export function getAnsibleModule(query) {
  return request({
    url: 'https://op-apis.breaklinux.com/op-ansible-api/ansible/module/v1',
    method: 'get',
    params: query
  })
}

export function postAnsibleApi(data) {
  return request({
    url: 'https://op-apis.breaklinux.com/op-ansible-api/ansible/api/v1',
    method: 'post',
    data
  })
}
