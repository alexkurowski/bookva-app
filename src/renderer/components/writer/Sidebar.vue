<template lang='slm'>
  #sidebar :class='{ open: open }'
    .content
    a#toggle @click='toggle'
      i.fa.fa-lg :class='toggleClass'
</template>

<script>
  import { Writer } from '../helpers/store_helper'

  export default {
    name: 'Sidebar',

    computed: {
      open () {
        return Writer.sidebarOpen
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
