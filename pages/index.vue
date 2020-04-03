<template>
  <div class="index-page">
    <application-intro :data="data" />

    <exhibitions-slider
      v-if="$store.getters.getExhibitions"
      :exhibitions="$store.getters.getExhibitions"
    />

    <transition name="fade">
      <notification-modal
        v-if="
          displayNotification &&
            $store.state.siteData.options &&
            $store.state.siteData.options.notifications &&
            $store.state.siteData.options.notifications[$i18n.locale]
        "
        :notification="
          $store.state.siteData.options.notifications[$i18n.locale]
        "
        @closeNotification="displayNotification = false"
      />
    </transition>
  </div>
</template>

<script>
import anime from 'animejs'
import ApplicationIntro from '~/components/ApplicationIntro'
import ExhibitionsSlider from '~/components/ExhibitionsSlider'
import NotificationModal from '~/components/NotificationModal'

export default {
  components: {
    ApplicationIntro,
    ExhibitionsSlider,
    NotificationModal
  },
  data() {
    return {
      displayNotification: true
    }
  },
  transition: {
    leave(el, done) {
      anime({
        targets: '.placeholder-image',
        scale: [0.6, 1],
        easing: 'easeOutExpo',
        duration: 600,
        complete: (anim) => {
          done()
        }
      })
    }
  },
  async asyncData({ store, $axios, app }) {
    const queryParams = {
      lang: app.i18n.locale === 'evk' ? 'et' : app.i18n.locale,
      acf: true
    }

    let frontPagePath = ''

    if (app.i18n.locale === 'et' || app.i18n.locale === 'evk') {
      frontPagePath = 'esileht'
    } else if (app.i18n.locale === 'en') {
      frontPagePath = 'front-page'
    } else if (app.i18n.locale === 'ru') {
      frontPagePath = 'esileht-rus'
    }

    const data = await $axios.$get(`pages/${frontPagePath}`, {
      params: queryParams
    })

    return {
      data
    }
  },
  head() {
    return this.metaData(this.data)
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  background-color: $white;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  top: 0;
  left: 0;
}
</style>
