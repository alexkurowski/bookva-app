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

        const paneCount = Writer.filesOpen.length
        let windowWidth = window.innerWidth
        let dragX       = event.x

        if (paneCount > 2) {
          const panes =
            document.querySelectorAll('.editor')

          if (this.index > 1) {
            // for each pane to the left
            // subtract its width from dragX and windowWidth

            for (let i = 0; i < this.index - 1; i++) {
              windowWidth -= panes[i].clientWidth
              dragX       -= panes[i].clientWidth
            }
          }
          if (this.index < paneCount - 1) {
            // for each pane to the right
            // subtract its width from windowWidth

            for (let i = this.index + 1; i < paneCount; i++) {
              windowWidth -= panes[i].clientWidth
            }
          }
        }

        const flex = dragX / windowWidth

        this.$store.commit('writerSetPaneFlex', {
          index: this.index,
          value: flex
        })
        console.log(flex)
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
