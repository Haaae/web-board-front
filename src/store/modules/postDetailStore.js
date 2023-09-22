import api from '../utils/api'
import router from '@/router'
import { format, register } from 'timeago.js'
import koLocale from 'timeago.js/lib/lang/ko'

register('ko', koLocale)

class Post {
    constructor(postDto) {
      this.content = postDto.content
      this.createdDate = format(postDto.createdDate, 'ko')
      this.hits = postDto.hits
      this.isModified = postDto.isModified
      this.id = postDto.postId
      this.title = postDto.title
      this.writer = postDto.writer
      this.writerId = postDto.writerId
      this.newComment = ''
    }
  }
  class Comment {
    constructor(commentDto) {
      this.id = commentDto.commentId
      this.content = commentDto.content
      this.createdDate = format(commentDto.createdDate, 'ko')
      this.isDeleted = commentDto.isDeleted
      this.isModified = commentDto.isModified
      this.showReplyForm = false
      this.type = commentDto.type
      this.writer = commentDto.writer
      this.writerId = commentDto.writerId
      this.newReply = ''

      this.replies = []
      if (commentDto.replies) {
        commentDto.replies.forEach(reply => {
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
          post: response.data.postDto,
          comments: response.data.commentDtos
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