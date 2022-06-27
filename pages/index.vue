<template>
  <div class="index-page">
    <application-intro :data="data" />

    <exhibitions-list
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
import { fetchStrapiApi } from '~/utils/fetchApi'
import ApplicationIntro from '~/components/ApplicationIntro'
import ExhibitionsList from '~/components/ExhibitionsList'
import NotificationModal from '~/components/NotificationModal'

export default {
  components: {
    ApplicationIntro,
    ExhibitionsList,
    NotificationModal,
  },
  transition: {
    leave(el, done) {
      anime({
        targets: '.index-page',
        opacity: [1, 0],
        easing: 'easeOutExpo',
        duration: 600,
        complete: (anim) => {
          done()
        },
      })
    },
  },
  async asyncData({ store, app }) {
    store.commit('SetRoomsData', null)

    const data = await fetchStrapiApi(
      'api/organisation-info/' + process.env.organisationId,
      // {
      //   params: {
      //     locale: app.i18n.locale === 'evk' ? 'et' : app.i18n.locale,
      //   },
      // },
    )

    return {
      data: data.data,
    }
  },
  data() {
    return {
      displayNotification: true,
    }
  },
  head() {
    return this.metaData(this.data)
  },
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
  opacity: 1;
}
</style>
