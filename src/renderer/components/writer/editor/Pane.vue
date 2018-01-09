<template lang='slm'>
  .pane[
    :class='[ classHidden, classSide, classSize ]'
  ]

    .medium-container [
      :style='mediumContainerStyle'
      @click='mediumContainerClick'
    ]
      Medium :file='file' type='title'/
      Medium :file='file' type='content'/

    .pane-close[
      @mouseenter='closeHover = true'
      @mouseleave='closeHover = false'
      @click='closePane'
      v-if='canClose'
    ]
      i.icon.icon-times
</template>

<script>
  import Medium from './Medium'

  import { Project } from '@/helpers/store_helper'

  export default {
    name: 'Pane',

    props: [
      'index'
    ],

    components: {
      Medium
    },

    data () {
      return {
        closeHover: false
      }
    },

    computed: {
      fileId () {
        return Project.filesOpen[ this.index ]
      },

      file () {
        return Project.files[ this.fileId ]
      },

      classHidden () {
        return this.file
          ? ''
          : 'hidden'
      },

      classSide () {
        return this.index === 0
          ? 'editor-left'
          : 'editor-right'
      },

      classSize () {
        return Project.filesOpen.length == 2
          ? 'editor-half'
          : 'editor-full'
      },

      canClose () {
        return Project.filesOpen.length > 1
      },

      mediumContainerStyle () {
        return this.canClose && this.closeHover
          ? { opacity: 0.3 }
          : { opacity: 1 }
      },
    },

    methods: {
      closePane () {
        this.$store.commit('projectFileClosePane', this.index)
      },

      mediumContainerClick (event) {
        if (event.target.className.indexOf('medium-container') != -1) {
          const content = event.target.children[1]
          const contentTop = content.getBoundingClientRect().top

          if (event.y > contentTop) {
            content.focus()
            const range = document.createRange()
            range.selectNodeContents(content.lastElementChild || content)
            range.collapse(false)
            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
          }
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  .pane
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: $status-bar-height
    text-align: center
    overflow-y: overlay
    z-index: 500

  .pane-close
    display: flex
    align-items: center
    justify-content: center
    position: absolute
    top: 0
    right: 0
    width: $sidebar-controls-width
    height: $sidebar-controls-height
    font-size: 1.5rem
    cursor: pointer

  .medium-container
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    max-width: 700px
    padding: 20vh .5rem 0
    margin: 0 auto
    background: transparent
    overflow: visible
    transition: opacity .3s

  .medium-editor
    width: 100%
    border: none
    outline: none
    cursor: text
    line-height: 1.75
    text-align: left

    // medium-editor placeholder
    &:after
      font-style: normal
      cursor: text
      transition: opacity .2s
      opacity: .5

    &:hover
      &:after
        opacity: .2
</style>
