import Send from '../../utils/interceptor'

const User_URL_PREFIX = '/users/'

const GET = 'get'
const POST = 'post'
const DELETE = 'delete'

export default {
  withdrawal() {
    return Send({
      url: '/users',
      method: DELETE
    })
  },
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
}

