import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home'
import playList from './PlayList'
import artist from './Artist/'
import mv from './Mv'
import songDetail from './SongDetail'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    home,
    playList,
    artist,
    mv,
    songDetail
  }
})
