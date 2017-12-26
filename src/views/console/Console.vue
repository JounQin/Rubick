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
      nav-regions
      div(:class="$style.whitespace")
      nav-menus
    div(:class="$style.breadCrumbs")
      ol.list-unstyled
        li(v-for="({link, text}, i) of routes")
          span(v-if="i") /
          span(v-if="!i || i === routes.length - 1") {{ text }}
          router-link(v-else, :to="link") {{ text }}
    div(:class="$style.view")
      router-view
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { breadCrumbs } from 'plugins'

import NavList from './NavList.vue'
import NavRegions from './NavRegions.vue'
import NavMenus from './NavMenus.vue'

import NAV_CONFIG from './nav-config'

@Component({
  components: {
    NavList,
    NavRegions,
    NavMenus,
  },
  async asyncData({ store }) {
    await store.dispatch('fetchCommon')
  },
  translator: {
    zh: {
      nav_board: '看板',
      nav_infrastructure: '交付中心',
      nav_others: '更多',
      no_available_region: '暂无可用的集群',
      user_center: '用户中心',
      account_center: '账号中心',
      permission_management: '权限管理',
      logout: '退出登录',
    },
    en: {
      nav_board: 'Board',
      nav_infrastructure: 'Infrastructure',
      nav_others: 'Others',
      no_available_region: 'No Available Region',
      user_center: 'User Center',
      account_center: 'Account Center',
      permission_management: 'Permissions',
      logout: 'Logout',
    },
  },
})
export default class Console extends Vue {
  navConfig = NAV_CONFIG

  get routes() {
    return breadCrumbs(this.$route, this.$t)
  }

  mounted() {
    this.$root.$el.style.height = '100%'
  }

  destoryed() {
    this.$root.$el.style.height = null
  }
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
    padding: 0 20px;
  }
}

.whitespace {
  flex: 1;
}

.bread-crumbs {
  padding: 10px 20px;
  background-color: $reverse-color;

  > ol {
    margin-bottom: 0;

    > li {
      display: inline-block;

      > * {
        padding: 0 5px;
      }

      > span {
        color: $bread-crumb-color;
      }
    }
  }
}

.view {
  padding: 15px;
}
</style>
