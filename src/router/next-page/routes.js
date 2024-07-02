import { Layout } from '@/layouts/index'
export default [
  {
    path: '/next-page',
    name: 'nextPage',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'info',
        name: 'nextPageInfo',
        component: () => import('@/views/next-page/details.vue'),
        meta: {
          title: 'Details on the next page'
        }
      }
    ]
  }
]
