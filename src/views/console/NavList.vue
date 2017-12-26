<template lang="pug">
ol.list-unstyled(:class="$style.categories")
  li(v-for="{title, items} of navConfig")
    div(:class="$style.title") {{ $t('nav_' + title) }}
    ol.list-unstyled(:class="$style.items")
      nav-item(v-for="item of items", :item="item", :key="item.text")
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { NavCategory } from 'types'

import NavItem from './NavItem.vue'

@Component({
  components: {
    NavItem,
  },
  translator: {
    zh: {
      nav_board: '看板',
      nav_infrastructure: '交付中心',
      nav_others: '更多',
    },
    en: {
      nav_board: 'Board',
      nav_infrastructure: 'Infrastructure',
      nav_others: 'Others',
    },
  },
})
export default class NavList extends Vue {
  @Prop() navConfig: NavCategory[]

  activeItem: string = null
  activeSubItem: string = null
}
</script>
<style lang="scss" module>
ol.categories {
  padding: 8px;

  &,
  .sub-items {
    margin-bottom: 0;
  }

  > li:not(:first-child) {
    margin-top: 16px;
  }
}

.title {
  color: $reverse-color;
  opacity: 0.5;
  font-size: 12px;
  margin: 4px 0;
}

.items {
  margin: 4px 0;
}
</style>
