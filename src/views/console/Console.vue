<template lang="pug">
div(:class="$style.console")
  div(:class="[$style.leftPanel, { [$style.active]: active }]", @transitionend="collapsed = !active")
    header
      router-link(to="/")
        img(src="~assets/logo-medium.svg")
    nav.flex
      .d-flex(:class="$style.navCollapse", @click="active = false")
        i.fa.fa-caret-left
      nav-list.scroll-y(:class="$style.navList", :navConfig="navConfig")
    .d-flex(v-if="collapsed", :class="$style.navCollapse", @click="active = true; collapsed = false")
      i.fa.fa-caret-right
  div(:class="$style.rightPanel")
    header
      div(:class="[$style.logo, { [$style.active]: !active }]")
        img(src="~assets/logo-small.svg")
      nav-regions
      .flex
      nav-menus
    div(:class="$style.breadCrumbs")
      ol.list-unstyled
        li(v-for="({link, text}, i) of routes")
          span(v-if="i") /
          span(v-if="!i || i === routes.length - 1") {{ text }}
          router-link(v-else, :to="link") {{ text }}
    .flex(:class="$style.viewWrapper")
      div(:class="$style.view")
        router-view
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { breadCrumbs } from 'plugins'

import NavList from './NavList.vue'
import NavMenus from './NavMenus.vue'
import NavRegions from './NavRegions.vue'

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
      filter_by_name: '按名称过滤',
      create_sync_config: '新增同步配置',
      image_registry: '镜像仓库源',
      source_image: '源镜像',
      dest_registry: '目标仓库源',
      quota_space: '资源空间',
      created_time: '创建时间',
      unit_ge: '个',
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
      filter_by_name: 'filter by name',
      create_sync_config: 'Create New Sync Config',
      image_registry: 'Image Registry',
      source_image: 'Source Image',
      dest_registry: 'Destination Registry',
      quota_space: 'Spaces',
      created_time: 'Create Time',
      unit_ge: '',
    },
  },
})
export default class Console extends Vue {
  active = true
  collapsed = false
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
  color: $console-color;
}

.left-panel {
  display: flex;
  flex-basis: 160px;
  max-width: 0;
  flex-direction: column;
  background-color: $console-panel-bg-color;
  transition: all 0.2s;

  &.active {
    max-width: 160px;
  }

  > .nav-collapse {
    left: -2px;
    height: 200px;
    height: calc(100% - 200px);
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #555;
    background-color: #eaeaeb;

    &:hover {
      left: 0;
      box-shadow: 0 0 5px #aaa;
      transform: translate3d(0, -50%, 0) scaleY(1.05);
    }
  }

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
    position: relative;
    overflow: hidden;

    .nav-collapse {
      right: -4px;
      height: 36px;
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
      color: $reverse-color;
      background-color: #3e4e59;

      &:hover {
        right: 0;
      }
    }
  }
}

.nav-collapse {
  position: absolute;
  z-index: 1;
  top: 50%;
  width: 16px;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: FontAwesome;
  opacity: 0.8;
  transform: translate3d(0, -50%, 0);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
}

.nav-list {
  position: absolute;
  width: 100%;
  height: 100%;
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

.logo {
  display: block;
  overflow: hidden;
  transform: scale(0);
  max-width: 0;
  transition: all 0.3s;

  &.active {
    padding-right: 12px;
    transform: scale(1);
    max-width: 200px;
  }

  img {
    height: 32px;
  }
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

.view-wrapper {
  position: relative;
  overflow: auto;
}

.view {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 15px;
  min-width: 1000px;
}
</style>
