<template>
  <exhibitions-slider :exhibitions="data" />
</template>

<script>
import anime from 'animejs'
import ExhibitionsSlider from '~/components/ExhibitionsSlider'

export default {
  components: {
    ExhibitionsSlider
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
  // layout: 'index-page',
  async asyncData({ store, $axios, app }) {
    const queryParams = {
      lang: app.i18n.locale,
      acf: true,
      sort_order: 'DESC',
      sort_column: 'post_date'
    }

    const data = await $axios.$get('pages', {
      params: queryParams
    })

    store.commit('SetExhibitions', data)

    return {
      data
    }
  },
  head() {
    return {
      ...this.metaData(),
      bodyAttrs: {
        class: 'index-page'
      }
    }
  }
}
</script>
