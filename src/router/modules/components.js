/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'
const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  alwaysShow: true,
  name: 'ComponentDemo',
  meta: {
    title: '用户管理',
    icon: 'component'
  },


  children: [
    {
      path: 'LDAP',
      component: () => import('@/views/user-manager/ldap'),
      name: 'LDAP管理',
      meta: { title: 'LDAP管理' }
    },

  ]
}

export default componentsRouter
