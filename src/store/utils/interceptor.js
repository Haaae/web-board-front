import axios from 'axios';
import { store } from '../index'
import router from '@/router'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 30000,
  withCredentials: process.env.VUE_APP_WITH_CREDENTIALS,
})

instance.interceptors.response.use(
  function (response) {
    return response
  },

  function (error) {
  /*
      http status가 200이 아닌 경우
      응답 에러 처리를 작성합니다.
      .catch() 으로 이어집니다.
  */

   if (error.response) {
   // 요청이 전송되었고, 서버는 2xx 외의 상태 코드로 응답
      const errorCode = error.response.data.code
      const status = error.response.status

      if (status === 401 && errorCode === 'LOGIN-004') {
        store.commit('userStore/resetUser')
        router.push({name: 'MainSignIn'})
      } else if (error.response.data.code && error.response.data.message) {
        alert(error.response.data.message)
      }
    } else if (error.request) {
      // 요청이 전송되었지만, 응답이 수신되지 않았습니다.
      // 'error.request'는 브라우저에서 XMLHtpRequest 인스턴스이고,
      // node.js에서는 http.ClientRequest 인스턴스
      console.log(error.request);
    } else {
      // 오류가 발생한 요청을 설정하는 동안 문제가 발생
      console.log('Error', error.message);
      console.log('Error', error);
    }
    console.log(error.config);

    // 이행되지 않는 Promise를 반환하여 Promise Chaining 끊어주기
    return new Promise(() => {});
  },
)

// 생성한 인스턴스를 익스포트
export default instance;
