import Send from '../../utils/interceptor'

const POST_URL_PREFIX = '/posts/'
const COMMENT_URL_PREFIX = '/comments'
const SLASH = '/'

const GET = 'get'
const POST = 'post'
const DELETE = 'delete'
const PATCH = 'patch'

export default {

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

