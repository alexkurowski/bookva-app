<template lang='slm'>
  .pane-resize[
    @mousedown='down'
    @mousemove='move'
    @mouseup='up'
    v-clickaway='up'
  ]
    .line

    .overlay v-if='dragging'
</template>

<script>
  import { Appearance } from '@/helpers/store_helper'

  export default {
    name: 'PaneResize',

    props: [ 'index' ],

    data () {
      return {
        dragging: false,
        flexLimit: 0.2,
        snapValue: 0.5,
        snapThreshold: 0.02,
      }
    },

    methods: {
      down (event) {
        this.dragging = true
      },

      move (event) {
        if (!this.dragging) return

        const panes =
          document.querySelectorAll('.editor')

        const paneLeft  = panes[this.index - 1]
        const paneRight = panes[this.index]

        const rectLeft  = paneLeft.getBoundingClientRect()
        const rectRight = paneRight.getBoundingClientRect()

        const dragPoint = event.x - rectLeft.left
        const dragWidth = rectLeft.width + rectRight.width

        let flexVal = this.clamp(dragPoint / dragWidth)

        if ( flexVal > this.snapValue - this.snapThreshold &&
             flexVal < this.snapValue + this.snapThreshold ) {
          flexVal = this.snapValue
        }

        this.$store.commit('appearanceSetPaneFlex', {
          index: this.index,
          value: flexVal
        })
      },

      up (event) {
        this.dragging = false
      },

      clamp (val) {
        const min = this.flexLimit
        const max = 1 - this.flexLimit
        return Math.min(Math.max(min, val), max)
      },
    },
  }
</script>

<style lang='sass' scoped>
  .overlay
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: transparent
    z-index: 1050

  .line
    width: 100%
    height: 100%
    opacity: .1
    transition: opacity .3s

  .pane-resize
    position: absolute
    width: 1px
    height: 100%
    padding-right: .4rem
    cursor: col-resize
    z-index: 1000

    &:hover
      .line
        opacity: .4
</style>
