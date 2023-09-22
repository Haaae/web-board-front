import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import userStore from './modules/userStore'
import postListStore from './modules/postListSotre'
import postDetailStore from './modules/postDetailStore'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    userStore: userStore,
    postListStore: postListStore,
    postDetailStore: postDetailStore
  },

  plugins: [
    //주목! : 여기에 쓴 모듈만 로컬 스토리지에 저장됩니다.
    createPersistedState({
      paths: ['userStore'],
    })
  ]
})
