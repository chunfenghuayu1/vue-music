import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home'
import playList from './PlayList'
import artist from './Artist/'
import mv from './Mv'
import songDetail from './SongDetail'
import rankListDetail from './RankListDetail'
import artistDetail from './ArtistDetail'
import playBar from './PlayBar'
import login from './Login'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    home,
    playList,
    artist,
    mv,
    songDetail,
    rankListDetail,
    artistDetail,
    playBar,
    login
  }
})
