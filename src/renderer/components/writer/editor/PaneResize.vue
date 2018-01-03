<template lang='slm'>
  .pane-resize[ @mousedown='down'
                @mousemove='move'
                @mouseup='up' ]
    .line

    .overlay v-if='dragging'
</template>

<script>
  import { Writer } from '@/helpers/store_helper'

  export default {
    name: 'PaneResize',

    props: [ 'index' ],

    data () {
      return {
        dragging: false,
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

        const flexSum =
          Writer.paneFlex[this.index - 1] +
          Writer.paneFlex[this.index]

        const dragX     = event.x - rectLeft.left
        const dragWidth = rectLeft.width + rectRight.width
        const flex      = dragX / dragWidth

        this.$store.commit('writerSetPaneFlex', {
          index: this.index,
          value: flex,
          sum: flexSum
        })
      },

      up (event) {
        if (!this.dragging) return
        this.dragging = false
      },
    },

    mounted () {
      window.addEventListener('mouseup', this.up)
    },

    unmounted () {
      window.removeEventListener('mouseup', this.up)
    }
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

  .pane-resize
    position: absolute
    width: 1px
    height: 100%
    padding: 0 .5rem
    margin-left: -.5rem
    cursor: col-resize
    z-index: 1000

  .line
    background: red
    width: 100%
    height: 100%
</style>
