import api from '../utils/api'
import router from '@/router'

class User {
  constructor(userDto) {
    this.isLoginUser = true
    this.id = userDto.id
    this.nickname = userDto.nickname
    this.role = userDto.role
  }
}

const userStore = {
  namespaced: true,
  state: {
    user: {
      isLoginUser : false,
      id : Number,
      nickname : String,
      role: String,
    }
  },

  getters: {
    userId(state) {
      return state.user.id
    },
    isLoginUser(state) {
      return state.user.isLoginUser
    },
  },

  mutations: {
    login(state, payload) {
      state.user = new User(payload)
    },
    resetUser(state) {
      state.user = {
        isLoginUser : false,
        id : Number,
        nickname : String,
        role : String
      }
    },
  },

  actions: {
    async login({ commit }, loginDto) {
      api.doLogin(loginDto)
      .then(response => {
        commit('login', response.data)
      })
    },
    async logout({ commit }) {
      await api.doLogout()
      .then(() => {
        commit('resetUser')
        router.go(0)
      })
    }
  }
}

export default userStore;
