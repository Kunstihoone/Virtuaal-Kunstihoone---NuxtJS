<template>
  <div class="index-page">
    {{ data }}
    <application-intro :data="$store.state.siteData" />

    <exhibitions-list
      v-if="$store.getters.getExhibitions"
      :exhibitions="$store.getters.getExhibitions"
    />

    <transition name="fade">
      <notification-modal
        v-if="
          displayNotification &&
          $store.state.siteData.localizations[$i18n.locale]?.notification
        "
        :notification="
          $store.state.siteData.localizations[$i18n.locale].notification
        "
        @closeNotification="displayNotification = false"
      />
    </transition>
  </div>
</template>

<script>
import anime from 'animejs'
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
  asyncData({ store, app }) {
    store.commit('SetRoomsData', null)
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
