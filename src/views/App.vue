<template lang="pug">
#app
  router-view
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  name = 'app'
}
</script>
<style lang="scss" src="styles/app.scss"></style>
