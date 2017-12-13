import { AxiosInstance } from 'axios'
import { ActionTree, Module, MutationTree } from 'vuex'

import { Application, ApplicationState, RootState } from 'types'

enum TYPES {
  SET_APPLICATIONS = 'SET_APPLICATIONS',
}

export const applicationModule = (
  axios: AxiosInstance,
): Module<ApplicationState, RootState> => {
  const state = {
    applications: [] as Application[],
  }

  const actions: ActionTree<ApplicationState, RootState> = {
    async fetchApplications({ commit, rootState, rootGetters }) {
      const { regionName } = rootGetters
      if (!regionName) {
        return
      }

      const { data: applications } = await axios.get(
        `/applications/${rootGetters.namespace}`,
        {
          params: { region: regionName },
        },
      )

      commit(TYPES.SET_APPLICATIONS, applications)
    },
  }

  const mutations: MutationTree<ApplicationState> = {
    [TYPES.SET_APPLICATIONS](s, applications) {
      s.applications = applications
    },
  }

  return {
    namespaced: true,
    state,
    actions,
    mutations,
  }
}
