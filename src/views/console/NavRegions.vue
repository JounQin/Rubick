<template lang="pug">
div(:class="$style.wrapper")
  rb-input(:selections="regions"
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
.wrapper > div {
  margin-bottom: 0;
  border-radius: 14px;

  > input {
    padding: 6px 8px;
    border-left: 1px solid $border-color;
  }

  > :global(.list-unstyled) {
    margin-top: 3px;
    max-height: unset;
  }
}
</style>
