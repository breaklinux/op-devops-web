import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/cicd',
    component: Layout,
    redirect: '/cicd/page',
    alwaysShow: true, // will always show the root menu
    name: '项目管理',
    meta: {
      title: '应用管理',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'Application',
        component: () => import('@/views/app-manager/application'),
        name: '应用管理',
        meta: {
          title: '发布管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'appservice',
        hidden: true,
        component: () => import('@/views/app-manager/appservice'),
        name: '服务管理',
        meta: {
          title: '服务管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'instance',
        component: () => import('@/views/instance-manager/instance.vue'),
        name: '实例管理',
        meta: {
          title: '实例管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'pipline',
        hidden: true,
        component: () => import('@/views/jenkins-pipeline/jenkins.vue'),
        name: '发布页面',
        meta: {
          title: '发布页面',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  },
  {
    path: '/aliyun',
    component: Layout,
    redirect: '/aliyun/page',
    alwaysShow: true, // will always show the root menu
    name: '云端资源管理',
    meta: {
      title: '云资源管理',
      icon: 'guide',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'ecs-manager',
        component: () => import('@/views/aliecs-manager/aliecs.vue'),
        name: 'ECS管理',
        meta: {
          title: 'ECS管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'ali-dns',
        component: () => import('@/views/aliecs-manager/alidns.vue'),
        name: 'DNS管理',
        meta: {
          title: 'DNS管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },{
        path: 'ali-RDS',
        component: () => import('@/views/aliecs-manager/alirds.vue'),
        name: 'RDS管理',
        meta: {
          title: 'RDS管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },{
        path: 'ali-private-dns',
        component: () => import('@/views/aliecs-manager/aliprivdns.vue'),
        name: 'PrivateDns',
        meta: {
          title: 'PrivateDns',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'ali-Redis',
        component: () => import('@/views/aliecs-manager/aliredis.vue'),
        name: 'Redis管理',
        meta: {
          title: 'Redis管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'ali-slb',
        component: () => import('@/views/aliecs-manager/slb.vue'),
        name: 'SLB管理',
        meta: {
          title: 'SLB管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
    ]
  },
  {
    path: '/ansible',
    component: Layout,
    redirect: '/ansible/page',
    alwaysShow: true, // will always show the root menu
    name: 'Ansible管理',
    meta: {
      title: 'Ansible管理',
      icon: 'guide',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'host-manager',
        component: () => import('@/views/ansible-manager/host.vue'),
        name: '主机管理',
        meta: {
          title: 'Inventory管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'ansible-uuid',
        component: () => import('@/views/ansible-manager/channel-uuid.vue'),
        name: '唯一id',
        meta: {
          title: '授权ID管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'channel-Ip',
        component: () => import('@/views/ansible-manager/channel-ip.vue'),
        name: 'IP白名单',
        meta: {
          title: '授权白名单',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'ansible-adhoc',
        component: () => import('@/views/ansible-manager/ad-hoc.vue'),
        name: '命令执行',
        meta: {
          title: 'adhoc管理',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  /** nestedRouter, **/
  { path: '*', redirect: '/404', hidden: true }]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234//issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router