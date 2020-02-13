<template>
  <div class="detail-slide">
    <responsive-image :image-data="imageData" />
  </div>
</template>

<script>
export default {
  props: {
    imageData: {
      type: Object,
      default: null
    }
  }
}
</script>
