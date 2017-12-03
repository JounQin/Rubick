<template lang="pug">
div {{ msg }}
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  name = 'home'

  data() {
    return {
      msg: 'Hello, TypeScript with Vue',
    }
  }
}
</script>
