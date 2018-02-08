<template lang="pug">
div(tabindex="1"
    :class="$style.navMenus"
    @click="active = !active"
    @blur="active = false")
  div(:class="$style.content")
    span(v-if="namespace") {{ username }}@
    | {{ namespace }}
    i.fa.fa-caret-down
    img(:src="profile.logo_file")
  transition(name="scale-y")
    ul.list-unstyled(v-show="active", :class="$style.menus")
      li
        router-link(to="/user")
          i.fa.fa-user
          | {{ $t((username ? 'user' : 'account') + '_center') }}
      li
        router-link(to="/permission")
          i.fa.fa-group
          | {{ $t('permission_management') }}
      li
        div(:class="$style.logout", @click="confirmLogout")
          i.fa.fa-sign-out
          | {{ $t('logout') }}
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter, State } from 'vuex-class'

import { Profile, RootState } from 'types'

@Component
export default class NavMenus extends Vue {
  @Getter('username') username: string
  @Getter('namespace') namespace: string

  @State((state: RootState) => state.common.profile)
  profile: Profile

  active: boolean = null

  @Action('logout')
  logout() {}

  confirmLogout() {
    this.$confirm({
      tipText: `<div class="${
        this.$style.tip
      }"><i class="fa fa-question-circle"></i>${this.$t('logout')}</div>`,
      confirm: async () => {
        await this.logout()
        this.$modal.close()
        this.$router.replace('/login')
      },
    })
  }
}
</script>
<style lang="scss" module>
.nav-menus {
  position: relative;
  outline: 0;
}

.content {
  display: flex;
  align-items: center;
  color: $reverse-color;
  cursor: pointer;

  > i {
    margin-left: 5px;
  }

  > img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-left: 10px;
  }
}

.menus {
  position: absolute;
  z-index: 1;
  top: 100%;
  width: 100%;
  margin-top: 5px;
  padding: 5px 0;
  background-color: $reverse-color;
  border-radius: 3px;
  box-shadow: 0 2px 4px 0 rgba(34, 36, 38, 0.12),
    0 2px 10px 0 rgba(34, 36, 38, 0.15);

  > li {
    &:hover {
      > a {
        background-color: rgba(black, 0.05);
      }
    }

    > a,
    > .logout {
      display: block;
      padding: 5px 15px;
      margin: 5px 4px;
      color: $link-color;
      cursor: pointer;

      > i {
        width: 16px;
        margin-right: 5px;
      }
    }
  }
}

.tip {
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 28px;
    color: $primary-color;
    margin-right: 20px;
  }
}
</style>
