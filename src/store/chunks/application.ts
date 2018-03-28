import { ActionTree, MutationTree } from 'vuex'

import { ApplicationState, RootState } from 'types'

enum TYPES {
  SET_APPLICATIONS = 'SET_APPLICATIONS',
}

const API_PREFIX = '/applications/'

const state = (): ApplicationState => ({
  applications: [],
})

const actions: ActionTree<ApplicationState, RootState> = {
  async fetchApplications({ commit, rootGetters, rootState }) {
    const { regionName } = rootGetters

    if (!regionName) {
      return
    }

    const { data } = await rootState.http.get(
      `${API_PREFIX}${rootGetters.namespace}`,
      {
        params: { region: regionName },
      },
    )

    commit(TYPES.SET_APPLICATIONS, data)
  },
}

const mutations: MutationTree<ApplicationState> = {
  [TYPES.SET_APPLICATIONS](s, applications) {
    s.applications = applications
  },
}

export const applicationModule = {
  namespaced: true,
  state,
  actions,
  mutations,
}
