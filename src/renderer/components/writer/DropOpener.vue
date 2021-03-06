<template lang='slm'>
  #drop-opener [
    v-if='dragged'
    :class='dropOpenerClass'
    @dragover='dragover'
    @dragleave='dragleave'
    @drop='drop'
  ]

    .indicators [
      :class='indicatorsClass'
      v-show='showIndicator'
    ]
      .indicator.left
      .indicator.right
</template>

<script>
  import { Project, Sidebar } from '@/helpers/store_helper'
  import Config from '@/config/config'

  export default {
    name: 'DropOpener',

    data () {
      return {
        showIndicator: false,
        dropTarget: -1
      }
    },

    computed: {
      dragged () {
        return Sidebar.draggedFileId !== null
      },

      dropOpenerClass () {
        return this.showIndicator
          ? 'full-width'
          : ''
      },

      indicatorsClass () {
        if (this.dropTarget === -1) return 'full'
        if (this.dropTarget ===  0) return 'left'
        if (this.dropTarget ===  1) return 'right'
        throw `ERROR: unknown dropTarget is provided: ${ this.dropTarget }`
      }
    },

    methods: {
      dragover (event) {
        event.preventDefault()

        this.showIndicator = true

        this.$store.commit('sidebarToggle', false)

        const filesOpenCount = Project.filesOpen.length
        const dropRect       = this.$el.getBoundingClientRect()
        const dragX          = ( event.x - dropRect.left ) / dropRect.width
        const dragY          = ( event.y - dropRect.top ) / dropRect.height
        const paneThreshold  = Config.dropOpenerThreshold

        if (dragX < paneThreshold) {
          this.dropTarget = 0
        } else
        if (dragX > 1 - paneThreshold) {
          this.dropTarget = 1
        } else
          this.dropTarget = -1
      },

      dragleave (event) {
        this.showIndicator = false
      },

      drop (event) {
        this.showIndicator = false

        const fileId = Sidebar.draggedFileId
        if (!fileId) return

        if (this.dropTarget == -1) {
          this.$store.commit('projectFileOpenFill', fileId)
        } else {
          this.$store.commit('projectFileOpenPane', {
            id: fileId,
            pane: this.dropTarget
          })
        }
      },
    }
  }
</script>

<style lang='sass' scoped>
  $indicator-width: 120px
  $indicator-height: 120px

  #drop-opener
    display: flex
    align-items: center
    justify-content: center
    position: fixed
    top: 0
    left: $sidebar-width + $sidebar-controls-width
    right: 0
    bottom: 0

    &.full-width
      left: $sidebar-controls-width

  .indicators
    display: flex
    flex-direction: row
    position: relative
    width: $indicator-width
    height: $indicator-height
    pointer-events: none
    border: 4px solid $color-action
    border-radius: 10px
    opacity: .8

    &.left
      .left
        opacity: 1

    &.right
      .right
        opacity: 1

    &.full
      .left,
      .right
        opacity: 1

  .indicator
    flex: 1
    background: $color-action
    opacity: 0
    transition: opacity .3s
</style>
