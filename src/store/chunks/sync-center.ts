import { ActionTree, MutationTree } from 'vuex'

import { RootState, SyncCenterState, SyncRegistryConfig } from 'types'

enum TYPES {
  SET_SYNC_REGISTRY_CONFIGS = 'SET_SYNC_REGISTRY_CONFIGS',
}

const API_PREFIX = '/sync-registry/'

const state = (): SyncCenterState => ({
  syncRegistryConfigs: [],
})

const actions: ActionTree<SyncCenterState, RootState> = {
  async fetchSyncRegistryConfigs(
    { commit, rootGetters, rootState },
    projectName: string,
  ) {
    const { data } = await rootState.http.get(
      `${API_PREFIX}${rootGetters.namespace}/configs`,
      {
        params: {
          project_name: projectName,
        },
      },
    )
    commit(TYPES.SET_SYNC_REGISTRY_CONFIGS, data)
  },
}

const mutations: MutationTree<SyncCenterState> = {
  [TYPES.SET_SYNC_REGISTRY_CONFIGS](
    s,
    syncRegistryConfigs: SyncRegistryConfig[],
  ) {
    syncRegistryConfigs.forEach(config => {
      config.dest = config.dest.filter(({ endpoint }) => endpoint)
      config.source.info = config.source.info || ({} as any)
    })
    s.syncRegistryConfigs = syncRegistryConfigs
  },
}

export const syncCenterModule = {
  namespaced: true,
  state,
  actions,
  mutations,
}
