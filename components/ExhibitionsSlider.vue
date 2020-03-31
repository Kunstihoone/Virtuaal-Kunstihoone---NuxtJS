<template>
  <client-only>
    <div class="slider-wrapper">
      <Slider ref="slider" :options="options">
        <SliderItem v-for="(exhibition, index) in exhibitions" :key="index">
          <exhibition-item :data="exhibition" />
        </SliderItem>
      </Slider>
    </div>
  </client-only>
</template>

<script>
import ExhibitionItem from '~/components/ExhibitionItem'

export default {
  components: {
    ExhibitionItem
  },
  props: {
    exhibitions: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      options: {
        currentPage: 0,
        pagination: false
        // loopedSlides: 2,
        // slidesToScroll: 2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slider-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
