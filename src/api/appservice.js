import request from '@/utils/request'

export function getAnsibleList(query) {
  return request({
    url: 'http://8.140.162.160/ansible/host/v1',
    method: 'get',
    params: query
  })
}