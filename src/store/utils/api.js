import Send from './interceptor'

const User_URL_PREFIX = '/users/'
const POST_URL_PREFIX = '/posts/'
const COMMENT_URL_PREFIX = '/comments'
const SLASH = '/'

const GET = 'get'
const POST = 'post'
const DELETE = 'delete'
const PATCH = 'patch'

export default {
  join(data) {
    return Send({
      url: '/users',
      method: POST,
      data: data
    })
  },

  validateNickname(nickname) {
    return Send({
      url: '/users/nicknames/' + nickname + '/exist',
      method: GET
    })
  },

  doLogin(data) {
    return Send({
      url: User_URL_PREFIX + 'login',
      method: POST,
      data: data
    })
  },
  doLogout() {
    return Send({
      url: User_URL_PREFIX + 'logout',
      method: POST,
    })
  },

  validateUsername(username) {
    return Send({
      url: '/users/usernames/' + username + '/exist',
      method: GET
    })
  },
  sendVerificationCode(data) {
    return Send({
      url: '/users/emails/verification-requests',
      method: POST,
      data: data
    })
  },
  verificationUsername(data) {
    return Send({
      url: '/users/emails/verifications',
      method: POST,
      data: data
    })
  },

  fetchPosts(size, page) {
    return Send({
      url: '/posts?size=' + size + '&page=' + page,
      method: GET
    })
  },

  fetchPost(postId) {
    return Send({
      url: POST_URL_PREFIX + postId,
      method: GET
    })
  },
  createPost(data) {
    return Send({
      url: POST_URL_PREFIX.slice(0, -1),
      method: POST,
      data: data
    })
  },
  updatePost(data, postId) {
    return Send({
      url: POST_URL_PREFIX + postId,
      method: PATCH,
      data: data
    })
  },
  deletePost(postId) {
    return Send({
      url: POST_URL_PREFIX + postId,
      method: DELETE
    })
  },

  createComment(data, postId) {
    return Send({
      url: POST_URL_PREFIX + postId + COMMENT_URL_PREFIX,
      method: POST,
      data: data
    })
  },
  updateComment(data, postId, commentId) {
    return Send({
      url: POST_URL_PREFIX + postId + COMMENT_URL_PREFIX + SLASH + commentId,
      method: PATCH,
      data: data
    })
  },
  deleteComment(postId, commentId) {
    return Send({
      url: POST_URL_PREFIX + postId + COMMENT_URL_PREFIX + SLASH + commentId,
      method: DELETE
    })
  }

}

