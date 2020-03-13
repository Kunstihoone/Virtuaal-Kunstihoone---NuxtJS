import anime from 'animejs'

export default {
  transition: {
    leave(el, done) {
      anime({
        targets: '.room-wrapper',
        opacity: 0,
        easing: 'easeOutExpo',
        duration: 600,

        complete(anim) {
          done()
        }
      })
    }
  }
}
