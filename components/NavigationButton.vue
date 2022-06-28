<template>
  <nuxt-link
    :to="localePath(buttonPath)"
    @mouseenter.native="preloadPlaceholder"
    @click.native="showPlaceholder"
  >
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    buttonData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    buttonPath() {
      const slug = this.buttonData.view.data.attributes.slug
      const parentSlug = this.buttonData.view.data?.attributes.parent.data
        ?.attributes.slug
        ? this.buttonData.view.data.attributes.parent.data.attributes.slug
        : null

      const exhibition = this.$route.params.exhibition

      if (parentSlug) {
        return {
          name: 'exhibition-parent-child',
          params: {
            parent: parentSlug,
            child: slug,
            exhibition,
          },
        }
      } else {
        return {
          name: 'exhibition-parent',
          params: {
            parent: slug,
            exhibition,
          },
        }
      }
    },
  },
  methods: {
    showPlaceholder() {
      this.$store.commit('SetPlaceholderVisible', true)
    },
    preloadPlaceholder() {
      if (
        !this.$store.state.placeholderVisible &&
        this.buttonData.view.data.attributes.featuredImage.data?.attributes.file
          .data?.attributes.formats.large
      ) {
        this.$store.commit(
          'SetPlaceholderImage',
          this.buttonData.view.data.attributes.featuredImage.data.attributes
            .file.data.attributes.formats.large.url,
        )
      }
    },
  },
}
</script>
