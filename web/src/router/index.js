import { createRouter, createWebHashHistory } from 'vue-router'
const Recommend = () =>
  import('@/views/recommend/index.vue' /* webpackChunkName: "recommend" */)
const Singer = () =>
  import('@/views/singer/index.vue' /* webpackChunkName: "singer" */)
const TopList = () =>
  import('@/views/top-list/index.vue' /* webpackChunkName: "top-list" */)
const Search = () =>
  import('@/views/search/index.vue' /* webpackChunkName: "search" */)
const SingerDetail = () =>
  import(
    '@/views/singer-detail/index.vue' /* webpackChunkName: "singer-detail" */
  )
const Album = () =>
  import('@/views/album/index.vue' /* webpackChunkName: "album" */)
const TopDetail = () =>
  import('@/views/top-detail/index.vue' /* webpackChunkName: "top-detail" */)
const UserCenter = () =>
  import('@/views/user-center/index.vue' /* webpackChunkName: "user-center" */)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/detail',
    component: Album
  },
  {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        meta: {
          hide: true
        },
        component: Album
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/user',
    meta: {
      hide: true
    },
    components: {
      user: UserCenter
    }
  }
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

export default router
