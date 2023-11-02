import api from './api'
import router from '@/router'

class User {
  constructor(userDto) {
    this.id = userDto.id
    this.nickname = userDto.nickname
    this.role = userDto.role
  }
}

const userStore = {
  namespaced: true,
  state: {
    isLoginUser : false,
    user: {
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
      return state.isLoginUser
    },
  },

  mutations: {
    login(state, payload) {
      state.user = new User(payload)
      state.isLoginUser = true
    },
    resetUser(state) {
      state.isLoginUser = false,
      state.user = {
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
