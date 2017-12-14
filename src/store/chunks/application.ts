import { AxiosInstance } from 'axios'
import { ActionTree, Module, MutationTree } from 'vuex'

import { ApplicationState, RootState } from 'types'

enum TYPES {
  SET_APPLICATIONS = 'SET_APPLICATIONS',
}

export const applicationModule = (
  axios: AxiosInstance,
): Module<ApplicationState, RootState> => {
  const state: ApplicationState = {
    applications: [],
  }

  const actions: ActionTree<ApplicationState, RootState> = {
    async fetchApplications({ commit, rootGetters }) {
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
