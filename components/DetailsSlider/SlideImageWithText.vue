<template>
  <div class="detail-slide">
    <div class="detail-slide__image-wrapper">
      <responsive-image
        v-if="imageData?.data?.attributes.file.data"
        :image-data="imageData.data.attributes.file.data.attributes"
      />
    </div>

    <div class="detail-slide__text-wrapper">
      <p v-html="text" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageData: {
      type: Object,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
.detail-slide {
  @include row();
}

.detail-slide__image-wrapper,
.detail-slide__text-wrapper {
  @include grid(1/2);
}

.detail-slide__image-wrapper {
  position: relative;
  background-color: black;
}

.detail-slide__text-wrapper {
  @include grid(1/2);
  @include gutter;

  padding-top: 1rem;
  padding-bottom: 1rem;
  border-radius: 0 $layers-border-radius $layers-border-radius 0;
  height: 100%;
  overflow-y: auto;
  background-color: $white;

  ul {
    list-style: circle;
    margin-left: 1rem;
  }
}
</style>
