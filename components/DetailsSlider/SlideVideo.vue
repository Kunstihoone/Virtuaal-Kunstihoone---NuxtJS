<template>
  <div class="detail-slide">
    <video>
      <source :src="videoData.url" :type="videoData.mime_type" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  props: {
    videoData: {
      type: Object,
      default: null
    }
  }
}
</script>
