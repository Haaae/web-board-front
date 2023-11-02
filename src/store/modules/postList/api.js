import Send from '../../utils/interceptor'

const GET = 'get'

export default {

  fetchPosts(size, page) {
    return Send({
      url: '/posts?size=' + size + '&page=' + page,
      method: GET
    })
  },
}

