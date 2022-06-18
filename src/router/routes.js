
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import('@/views/Rank')
  },
  {
    path: '/rank/detail',
    name: 'RankDetail',
    component: () => import('@/views/Detail/RankDetail')
  },
  {
    path: '/songdetail',
    name: 'SongDetail',
    component: () => import('@/views/Detail/SongDetail')
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: () => import('@/views/PlayList')
  },
  {
    path: '/playlist/detail',
    name: 'PlayListDetail',
    component: () => import('@/views/Detail/PlayListDetail')
  },
  {
    path: '/artist',
    name: 'Artist',
    component: () => import('@/views/Artist')
  },
  {
    path: '/artist/detail',
    name: 'ArtistDetail',
    component: () => import('@/views/Detail/ArtistDetail')
  },
  {
    path: '/mv',
    name: 'MV',
    component: () => import('@/views/MV')
  },
  {
    path: '/mv/detail',
    name: 'MvDetail',
    component: () => import('@/views/Detail/MvDetail')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]
