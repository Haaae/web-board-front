import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);


export const store = new Vuex.Store({
  // user라는 state(data) 속성을 추가
  state: {

    user: {
      isLoginUser : false,
      id : -1,
      nickname : "",

    }
  },

  mutations: {
    loginToggle(state) {
      state.user.isLoginUser = !(state.user.isLoginUser)
    },
    successLogin(state, response) {
      console.log(response)
      state.user.isLoginUser = !(state.response.isLoginUser)
      state.user.id = response.id
      state.user.nickname = response.nickname
    },
    failLogin(state, error) {
      this.error = error
      alert(error.response.data.message)
      console.log("=== fail login ===")
      console.log(`error: ${error.response.data}`)
    }
  },

  actions: {
    login(context, loginDto) {
      console.log(`Try Login api == loginDto: ${loginDto}`)
			axios.post('/users/login', loginDto)
      .then(response => {

				console.log('### response: ' + JSON.stringify(response))
        context.commit("successLogin", response.data)
      })
      .catch(error => {
        if (error.response) {
          // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
          // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
          // node.js에서는 http.ClientRequest 인스턴스입니다.
          console.log(error.request);
        } else {
          // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(error.config);

        context.commit("failLogin", error)
      })
		}
  },

  getters: {
    // username(state) {
    //   return state.username
    // },
    // password(state) {
    //   return state.password
    // }
  }

})
