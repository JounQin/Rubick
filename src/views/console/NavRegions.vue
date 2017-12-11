<template lang="pug">
rb-input(:class="$style.rcInput"
         :selections="regions"
         displayField="name"
         valueField="id"
         v-model="region")
  router-link(to="/region", slot="left")
    i.fa.fa-server
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

import { Region, RootState } from 'types'

import RbInput from 'components/rb-input/RbInput.vue'

@Component({
  components: {
    RbInput,
  },
})
export default class NavRegions extends Vue {
  @State((state: RootState) => state.common.regions)
  regions: Region[]

  regionId: string = null

  get region() {
    const { regions } = this
    return this.regionId || (regions && regions[0].id)
  }

  set region(id: string) {
    this.regionId = id
  }
}
</script>
<style lang="scss" module>
.rc-input:global(.rc-input) {
  margin-bottom: 0;
  border-radius: 14px;
  cursor: pointer;

  > :global(.left) {
    padding-left: 12px;
  }

  > :global(.input) {
    padding: 6px 8px;
    border-left: 1px solid $dividing-line-color;
  }

  > :global(.right) {
    padding-right: 12px;
  }

  > :global(.list-unstyled) {
    margin-top: 3px;
    max-height: unset;
  }
}
</style>
