import api from '../utils/api'

const postListStore = {
  namespaced: true,
  state: {
    page: 1,
    pageCount: 1,
    size: 12,
    posts: [],
  },

  getters: {
  },

  mutations: {
    fetchPageInfo(state, payload) {
      state.posts = payload.posts
      state.pageCount = payload.pageCount
    },
    updatePageInfo(state, payload) {
      state.page = payload
    }
  },

  actions: {
    async fetchPostList({ commit }, payload) {

      await api.fetchPosts(payload.size, payload.page - 1)
      .then(response => {
        commit('fetchPageInfo', {posts: response.data.content, pageCount: response.data.totalPages})
      })
    },
  }
}

export default postListStore;
