<template lang='slm'>
  #sidebar [
    :class='{ open: open }'
  ]
    Controls/
    #sidebar-content
      transition name='fade' mode='out-in'
        FileTree v-if='page == "FileTree"'/
        Configurations v-else-if='page == "Configurations"'/

    #toggle [
      :title='$t("writer.sidebar.title.toggle")'
      @click='toggle'
      @contextmenu='openProjectMenu'
    ]
      .icon :class='toggleClass'

    #io-indicator [
      :class='ioIndicatorClass'
    ]
      i.fa.fa-refresh.fa-spin

</template>

<script>
  import Controls from './sidebar/Controls'
  import FileTree from './sidebar/FileTree'
  import Configurations from './sidebar/Configurations'

  import { Application, Sidebar } from '@/helpers/store_helper'
  import { openProjectMenu } from '@/helpers/project_menu'

  export default {
    name: 'Sidebar',

    components: {
      Controls,
      FileTree,
      Configurations,
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
          : 'icon-chevron-right'
      },

      ioIndicatorClass () {
        return Application.ioIndicatorShown
          ? 'shown'
          : ''
      },
    },

    methods: {
      toggle () {
        this.$store.commit('sidebarToggle')
      },

      openProjectMenu (event) {
        openProjectMenu(event, this.$store.dispatch, this.$t)
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
      top: -1px
      font-size: 1.25em

    &:hover
      opacity: .5

  #io-indicator
    display: flex
    align-items: center
    justify-content: center
    position: fixed
    top: 0
    left: $sidebar-controls-width
    width: $sidebar-controls-width
    height: $sidebar-controls-height
    margin-left: -1rem
    opacity: 0
    pointer-events: none

    &.shown
      margin-left: 0
      opacity: 0.5

  #sidebar,
  #toggle,
  #io-indicator
    transition: left .2s ease, opacity .2s ease, background .3s, border-color .3s, margin .3s ease

  #sidebar
    &.open
      left: 0

      #toggle
        left: $sidebar-width

      #io-indicator
        left: $sidebar-controls-width + $sidebar-width

  #sidebar-content
    position: absolute
    top: $sidebar-controls-height
    left: 0
    right: 0
    bottom: 0
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
