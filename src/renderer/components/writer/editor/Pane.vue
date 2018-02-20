<template lang='slm'>
  .pane [
    :class='[ classHidden, classSide, classSize ]'
    @click='onClick'
    @scroll='onScroll'
    @contextmenu='openPaneContextMenu'
  ]

    .medium-container [
      :class='mediumContainerClass'
    ]
      Medium [
        :index='index'
        :file='file'
        type='title'
      ]
      Medium [
        :index='index'
        :file='file'
        type='content'
      ]
</template>

<script>
  import Medium from './Medium'

  import { Application, Project } from '@/helpers/store_helper'

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

      mediumContainerClass () {
        return this.canClose &&
               Application.paneCloseHoverIndex == this.index
          ? 'close-hover'
          : ''
      },
    },

    methods: {
      closePane () {
        this.$store.commit('projectFileClosePane', this.index)
      },

      onClick (event) {
        if (event.target.classList.contains('pane') ||
            event.target.classList.contains('medium-container') ) {
          const content       = event.target.querySelector('.medium-content')
          const contentRect   = content.getBoundingClientRect()
          const contentBottom = contentRect.top + contentRect.height

          if (event.y > contentBottom) {
            this.focusContent()
          } else {
            this.focusTitle()
          }
        }
      },

      onScroll (event) {
        // TODO (Alex): Fix medium editor toolbar position if it's open
      },

      openPaneContextMenu () {
        this.$store.commit('applicationSetLastPaneFocused', this.index)
      },

      focusTitle () {
        const title = this.$el.firstChild.firstChild
        focusAndSelectEnd(title)
      },

      focusContent () {
        const content = this.$el.firstChild.lastChild
        focusAndSelectEnd(content)
      },
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
    cursor: text

    &.close-hover
      opacity: .5
</style>
