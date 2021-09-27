import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}
export function getLdapUserList(query) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/ldap/api/v1',
    method: 'get',
    params: query
  })
}


export function postLdapUserList(data) {
  return request({
    url: 'https://op-apis.mumway.com/op-cicd-api/ldap/api/v1',
    method: 'post',
    data
  })
}


export function deletedapUserList(data) {
  return request({
    url: `https://op-apis.mumway.com/op-cicd-api/ldap/api/v1`,
    method: 'delete',
    data
  })
}




export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
