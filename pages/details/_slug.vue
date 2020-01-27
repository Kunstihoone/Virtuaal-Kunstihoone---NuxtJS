<template>
  <div class="detail-view">
    <details-slider
      v-if="data.acf && data.acf.detailed_view_content"
      :slides="data.acf.detailed_view_content"
    />
  </div>
</template>

<script>
import DetailsSlider from '~/components/DetailsSlider'

export default {
  components: {
    DetailsSlider
  },
  async asyncData({ $axios, route }) {
    const data = await $axios.$get(
      `post-types/virtual-exhibitions/${route.params.slug}`,
      {
        params: {
          acf: true
        }
      }
    )

    return { data }
  }
}
</script>
