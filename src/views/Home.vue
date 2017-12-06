<template lang="pug">
div {{ msg }} {{ user.username }}
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { User } from 'types'

@Component
export default class Home extends Vue {
  name = 'home'
  msg = 'Hello, TypeScript with Vue'

  @State(state => state.common.user)
  user: User
}
</script>
