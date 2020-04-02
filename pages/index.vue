<template>
  <div class="index-page">
    <application-intro />

    <exhibitions-slider
      v-if="$store.state.exhibitions"
      :exhibitions="$store.state.exhibitions"
    />
  </div>
</template>

<script>
import anime from 'animejs'
import ApplicationIntro from '~/components/ApplicationIntro'
import ExhibitionsSlider from '~/components/ExhibitionsSlider'

export default {
  components: {
    ApplicationIntro,
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
