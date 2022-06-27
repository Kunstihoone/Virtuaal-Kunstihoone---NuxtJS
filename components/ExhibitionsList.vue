<template>
  <client-only>
    <div class="exhibitions-list">
      <exhibition-item
        v-for="(exhibition, index) in exhibitions"
        :key="index"
        :data="exhibition"
      />
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
