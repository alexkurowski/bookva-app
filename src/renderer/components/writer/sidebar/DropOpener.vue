<template lang='slm'>
  #drop-opener[ v-if='dragged'
                @dragover='dragover'
                @dragleave='dragleave'
                @drop='drop' ]
    .indicators[ :class='dropTarget'
                 v-show='showIndicator' ]
      .indicator.left
      .indicator.middle
      .indicator.right
</template>

<script>
  import { Sidebar } from '@/helpers/store_helper'

  export default {
    name: 'DropOpener',

    data () {
      return {
        showIndicator: false,
        dropTarget: 'full'
      }
    },

    computed: {
      dragged () {
        return Sidebar.draggedFileId !== null
      }
    },

    methods: {
      dragover (event) {
        event.preventDefault()

        this.showIndicator = true

        const dropRect      = this.$el.getBoundingClientRect()
        const dragPosition  = ( event.x - dropRect.left ) / dropRect.width
        const paneThreshold = 0.28

        if (dragPosition < paneThreshold)
          this.dropTarget = 'left'
        else if (dragPosition > 1 - paneThreshold)
          this.dropTarget = 'right'
        else
          this.dropTarget = 'full'
      },

      dragleave (event) {
        this.showIndicator = false
      },

      drop (event) {
        console.log("CALL drop", event)
      },
    }
  }
</script>

<style lang='sass' scoped>
  $drop-width: 120px
  $drop-height: 120px

  #drop-opener
    display: flex
    align-items: center
    justify-content: center
    position: fixed
    top: 0
    left: $sidebar-width
    right: 0
    bottom: 0

  .indicators
    position: relative
    width: $drop-width
    height: $drop-height
    pointer-events: none
    border: 4px solid $color-action
    border-radius: 10px
    opacity: .8

    &.left
      .left
        opacity: 1

    &.full
      .left,
      .middle,
      .right
        opacity: 1

    &.right
      .right
        opacity: 1

  .indicator
    position: absolute
    top: 0
    bottom: 0
    background: $color-action
    opacity: 0
    transition: opacity .3s

    &.left
      left: 0
      width: $drop-width / 3

    &.middle
      left: $drop-width / 3
      right: $drop-width / 3

    &.right
      right: 0
      width: $drop-width / 3
</style>
