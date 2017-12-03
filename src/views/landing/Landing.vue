<template lang="pug">
div(:class="$style.landing")
  header
    router-link(to="/")
      img(src="~assets/logo-large.svg")
    div(:class="$style.locale", @click="$t.toggleLocale")
      i.fa.fa-globe
      | {{ $t('locale') }}
  router-view(:class="$style.main")
</template>
<style lang="scss" module>
$spacing: 30px;
$img-height: 72px;

.landing {
  display: flex;
  flex-direction: column;
  padding: $spacing;
  color: #494949;

  header {
    position: relative;
    height: $img-height;
    margin-bottom: $spacing;
    text-align: center;
  }
}

.locale {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate3d(0, -50%, 0);
  color: $text-desc-color;
  cursor: pointer;

  :global(.fa) {
    margin-right: 10px;
  }
}

.main {
  align-self: center;
}
</style>
