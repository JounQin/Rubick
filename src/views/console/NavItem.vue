<template lang="pug">
li(:class="[$style.item, { [$style.active]: active, [$style.expanded]: expanded }]")
  div(v-if="item.items"
      @click="expanded = !expanded")
    i.fa(:class="'fa-' + item.icon")
    span {{ $t('nav_' + snakeCase(item.text)) }}
    i.fa(:class="`fa-${expanded ? 'minus': 'plus'}`")
  div(v-else-if="item.text === 'locale'"
      v-tooltip.right="{ content: $t('switch_lang_tips'), boundariesElement: 'viewport' }"
      @click="$t.toggleLocale()")
    i.fa(:class="'fa-' + item.icon")
    span {{ $t('nav_locale') }}
  router-link(v-else
              :to="'/' + item.text"
              :class="{ [$style.active]: $route.fullPath.startsWith('/' + item.text) }")
    i.fa(:class="'fa-' + item.icon")
    span {{ $t('nav_' + snakeCase(item.text)) }}
  ol.list-unstyled(v-if="item.items"
                    :class="$style.subItems"
                    :style="{ height: expanded ? 32 * item.items.length + 'px' : 0 }")
    li(v-for="{ text } of item.items")
      router-link(:to="'/' + item.text + '/' + text") {{ $t('nav_' + snakeCase(text)) }}
</template>
<script lang="ts">
import { snakeCase } from 'lodash'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { NavItem as NavItemType } from 'types'

@Component
export default class NavItem extends Vue {
  @Prop() item: NavItemType

  expanded: boolean = null
  snakeCase = snakeCase

  get active() {
    return this.$route.matched.some(({ path }) =>
      new RegExp('^/' + this.item.text + '/?').test(path),
    )
  }

  @Watch('active', { immediate: true })
  activeChange() {
    this.expanded = this.active
  }
}
</script>
<style lang="scss" module>
.item {
  position: relative;

  &:hover,
  &.expanded {
    background-color: $nav-focus-color;
  }

  &:before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: -2px;
    width: 2px;
    background-color: $primary-color;
    transform: scale(0);
    transition: transform 0.3s;
  }

  &.active:before {
    transform: scale(1);
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
      font-size: 12px;

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

      &:global(.router-link-active) {
        background-color: $primary-color;
        opacity: 1;
      }
    }
  }
}
</style>
