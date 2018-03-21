<template lang="pug">
#app
  router-view
  rb-modal
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { RbModal } from 'components'

@Component({
  components: {
    RbModal,
  },
})
export default class App extends Vue {}
</script>
