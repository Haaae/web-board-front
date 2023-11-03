import api from './api'

const myPageStore = {
  namespaced: true,
  state: {
    username: '',
    nickname: '',
    postCount: 0,
    commentCount: 0,

    postPage: {
      page: 1,
      pageCount: 1,
      size: 12,
      posts: []
    },

    commentPage: {
      page: 1,
      pageCount: 1,
      size: 30,
      comments: []
    }
  },

  getters: {
    totalCount(state) {
      return state.postCount + state.commentCount
    }
  },

  mutations: {
    fetchMyPage(state, payload) {
      state.username = payload.username
      state.nickname = payload.nickname
      state.postCount = payload.postCount
      state.commentCount = payload.commentCount
    },
    fetchPostInfo(state, payload) {
      state.postPage.posts = payload.posts
      state.postPage.pageCount = payload.pageCount
    },
    fetchCommentInfo(state, payload) {
      state.commentPage.comments = payload.comments
      state.commentPage.pageCount = payload.pageCount
    },
    updatePostPage(state, payload) {
      state.postPage.page = payload
    },
    updateCommentPage(state, payload) {
      state.commentPage.page = payload
    }
  },

  actions: {
    async fetchMyPage({ commit }) {

      await api.fetchMyPage()
      .then((reseponse) => {
        commit('fetchMyPage', reseponse.data)
      })
    },
    async fetchMyPost({ commit }, payload) {
      await api.fetchMyPost(payload.size, payload.page - 1)
      .then(response => {
        commit('fetchPostInfo', {
          posts: response.data.content,
          pageCount: response.data.totalPages
        })
      })
    },
    async fetchMyComment({ commit }, payload) {
      await api.fetchMyComment(payload.size, payload.page - 1)
      .then(response => {
        commit('fetchCommentInfo', {
          comments: response.data.content,
          pageCount: response.data.totalPages
        })
      })
    }
  }
}

export default myPageStore;
