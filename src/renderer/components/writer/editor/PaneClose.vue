<template lang='slm'>
  #pane-close[
    v-if='filesOpenCount > 1'
  ]
    .pane-close-container[
      v-for='_, index in filesOpen'
      :style='{ flex: paneFlex[index] }'
    ]
      .pane-close[
        @mouseenter='onMouseEnter(index)'
        @mouseleave='onMouseLeave'
        @click='closePane(index)'
      ]
        i.icon.icon-times
</template>

<script>
  import { Appearance, Project } from '@/helpers/store_helper'

  export default {
    name: 'PaneClose',

    computed: {
      filesOpen () {
        return Project.filesOpen
      },

      filesOpenCount () {
        return this.filesOpen.length
      },

      paneFlex () {
        return Appearance.paneFlex
      },
    },

    methods: {
      onMouseEnter (index) {
        this.$store.commit('applicationSetPaneCloseHoverIndex', index)
      },

      onMouseLeave () {
        this.$store.commit('applicationSetPaneCloseHoverIndex', -1)
      },

      closePane (index) {
        if (this.filesOpenCount > 1) {
          this.$store.commit('projectFileClosePane', this.index)
          this.$store.commit('applicationSetPaneCloseHoverIndex', -1)
        }
      }
    }
  }
</script>

<style lang='sass' scoped>
  #pane-close
    display: flex
    align-items: stretch
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 0
    z-index: 750

  .pane-close-container
    height: 0
    transform: translate(0, 0)

  .pane-close
    display: flex
    align-items: center
    justify-content: center
    position: fixed
    top: 0
    right: 0
    width: $sidebar-controls-width
    height: $sidebar-controls-height
    font-size: 1.25rem
    cursor: pointer
    color: green
    transition: opacity .3s

    &:hover
      opacity: .5
</style>
