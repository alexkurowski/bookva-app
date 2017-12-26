<template lang='slm'>
  #sidebar :class='{ open: open }'
    SidebarControls/
    #sidebar-content
      SidebarFileTree :if='page == "FileTree"'/
      SidebarThemeSelector :if='page == "ThemeSelector"'/

    a#toggle @click='toggle'
      i.fa.fa-lg :class='toggleClass'
</template>

<script>
  import SidebarControls from './SidebarControls'
  import SidebarFileTree from './SidebarFileTree'
  import SidebarThemeSelector from './SidebarThemeSelector'

  import { Sidebar } from '../helpers/store_helper'

  export default {
    name: 'Sidebar',

    components: {
      SidebarControls,
      SidebarFileTree,
      SidebarThemeSelector
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
      box-shadow: 0 0 1px 3px $color-subtle

      #toggle
        left: $sidebar-width + 8px

  #sidebar,
  #toggle
    transition: left .2s, opacity .2s
</style>
