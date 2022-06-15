import Vue from 'vue'
import Vuex from 'vuex'
import home from './Home'
import playList from './PlayList'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    home,
    playList
  }
})
