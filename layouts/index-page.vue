<template>
  <main>
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
