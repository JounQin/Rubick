<template lang="pug">
table.table
  thead
    tr
      td {{ $t('name') }}
      td {{ $t('status') }}
      td {{ $t('type') }}
      td {{ $t('label') }}
      td {{ $t('quota_space') }}
      td {{ $t('action') }}
  tbody
    tr(v-for="{ app_name, current_status, type, labels, space_name } of applications")
      td {{ app_name }}
      td {{ current_status }}
      td {{ type }}
      td
        rb-popover
          span {{ labels ? labels.length : 0 }}
          template(slot="popover")
            ul.list-unstyled
              li(v-for="{ key, value } of labels") {{ key }}: {{ value }}
      td {{ space_name || 'N/A'}}
      td
</template>
<script lang="ts">
import { AxiosInstance } from 'axios'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { applicationModule } from 'store'
import { Application as App, RootStore } from 'types'

const MODULE_NAME = 'application'

let registered = false

const fetchApplications = async (axios: AxiosInstance, store: RootStore) => {
  if (!registered) {
    store.registerModule(MODULE_NAME, applicationModule(axios))

    if (!__SERVER__) {
      registered = true
    }
  }
  await store.dispatch(MODULE_NAME + '/fetchApplications')
}

@Component({
  async asyncData({ axios, store }) {
    await fetchApplications(axios, store)
  },
})
export default class Application extends Vue {
  @State(state => state.application.applications)
  applications: App[]

  @Watch('$store.state.common.regionId')
  async regionChange() {
    await fetchApplications(this.$http, this.$store)
  }
}
</script>
<style lang="scss" module>

</style>
