<template lang="pug">
main
  .d-flex.mb-10
    rb-input.flex-30(:placeholder="$t('filter_by_name')")
    .flex
    rb-btn {{ $t('create_sync_config') }}
  table.table
    thead
     tr
      td {{ $t('name') }}
      td {{ $t('image_registry') }}
      td {{ $t('source_image') }}
      td {{ $t('dest_registry') }}
      td {{ $t('quota_space') }}
      td {{ $t('created_time') }}
      td {{ $t('action') }}
    tbody
      tr(v-for="config of syncRegistryConfigs")
        td {{ config.config_name }}
        td {{ config.source.info.registry_name }}
        td
          span(v-if="config.source.info.project_name") {{ config.source.info.project_name }} /
          a {{ config.source.info.repository_name }}
        td
          a {{ config.dest.length }} {{ $t('unit_ge') }}
        td
          a {{ config.space_name }}
        td {{ config.created_at | formateDate }}
        td
          rb-btn(size='xs')
            i.fa.fa-refresh
          rb-btn(size='xs')
            i.fa.fa-pencil
          rb-btn(size='xs')
            i.fa.fa-trash-o
</template>
<script lang="ts">
import { AxiosInstance } from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { syncCenterModule } from 'store'
import { RootStore, SyncRegistryConfig } from 'types'

const MODULE_NAME = 'syncCenter'

let registered = false

const fetchSyncRegistryConfigs = async (
  axios: AxiosInstance,
  store: RootStore,
) => {
  if (!registered) {
    store.registerModule(MODULE_NAME, syncCenterModule(axios))

    if (!__SERVER__) {
      registered = true
    }
  }
  await store.dispatch(MODULE_NAME + '/fetchSyncRegistryConfigs')
}

@Component({
  asyncData({ axios, store }) {
    return fetchSyncRegistryConfigs(axios, store)
  },
})
export default class SyncCenter extends Vue {
  @State(state => state.syncCenter.syncRegistryConfigs)
  syncRegistryConfigs: SyncRegistryConfig[]
}
</script>
