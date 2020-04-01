<template>
  <client-only>
    <div class="slider-wrapper">
      <template v-for="(exhibition, index) in exhibitions">
        <exhibition-item :data="exhibition" :key="index" />
      </template>
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
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // background-color: white;
}
</style>
