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
      const slug = this.buttonData.related_item.post_name
      const parentSlug = this.buttonData.related_item.parent_slug
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
      const room = this.$store.getters.getSingleRoom(
        this.buttonData.related_item.post_name,
      )

      if (
        !this.$store.state.placeholderVisible &&
        room.featured_image &&
        room.featured_image.sizes.large
      ) {
        this.$store.commit(
          'SetPlaceholderImage',
          room.featured_image.sizes.large,
        )
      }
    },
  },
}
</script>
