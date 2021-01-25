<template>
  <transition name="button-appear">
    <div v-if="buttonVisible" class="feedback-button">
      <a
        :href="feedbackForm"
        @click="handleClose"
        rel="noopener"
        target="_blank"
        >{{ $t('give_feedback') }}</a
      >

      <button @click="handleClose" class="feedback-button__close">
        <svg-icon name="icon-close" />
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      buttonVisible: false,
    }
  },
  computed: {
    feedbackForm() {
      const locale = this.$i18n.locale

      if (locale === 'en') {
        return 'https://forms.gle/Yj1vNiAcV6JaZhZ96'
      } else if (locale === 'ru') {
        return 'https://forms.gle/LUXCwdg4Cht2ffMQ9'
      } else {
        return 'https://forms.gle/FsNSYZcGmGzJ7wQRA'
      }
    },
  },
  mounted() {
    if (!localStorage.getItem('feedback')) {
      setTimeout(() => {
        this.buttonVisible = true
      }, 10000)
    }
  },
  methods: {
    handleClose() {
      localStorage.setItem('feedback', 'closed')
      this.buttonVisible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.feedback-button {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translate(-50%, 0rem);
  background: #1bb287;
  border-radius: 14px;
  padding: 0 0.8rem;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    line-height: 1rem;
    padding: 0.8rem 0;
    color: $white;
    white-space: nowrap;
  }
}

.feedback-button__close {
  position: relative;
  margin-left: 0.8rem;
  width: 1.8rem;
  height: 1.8rem;

  svg {
    @include absolute-center;

    width: 1rem;
    height: 1rem;
    color: white;
  }
}

.button-appear-enter-active,
.button-appear-leave-active {
  transition: 0.8s ease;
}

.button-appear-enter,
.button-appear-leave-active {
  opacity: 0;
  transform: translate(-50%, -2rem);
}
</style>
