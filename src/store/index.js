import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import userStore from './modules/user/userStore'
import postListStore from './modules/postList/postListSotre'
import postDetailStore from './modules/postDetail/postDetailStore'
import myPageStore from './modules/mypage/myPageStore';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    userStore: userStore,
    postListStore: postListStore,
    postDetailStore: postDetailStore,
    myPageStore: myPageStore
  },

  plugins: [
    //주목! : 여기에 쓴 모듈만 로컬 스토리지에 저장됩니다.
    createPersistedState({
      paths: ['userStore'],
    })
  ]
})
