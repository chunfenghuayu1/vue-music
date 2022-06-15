
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
    path: '/playlist',
    name: 'PlayList',
    component: () => import('@/views/PlayList')
  },
  {
    path: '/artist',
    name: 'Artist',
    component: () => import('@/views/Artist')
  },
  {
    path: '/mv',
    name: 'MV',
    component: () => import('@/views/MV')
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
