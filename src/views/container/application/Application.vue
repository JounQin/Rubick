<template lang="pug">

</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Module } from 'vuex'

import { applicationModule } from 'store'

const MODULE_NAME = 'application'

@Component({
  async asyncData({ axios, store }) {
    store.registerModule(MODULE_NAME, applicationModule(axios), {
      preserveState: true,
    })
    await store.dispatch(MODULE_NAME + '/fetchApplications')
  },
})
export default class Application extends Vue {}
</script>
<style lang="scss" module>

</style>
