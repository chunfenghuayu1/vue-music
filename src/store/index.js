import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home'
import playList from './PlayList'
import artist from './Artist/'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    home,
    playList,
    artist
  }
})
