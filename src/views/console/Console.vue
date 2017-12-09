<template lang="pug">
div(:class="$style.console")
  div(:class="$style.leftPanel")
    header
      router-link(to="/")
        img(src="~assets/logo-medium.svg")
    nav
      nav-list(:navConfig="navConfig")
  div(:class="$style.rightPanel")
    header
    router-view
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import NavList from './NavList.vue'

import NAV_CONFIG from './nav-config'

@Component({
  components: {
    NavList,
  },
})
export default class Console extends Vue {
  navConfig = NAV_CONFIG
}
</script>
<style lang="scss" module>
.console {
  display: flex;
}

.left-panel {
  display: flex;
  flex-basis: 160px;
  flex-direction: column;
  background-color: $console-panel-bg-color;

  > header {
    display: flex;
    align-items: center;
    flex-basis: 50px;
    background-color: $logo-bg-color;

    img {
      margin-left: 15px;
      max-width: 140px;
      height: 30px;
    }
  }

  > nav {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.right-panel {
  display: flex;
  flex: 1;
  flex-direction: column;

  > header {
    display: flex;
    align-items: center;
    flex-basis: 50px;
    background-color: $toolbar-bg-color;
  }
}
</style>
