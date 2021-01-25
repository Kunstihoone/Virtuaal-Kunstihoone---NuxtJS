<template>
  <client-only>
    <div class="exhibitions-list">
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
    ExhibitionItem,
  },
  props: {
    exhibitions: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      options: {
        currentPage: 0,
        pagination: false,
        // loopedSlides: 2,
        // slidesToScroll: 2
      },
    }
  },
}
</script>
