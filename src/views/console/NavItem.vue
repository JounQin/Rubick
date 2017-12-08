<template lang="pug">
li(:class="[$style.item, { [$style.active]: active, [$style.expanded]: expanded }]")
  div(v-if="item.items"
      @click="expanded = !expanded")
    i.fa(:class="'fa-' + item.icon")
    span {{ $t('nav_' + item.text) }}
    i.fa(:class="`fa-${item.active ? 'minus': 'plus'}`")
  div(v-else-if="item.text === 'locale'"
      v-tooltip.right="$t('switch_lang_tips')"
      @click="$t.toggleLocale()")
    i.fa(:class="'fa-' + item.icon")
    span {{ $t('nav_locale') }}
  router-link(v-else
              :to="'/' + item.text"
              :class="{ [$style.active]: $route.fullPath.startsWith('/' + item.text) }")
    i.fa(:class="'fa-' + item.icon")
    span {{ $t('nav_' + item.text) }}
  ol.list-unstyled(v-if="item.items"
                    :class="$style.subItems"
                    :style="{ height: expanded ? 32 * item.items.length + 'px' : 0 }")
    li(v-for="{ text } of item.items")
      router-link(:to="'/' + item.text + '/' + text") {{ $t('nav_' + text) }}
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { NavItem as NavItemType } from 'types'

@Component
export default class NavItem extends Vue {
  @Prop() item: NavItemType

  expanded: boolean = null

  get active() {
    return this.$route.fullPath.startsWith('/' + this.item.text)
  }

  created() {
    this.expanded = this.active
  }
}
</script>
<style lang="scss" module>
.item {
  &:hover,
  &.expanded {
    background-color: $nav-focus-color;
  }

  > :first-child {
    display: flex;
    height: 32px;
    align-items: center;
    color: rgba($reverse-color, 0.7);
    cursor: pointer;

    &:hover {
      :global(.fa):last-child {
        transform: scale(1.2);
        opacity: 1;
        color: $reverse-color;
      }
    }

    &.active {
      background-color: $primary-color;

      span {
        color: $reverse-color;
      }
    }

    span {
      flex: 1;
    }

    :global(.fa) {
      width: 32px;
      text-align: center;

      &:last-child {
        transform: scale(0.6);
        opacity: 0;
        transition: transform 0.3s cubic-bezier(0.05, 0.71, 0.88, 1.94),
          opacity 0.2s;
      }
    }
  }
}

.sub-items {
  transition: height 0.3s;
  overflow: hidden;

  > li {
    cursor: pointer;

    a {
      display: block;
      padding-left: 32px;
      height: 32px;
      line-height: 32px;
      color: $reverse-color;
      opacity: 0.5;
      transition: opacity 0.2s;

      &:hover {
        background-color: #3c4b55;
        opacity: 0.7;
      }

      &:global(.router-link-exact-active) {
        background-color: $primary-color;
        opacity: 1;
      }
    }
  }
}
</style>

