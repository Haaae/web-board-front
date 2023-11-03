import Send from '../../utils/interceptor'

const GET = 'get'

const MYPAGE_URL = '/mypage'

export default {
  fetchMyPage() {
    return Send({
      url: MYPAGE_URL,
      method: GET,
    })
  },
  fetchMyPost(size, page) {
    return Send({
      url: MYPAGE_URL + '/posts?size=' + size + '&page=' + page,
      method: GET
    })
  },
  fetchMyComment(size, page) {
    return Send({
      url: MYPAGE_URL + '/comments?size=' + size + '&page=' + page,
      method: GET
    })
  }
}

