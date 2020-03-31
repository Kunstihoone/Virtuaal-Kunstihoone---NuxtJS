import anime from 'animejs'

export default {
  transition: {
    mode: 'out-in',
    leave(el, done) {
      anime({
        targets: '.room-navigation__link',
        opacity: 0,
        easing: 'easeOutExpo',
        duration: 4000,

        complete(anim) {
          done()
        }
      })
    }
  }
}
