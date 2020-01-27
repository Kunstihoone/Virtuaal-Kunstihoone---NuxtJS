import anime from 'animejs'

export default {
  transition: {
    leave(el, done) {
      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 600,
        complete(anim) {
          done()
        }
      })

      tl.add({
        targets: '.buttons-layer',
        opacity: 0
      })
    }
  }
}
