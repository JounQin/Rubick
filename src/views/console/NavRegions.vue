<template lang="pug">
rb-input(:class="$style.navRegions"
         :selections="regions"
         displayField="name"
         valueField="id"
         :emptyText="$t('no_available_region')"
         :value="regionId",
         @input="setRegionId($event)")
  router-link(to="/region", slot="left")
    i.fa.fa-server
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'

import { Region, RootState } from 'types'

import RbInput from 'components/rb-input/RbInput.vue'

@Component({
  components: {
    RbInput,
  },
  translator: {
    zh: {
      no_available_region: '暂无可用的集群',
    },
    en: {
      no_available_region: 'No Available Region',
    },
  },
})
export default class NavRegions extends Vue {
  @State((state: RootState) => state.common.regions)
  regions: Region[]

  @State((state: RootState) => state.common.regionId)
  regionId: string

  @Action
  setRegionId(regionId: string) {}
}
</script>
<style lang="scss" module>
.nav-regions:global(.rc-input) {
  $radius: 14px;

  margin-bottom: 0;
  border-radius: $radius;
  cursor: pointer;

  :global {
    .content:hover {
      .input,
      .right {
        background-color: $bage-bg-color;
      }
    }

    .left {
      padding-left: 12px;
      border-top-left-radius: $radius;
      border-bottom-left-radius: $radius;

      &:hover {
        background-color: $bage-bg-color;

        ~ :global(.input) {
          background-color: transparent;
        }

        ~ :global(.right) {
          background-color: transparent;
        }
      }
    }

    .input {
      padding: 6px 20px;
      border-left: 1px solid $dividing-line-color;
    }

    .right {
      padding-right: 12px;
      border-top-right-radius: $radius;
      border-bottom-right-radius: $radius;
    }
  }

  > :global(.list-unstyled) {
    margin-top: 3px;
    max-height: unset;
  }
}
</style>
