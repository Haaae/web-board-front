import api from './api'
import router from '@/router'
import converTimeFormat from '@/utils/timeFomat.js'

class Post {
    constructor(post) {
      this.content = post.content
      this.createdDate = converTimeFormat(post.createdDate)
      this.hits = post.hits
      this.isEdited = post.isEdited
      this.id = post.postId
      this.title = post.title
      this.commentCount = post.commentCount
      this.writer = post.writer
      this.writerId = post.writerId
      this.newComment = ''
    }
  }
  class Comment {
    constructor(comment) {
      this.id = comment.commentId
      this.content = comment.content
      this.createdDate = converTimeFormat(comment.createdDate)
      this.isDeleted = comment.isDeleted
      this.isEdited = comment.isEdited
      this.showReplyForm = false
      this.type = comment.type
      this.writer = comment.writer
      this.writerId = comment.writerId
      this.newReply = ''

      this.replies = []
      if (comment.replies) {
        comment.replies
                .comments
                        .forEach(reply => {
          this.replies.push(new Comment(reply))
        })
      }
    }
  }

  const postDetailStore = {
    namespaced: true,
    state: {
      postDetailApiUrlPrefix: '/posts/',
      postDetail: {
        post: {},
        comments: []
      },
      COMMENT: 'COMMENT',
      REPLY: 'REPLY',
    },

  getters: {
    post(state) {
        return state.postDetail.post
    },
    comments(state) {
    return state.postDetail.comments
    },
  },

  mutations: {
    fetchPostDetail(state, payload) {
      state.postDetail.post = new Post(payload.post)
      state.postDetail.comments.splice(
        0, state.postDetail.comments.length
      )
      payload.comments.forEach(comment => {
        state.postDetail.comments.push(new Comment(comment))
      });
    },
    toggleShowReplyForm(state, comment) {
      comment.showReplyForm = !comment.showReplyForm
    }
  },

  actions: {
    async fetchPostDetail({ commit }, payload) {
      await api.fetchPost(payload)
      .then((response) => {
        commit('fetchPostDetail', {
          post: response.data.post,
          comments: response.data.comments.comments
        })
      })
    },

    async createPost(context, payload) {
      await api.createPost(payload)
      .then(response => {
        router.push({name: 'PostDetail', params: {postId: response.data.postId}})
      })
    },

    async deletePost({ state }) {
      await api.deletePost(state.postDetail.post.id)
      .then(router.push({name: 'PostList'}))
    },

    async updatePost({ state }, payload) {
      api.updatePost(payload, state.postDetail.post.id)
      .then(router.push({
        name: 'PostDetail',
        params: {
          postId: state.postDetail.post.id
        }
      }))
    },

    async createComment({ state }, payload) {
      await api.createComment(payload, state.postDetail.post.id)
      .then(router.go(0))
    },

    async updateComment({ state }, payload) {
      api.updateComment(
        {content: payload.content},
        state.postDetail.post.id,
        payload.commentId
      )
      .then(router.go(0))
    },

    async deleteComment({ state }, payload) {
      await api.deleteComment(state.postDetail.post.id, payload)
      .then(router.go(0))
    }
  }
}

export default postDetailStore;
