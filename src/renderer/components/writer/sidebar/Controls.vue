<template lang='slm'>
  #sidebar-controls
    .btn[ title='Save'
          :class='isActive("ProjectManager")'
          @click='setSidebarPage("ProjectManager")' ]
      .icon.icon-document

    .btn[ title='Files'
          :class='isActive("FileTree")'
          @click='setSidebarPage("FileTree")' ]
      .icon.icon-book

    .btn[ title='Themes'
          :class='isActive("ThemeSelector")'
          @click='setSidebarPage("ThemeSelector")' ]
      .icon.icon-adjust-contrast

    .btn title='Share'
      .icon.icon-world-outline
</template>

<script>
  import { Sidebar } from '../../helpers/store_helper'

  export default {
    name: 'Controls',

    methods: {
      isActive (page) {
        return Sidebar.sidebarPage == page
          ? 'active'
          : ''
      },

      setSidebarPage (page) {
        this.$store.commit('setSidebarPage', page)
      },
    }
  }
</script>

<style lang='sass' scoped>
  #sidebar-controls
    display: flex
    justify-content: space-between

  .btn
    position: relative
    display: inline-block
    width: $sidebar-controls-width
    height: $sidebar-controls-height
    text-align: center
    cursor: pointer

    &:before
      content: ''
      display: inline-block
      width: 0
      height: 100%
      vertical-align: middle

    .icon
      display: inline-block
      font-size: 1.5em
      vertical-align: middle
      z-index: 1

    &:after
      content: ''
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: $color-subtle
      opacity: 0
      transition: opacity .3s
      z-index: 0

      top: $sidebar-controls-height - 4px
      background: $color-action

    &:hover
      &:after
        opacity: 1

    &.active
      &:after
        opacity: 1
</style>
