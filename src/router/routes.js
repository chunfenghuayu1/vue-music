
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/Home')
  },
  {
    path: '/rank',
    name: 'Rank',
    component: () => import(/* webpackChunkName: "Rank"  */ '@/views/Rank')
  },
  {
    path: '/rank/detail',
    name: 'RankDetail',
    component: () => import(/* webpackChunkName: "RankDetail" */ '@/views/Detail/RankDetail')
  },
  {
    path: '/songdetail',
    name: 'SongDetail',
    component: () => import(/* webpackChunkName: "SongDetail" */ '@/views/Detail/SongDetail')
  },
  {
    path: '/playlist',
    name: 'PlayList',
    component: () => import(/* webpackChunkName: "PlayList" */ '@/views/PlayList')
  },
  {
    path: '/artist',
    name: 'Artist',
    component: () => import(/* webpackChunkName: "Artist"  */ '@/views/Artist')
  },
  {
    path: '/artist/detail',
    name: 'ArtistDetail',
    component: () => import(/* webpackChunkName: "ArtistDetail" */ '@/views/Detail/ArtistDetail')
  },
  {
    path: '/mv',
    name: 'MV',
    component: () => import(/* webpackChunkName: "MV"  */ '@/views/MV')
  },
  {
    path: '/mv/detail',
    name: 'MvDetail',
    component: () => import(/* webpackChunkName: "MvDetail" */ '@/views/Detail/MvDetail')
  }
]
