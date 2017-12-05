<template lang="pug">
div(:class="$style.landing")
  div(:class="$style.locale", @click="$t.toggleLocale")
        i.fa.fa-globe
        | {{ $t('locale') }}
  header
    router-link(to="/")
      img(src="~assets/logo-large.svg")
  router-view
</template>
<style lang="scss" module>
$spacing: 30px;
$img-height: 72px;

.landing {
  display: flex;
  flex-direction: column;
  padding: $spacing;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  color: #494949;

  header {
    height: $img-height;
    margin-bottom: $spacing;
  }

  main {
    >  {
      form {
        padding: 16px 32px;
        background-color: $card-bg-color;
        width: 360px;
        max-width: 100vw;
        margin-bottom: 20px;

        &:global(.wider) {
          width: 640px;
        }

        > :first-child {
          margin-bottom: 16px;
          font-size: 24px;
          text-align: center;
        }
      }

      :global(.tips) > a {
        color: $link-desc-color;
        font-size: 18px;
      }
    }
  }
}

.locale {
  position: absolute;
  top: $spacing + $img-height / 2;
  right: $spacing + $img-height / 2;
  transform: translate3d(0, -50%, 0);
  color: $text-desc-color;
  cursor: pointer;
  font-size: 18px;

  :global(.fa) {
    margin-right: 10px;
  }
}
</style>
