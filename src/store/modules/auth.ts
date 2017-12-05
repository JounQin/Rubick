import { AxiosInstance } from 'axios'
import { Store } from 'vuex'

enum TYPES {
  SET_LOGIN_STATUS = 'SET_LOGIN_STATUS',
}

interface State {
  loginStatus: boolean
}

export default (axios: AxiosInstance) => {
  const state: State = {
    loginStatus: false,
  }

  const actions = {
    async checkLoginStatus({ commit }: Store<State>) {
      const { data: loginStatus } = await axios.get('/login')
      commit(TYPES.SET_LOGIN_STATUS, loginStatus)
    },
    setLoginStatus({ commit }: Store<State>, loginStatus: boolean) {
      commit(TYPES.SET_LOGIN_STATUS, loginStatus)
    },
  }

  const mutations = {
    [TYPES.SET_LOGIN_STATUS](s: State, loginStatus: boolean) {
      s.loginStatus = loginStatus
    },
  }

  return {
    state,
    actions,
    mutations,
  }
}
