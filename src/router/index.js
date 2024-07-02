import Vue from 'vue'
import VueRouter from 'vue-router'

import { Layout } from '@/layouts/index'

import NextPageInfo from './next-page/routes'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const routes = [
  ...NextPageInfo,
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/forget',
    name: 'forget',
    component: () => import('@/views/forget'),
    hidden: true
  },
  {
    path: '/share',
    name: 'share',
    component: () => import('@/views/share'),
    hidden: true
  },
  {
    path: '/personal',
    name: 'personal',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'center',
        name: 'personalCenter',
        component: () => import('@/views/personal'),
        meta: {
          title: 'Personal Center'
        }
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'rich-text',
        name: 'richText',
        component: () => import('@/views/editor/rich-text'),
        meta: {
          title: 'Document editing'
        }
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'rich-text-group',
        name: 'richTextGroup',
        component: () => import('@/views/editor/rich-text-group'),
        meta: {
          title: 'Team document editing'
        }
      }
    ]
  },
  {
    path: '/editor',
    name: 'editor',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'rich-text-readonly',
        name: 'richTextReadOnly',
        component: () => import('@/views/editor/rich-text-readonly'),
        meta: {
          title: 'Read-only documents'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'table-template',
        name: 'tableTemplate',
        component: () => import('@/views/list/table-template'),
        meta: {
          title: 'Template selection'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-latest',
        name: 'tableLatest',
        component: () => import('@/views/list/table-latest'),
        meta: {
          title: 'Recently viewed files'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-like',
        name: 'tableLike',
        component: () => import('@/views/list/table-like'),
        meta: {
          title: 'Recent favorites'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-created',
        name: 'tableCreated',
        component: () => import('@/views/list/table-created'),
        meta: {
          title: 'Personal documents'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-share',
        name: 'tableShare',
        component: () => import('@/views/list/table-share'),
        meta: {
          title: 'Share with me'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-group',
        name: 'tableGroup',
        component: () => import('@/views/list/table-group'),
        meta: {
          title: 'Team Spaces'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'table-group-file',
        name: 'tableGroupFile',
        component: () => import('@/views/list/table-group-file'),
        meta: {
          title: 'Team files'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'table-group-member',
        name: 'tableGroupMember',
        component: () => import('@/views/list/table-group-member'),
        meta: {
          title: 'Team members'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-recover',
        name: 'tableRecover',
        component: () => import('@/views/list/table-recover'),
        meta: {
          title: 'Personal file recycle bin'
        }
      }
    ]
  },
  {
    path: '/list',
    name: 'list',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'table-group-recover',
        name: 'tableGroupRecover',
        component: () => import('@/views/list/table-group-recover'),
        meta: {
          title: 'Team file recycle bin'
        }
      }
    ]
  },
  {
    path: '/',
    name: 'root',
    redirect: '/login',
    hidden: true
  },
  {
    path: '/index/main',
    name: 'main',
    redirect: '/list/table-latest',
    hidden: true
  }
]

const createRouter = () => new VueRouter({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
