<template lang='slm'>
  #sidebar :class='{ open: open }'
    Controls/
    #sidebar-content
      FileTree v-if='page == "FileTree"'/
      ProjectManager v-else-if='page == "ProjectManager"'/
      ThemeSelector v-else-if='page == "ThemeSelector"'/

    a#toggle @click='toggle'
      i.fa.fa-lg :class='toggleClass'
</template>

<script>
  import Controls from './sidebar/Controls'
  import FileTree from './sidebar/FileTree'
  import ProjectManager from './sidebar/ProjectManager'
  import ThemeSelector from './sidebar/ThemeSelector'

  import { Sidebar } from '../helpers/store_helper'

  export default {
    name: 'Sidebar',

    components: {
      Controls,
      FileTree,
      ProjectManager,
      ThemeSelector
    },

    computed: {
      open () {
        return Sidebar.sidebarOpen
      },

      page () {
        return Sidebar.sidebarPage
      },

      toggleClass () {
        return this.open
          ? 'fa-arrow-left'
          : 'fa-bars'
      }
    },

    methods: {
      toggle () {
        this.$store.commit('toggleSidebar')
      }
    }
  }
</script>

<style lang='sass' scoped>
  #sidebar
    position: fixed
    top: 0
    bottom: 0
    left: -$sidebar-width
    width: $sidebar-width
    z-index: 1000

    #toggle
      position: fixed
      top: .5rem
      left: .5rem
      padding: .5rem .75rem
      cursor: pointer

    &.open
      left: 0
      border-right: 1px solid $color-more-subtle

      #toggle
        left: $sidebar-width + 8px

  #sidebar,
  #toggle
    transition: left .2s, opacity .2s

  #sidebar-content
    position: absolute
    top: $sidebar-controls-height
    left: 0
    right: 0
    bottom: 0
    background: $color-more-subtle
</style>
