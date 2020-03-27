<template>
  <main class="index-page">
    <main-navigation v-if="$route.name !== 'index'" />

    <nuxt />
  </main>
</template>

<script>
import MainNavigation from '~/components/MainNavigation'

export default {
  components: {
    MainNavigation
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  background-color: #fff100;
}
</style>
