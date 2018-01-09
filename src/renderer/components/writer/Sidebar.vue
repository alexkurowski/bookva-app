<template lang='slm'>
  #sidebar :class='{ open: open }'
    Controls/
    #sidebar-content
      transition name='fade' mode='out-in'
        FileTree v-if='page == "FileTree"'/
        ProjectManager v-else-if='page == "ProjectManager"'/
        ThemeSelector v-else-if='page == "ThemeSelector"'/

    a#toggle[ @click='toggle'
              @contextmenu='openProjectMenu' ]
      .icon :class='toggleClass'

    DropOpener/
</template>

<script>
  import Controls from './sidebar/Controls'
  import FileTree from './sidebar/FileTree'
  import ProjectManager from './sidebar/ProjectManager'
  import ThemeSelector from './sidebar/ThemeSelector'
  import DropOpener from './sidebar/DropOpener'

  import { Sidebar } from '@/helpers/store_helper'
  import { openProjectMenu } from '@/helpers/project_menu'

  export default {
    name: 'Sidebar',

    components: {
      Controls,
      FileTree,
      ProjectManager,
      ThemeSelector,
      DropOpener
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
          ? 'icon-arrow-left-outline'
          : 'icon-th-menu'
      }
    },

    methods: {
      toggle () {
        this.$store.commit('sidebarToggle')
      },

      openProjectMenu (event) {
        openProjectMenu(event, this.$store.dispatch)
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
    z-index: 5000

    #toggle
      display: flex
      align-items: center
      justify-content: center
      position: fixed
      top: 0
      left: 0
      width: $sidebar-controls-width
      height: $sidebar-controls-height
      cursor: pointer

      .icon
        position: relative
        top: -2px
        font-size: 1.5em

    &.open
      left: 0
      border-right: 1px solid $color-more-subtle

      #toggle
        left: $sidebar-width
        width: $sidebar-controls-width

  #sidebar,
  #toggle
    transition: left .2s ease, opacity .2s ease, background .3s, border-color .3s

  #sidebar-content
    position: absolute
    top: $sidebar-controls-height
    left: 0
    right: 0
    bottom: 0
    padding-top: .5rem
    overflow-x: hidden
    overflow-y: auto

  .fade-enter-active,
  .fade-leave-active
    transition: opacity .15s

  .fade-enter-to,
  .fade-leave
    opacity: 1

  .fade-enter,
  .fade-leave-to
    opacity: 0
</style>
