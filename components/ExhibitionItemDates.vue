<template>
  <time>{{ exhibitionDates }}</time>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    startingDateTime: {
      type: String,
      default: null
    },
    endingDateTime: {
      type: String,
      default: null
    }
  },
  computed: {
    exhibitionDates() {
      const startingTime = dayjs(this.startingDateTime)
      const endingTime = dayjs(this.endingDateTime)

      if (startingTime.isSame(endingTime, 'year')) {
        return `${startingTime.format('DD.MM')} – ${endingTime.format(
          'DD.MM.YYYY'
        )}`
      } else {
        return `${startingTime.format('DD.MM.YYYY')} – ${endingTime.format(
          'DD.MM.YYYY'
        )}`
      }
    }
  }
}
</script>
